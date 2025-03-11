import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './EditRoom.css'; // Import the CSS file

export default function EditRoom() {
  let navigate = useNavigate();
  const { id } = useParams();
  const [room, setRoom] = useState({
    numéro: "",
    capacity: "",
  });
  const [error, setError] = useState(""); // State to manage error messages

  const { numéro, capacity } = room;

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setRoom({ ...room, [name]: value });
    if (name === 'capacity' && value > 2) {
      setError("Capacity cannot exceed 2.");
    } else {
      setError(""); // Clear the error message when the value is valid
    }
  };

  const loadRoom = useCallback(async () => {
    try {
      const result = await axios.get(`http://localhost:8080/rooms/${id}`);
      setRoom(result.data);
    } catch (error) {
      console.error('There was an error loading the room!', error);
    }
  }, [id]);

  useEffect(() => {
    loadRoom();
  }, [loadRoom]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (capacity > 2) {
      setError("Capacity cannot exceed 2.");
      return;
    }
    try {
      await axios.put(`http://localhost:8080/rooms/${id}`, room);
      console.log('Room updated successfully:', room);
      navigate("/room");
    } catch (error) {
      console.error('There was an error updating the room!', error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="top-left-button">
        <Link className="btn btn-outline-secondary" to="/room">
          <i className="bi bi-arrow-left"></i> Retour
        </Link>
      </div>
      <div className="centered-card">
        <div className="card-container">
          <h2 className="text-center mb-4">Editer la chambre</h2>
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="numéro" className="form-label">
                Numéro de la chambre
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Room Number"
                name="numéro"
                value={numéro}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="capacity" className="form-label">
                Capacité
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Room Capacity"
                name="capacity"
                value={capacity}
                onChange={onInputChange}
              />
              {error && <div className="text-danger mt-2">{error}</div>}
            </div>
            <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-outline-primary me-2" disabled={!!error}>Soumettre</button>
              <Link className="btn btn-outline-danger" to="/room">
                Annuler
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
