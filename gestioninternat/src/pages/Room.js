import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Bootstrap Icons
import { Dropdown, Modal, Button } from 'react-bootstrap';
import './Room.css';

export default function Room() {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  let navigate = useNavigate();

  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = async () => {
    try {
      const result = await axios.get('http://localhost:8080/rooms');
      setRooms(result.data);
      setFilteredRooms(result.data); // Initialize filtered rooms with all rooms
    } catch (error) {
      console.error('Error loading rooms', error);
    }
  };

  // Filter rooms based on exact match with the search term
  const filterRooms = () => {
    if (searchTerm === '') {
      setFilteredRooms(rooms); // Show all rooms if the search term is empty
    } else {
      const filtered = rooms.filter((room) =>
        room.numéro.toString() === searchTerm // Exact match
      );
      setFilteredRooms(filtered);
    }
  };

  useEffect(() => {
    filterRooms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  const handleDelete = (id) => {
    setSelectedRoomId(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/rooms/${selectedRoomId}`);
      loadRooms(); // Reload the room list after deletion
    } catch (error) {
      console.error('Error deleting room!', error);
    }
    setShowModal(false);
    setSelectedRoomId(null);
  };

  const handleBack = () => {
    navigate('/dashboard-section1'); // Adjust this route as needed
  };

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    navigate('/');
  };

  return (
    <div>
      <div className="container-fluid bg-light py-2 d-flex justify-content-between align-items-center">
        <img src={require('../asset/image2.png')} alt="Logo" className="logo-img" />
        <Dropdown align="end">
          <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
            <i className="bi bi-list"></i>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={handleBack}>
              <i className="bi bi-arrow-left me-2"></i> Retour
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/addroom">
              <i className="bi bi-plus-square me-2"></i> Ajouter une chambre
            </Dropdown.Item>
            <Dropdown.Item onClick={handleLogout}>
              <i className="bi bi-box-arrow-right me-2"></i> Déconnexion
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <div className="container mt-5">
        <h2 className="text-center mb-4">Liste des Chambres</h2>

        {/* Search bar with icon */}
        <div className="input-group mb-4 search-bar-container">
          <span className="input-group-text search-icon">
            <i className="bi bi-search"></i>
          </span>
          <input
            type="text"
            className="form-control search-bar"
            placeholder="Rechercher par numéro de chambre"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Display message if no rooms are found */}
        {filteredRooms.length === 0 ? (
          <div className="alert alert-warning text-center">
            Aucune chambre trouvée pour le numéro recherché.
          </div>
        ) : (
          <ul className="list-group">
            {filteredRooms.map((room) => (
              <li className="list-group-item d-flex justify-content-between align-items-center" key={room.id}>
                <div>
                  <h5>Chambre {room.numéro}</h5>
                  <p className="mb-0">
                    <strong>Capacité:</strong> {room.capacity}
                  </p>
                </div>
                <div>
                  <Link className="btn btn-primary btn-sm mx-1" to={`/roomdetails/${room.id}`}>
                    <i className="bi bi-eye"></i>
                  </Link>
                  <Link className="btn btn-warning btn-sm mx-1" to={`/editroom/${room.id}`}>
                    <i className="bi bi-pencil"></i>
                  </Link>
                  <button className="btn btn-danger btn-sm mx-1" onClick={() => handleDelete(room.id)}>
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmer la Suppression</Modal.Title>
          </Modal.Header>
          <Modal.Body>Êtes-vous sûr de vouloir supprimer cette chambre ?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Annuler
            </Button>
            <Button variant="danger" onClick={confirmDelete}>
              Supprimer
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}
