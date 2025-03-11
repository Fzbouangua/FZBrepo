import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaCheckCircle, FaExclamationCircle, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './SubmitComplaint.css'; // Custom CSS for styling

const ComplaintForm = () => {
  const [complaint, setComplaint] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [validationMessage, setValidationMessage] = useState(''); // New state for validation messages

  const email = localStorage.getItem('userEmail');
  const navigate = useNavigate();

  const handleComplaintSubmit = async (e) => {
    e.preventDefault();

    if (!complaint.trim()) {
      setValidationMessage('Veuillez entrer une description pour votre plainte.');
      return;
    }

    try {
      const userResponse = await axios.get(`http://localhost:8080/auth/user/${email}`);
      const userId = userResponse.data.id;

      await axios.post(`http://localhost:8080/complaints/submit/${userId}`, {
        description: complaint
      });

      setSuccessMessage('Votre plainte a été soumise avec succès.');
      setComplaint('');
      setErrorMessage('');
      setValidationMessage('');
    } catch (error) {
      setErrorMessage('Erreur lors de la soumission de la plainte.');
      console.error(error);
    }
  };

  return (
    <Container fluid className="d-flex flex-column vh-100 p-3">
      {/* Button to go back */}
      <Button 
        variant="outline-secondary" 
        onClick={() => navigate('/student-dashboard')}
        style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <FaArrowLeft className="me-2" />
        Retour
      </Button>
      {/* Centering the Card */}
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Card className="shadow-lg p-4 custom-card animated-card">
          <Card.Body>
            <h2 className="text-center text-success mb-4 custom-header">Soumettre une plainte</h2>
            {successMessage && (
              <Alert variant="success" className="custom-alert d-flex align-items-center">
                <FaCheckCircle className="me-2" />
                {successMessage}
              </Alert>
            )}
            {errorMessage && (
              <Alert variant="danger" className="custom-alert d-flex align-items-center">
                <FaExclamationCircle className="me-2" />
                {errorMessage}
              </Alert>
            )}
            {validationMessage && (
              <Alert variant="warning" className="custom-alert d-flex align-items-center">
                <FaExclamationCircle className="me-2" />
                {validationMessage}
              </Alert>
            )}
            <Form onSubmit={handleComplaintSubmit}>
              <Form.Group controlId="complaintTextarea">
                <Form.Label className="custom-label">Description de la plainte</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  value={complaint}
                  onChange={(e) => setComplaint(e.target.value)}
                  placeholder="Entrez votre plainte ici..."
                  className="custom-textarea"
                />
              </Form.Group>
              <Button 
                variant="success" 
                type="submit" 
                className="mt-3 custom-button"
                disabled={!complaint.trim()} // Disable button if complaint is empty
              >
                Soumettre la plainte
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default ComplaintForm;
