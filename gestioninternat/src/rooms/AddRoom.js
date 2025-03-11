import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './AddRoom.css'; // Custom CSS for styling

const AddRoom = () => {
  const [room, setRoom] = useState({
    numéro: "",
    capacity: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  
  const navigate = useNavigate();
  const { numéro, capacity } = room;

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setRoom({ ...room, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    
    if (parseInt(capacity) > 2) {
      setErrorMessage("La capacité de la chambre ne peut pas dépasser 2.");
      return;
    }

    try {
      await axios.post("http://localhost:8080/room", room);
      setSuccessMessage('Chambre ajoutée avec succès.');
      setRoom({ numéro: "", capacity: "" });
      setErrorMessage('');
      
      // Navigate to /room after successful submission
      setTimeout(() => {
        navigate('/room');
      }, 2000); // Delay of 2 seconds before redirecting
      
    } catch (error) {
      setErrorMessage('Erreur lors de l\'ajout de la chambre.');
      console.error('Il y a eu une erreur lors de l\'ajout de la chambre!', error);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg border-light rounded p-4 custom-card">
        <h2 className="text-center mb-4 custom-header">Ajouter une chambre</h2>
        {successMessage && (
          <div className="alert alert-success d-flex align-items-center custom-alert">
            <i className="bi bi-check-circle me-2"></i>
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="alert alert-danger d-flex align-items-center custom-alert">
            <i className="bi bi-x-circle me-2"></i>
            {errorMessage}
          </div>
        )}
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label htmlFor="numéro" className="form-label custom-label">
              <i className="bi bi-house-door me-2"></i> Numéro de la chambre
            </label>
            <input
              type="text"
              className="form-control custom-input"
              placeholder="Entrez le numéro de la chambre"
              name="numéro"
              value={numéro}
              onChange={onInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="capacity" className="form-label custom-label">
              <i className="bi bi-people me-2"></i> Capacité de la chambre
            </label>
            <input
              type="text"
              className="form-control custom-input"
              placeholder="Entrez la capacité de la chambre"
              name="capacity"
              value={capacity}
              onChange={onInputChange}
              required
            />
          </div>
          <div className="d-flex justify-content-between">
            <button type="submit" className="btn custom-button submit">
              <i className="bi bi-check2 me-2"></i> Confirmer
            </button>
            <Link className="btn custom-button cancel" to="/room">
              <i className="bi bi-x-circle me-2"></i> Annuler
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRoom;
