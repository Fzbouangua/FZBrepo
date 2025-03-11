import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, ListGroup, Alert, Button, Modal } from 'react-bootstrap';
import './ListComplaints.css'; // Import custom CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const ListComplaints = () => {
    const [studentsWithComplaints, setStudentsWithComplaints] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [complaintToDelete, setComplaintToDelete] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8080/students-with-complaints')
            .then(response => {
                setStudentsWithComplaints(response.data);
            })
            .catch(err => {
                setError('Failed to fetch data');
                console.error(err);
            });
    }, []);

    const handleDeleteComplaint = () => {
        axios.delete(`http://localhost:8080/complaints/${complaintToDelete}`)
            .then(() => {
                setStudentsWithComplaints(studentsWithComplaints.map(student => ({
                    ...student,
                    complaints: student.complaints.filter(complaint => complaint.id !== complaintToDelete)
                })));
                setSuccess('Complaint deleted successfully');
                setShowModal(false);

                // Effacer le message après quelques secondes (facultatif)
                setTimeout(() => setSuccess(null), 3000);
            })
            .catch(err => {
                setError('Failed to delete complaint');
                console.error(err);
            });
    };

    const openModal = (complaintId) => {
        setComplaintToDelete(complaintId);
        setShowModal(true);
    };

    const closeModal = () => {
        setComplaintToDelete(null);
        setShowModal(false);
    };

    return (
        <Container className="full-height-container position-relative">
            <div className="content-wrapper">
                <h1 className="mb-4 text-center">Liste des Étudiants avec Plaintes</h1>
                {error && <Alert variant="danger" className="custom-alert">{error}</Alert>}
                {success && <Alert variant="success" className="custom-alert">{success}</Alert>}
                {studentsWithComplaints.length > 0 ? (
                    studentsWithComplaints.map(student => (
                        <Card key={student.id} className="mb-4 shadow-lg border-light custom-card">
                            <Card.Body>
                                <Card.Title className="font-weight-bold">{student.firstName} {student.lastName}</Card.Title>
                                <Card.Subtitle className="mb-3 text-muted">{student.email}</Card.Subtitle>
                                <Card.Text className="font-italic"><strong>Plaintes</strong></Card.Text>
                                {student.complaints.length > 0 ? (
                                    <ListGroup variant="flush">
                                        {student.complaints.map(complaint => (
                                            <ListGroup.Item
                                                key={complaint.id}
                                                className="d-flex justify-content-between align-items-center bg-light border-0 rounded mb-2 custom-list-group-item"
                                            >
                                                <span>{complaint.description}</span>
                                                <Button
                                                    variant="danger"
                                                    size="sm"
                                                    onClick={() => openModal(complaint.id)}
                                                    className="custom-delete-button"
                                                >
                                                    Supprimer
                                                </Button>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                ) : (
                                    <Card.Text>Aucune plainte</Card.Text>
                                )}
                            </Card.Body>
                        </Card>
                    ))
                ) : (
                    <Alert variant="info" className="custom-alert">Aucun étudiant avec plaintes trouvé.</Alert>
                )}
            </div>

            {/* Confirmation Modal */}
            <Modal show={showModal} onHide={closeModal} centered className="custom-modal">
                <Modal.Header closeButton>
                    <Modal.Title>Confirmer la suppression</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Êtes-vous sûr de vouloir supprimer cette plainte ? Cette action est irréversible.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Annuler
                    </Button>
                    <Button variant="danger" onClick={handleDeleteComplaint}>
                        Supprimer
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default ListComplaints;
