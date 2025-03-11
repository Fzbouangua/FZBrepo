import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Modal, Button, Dropdown } from 'react-bootstrap';
import './Home.css'; // Ensure the file exists at this path

export default function Home() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // State for search input
  let navigate = useNavigate();

  const addDefaultUser = async () => {
    const defaultUser = {
      firstName: 'Jean',
      lastName: 'Dupont',
      role: 'Student',
      email: 'jean.dupont@example.com'
    };

    try {
      await axios.post("http://localhost:8080/users", defaultUser);
    } catch (error) {
      console.error('Erreur lors de l’ajout de l’utilisateur par défaut!', error);
    }
  };

  const loadUsers = useCallback(async () => {
    try {
      let result = await axios.get("http://localhost:8080/users");
      if (result.data.length === 0) {
        await addDefaultUser();
        result = await axios.get("http://localhost:8080/users");
      }
      setUsers(result.data);
    } catch (error) {
      console.error('Erreur lors du chargement des utilisateurs!', error);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handleDelete = (id) => {
    setSelectedUserId(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/users/${selectedUserId}`);
      loadUsers(); 
    } catch (error) {
      console.error('Erreur lors de la suppression de l’utilisateur!', error);
    }
    setShowModal(false);
    setSelectedUserId(null);
  };

  const handleBack = () => {
    navigate('/dashboard-section1');
  };

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    navigate('/');
  };

  const filteredUsers = users.filter(user =>
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <Dropdown.Item as={Link} to="/adduser">
              <i className="bi bi-plus-square me-2"></i> Ajouter un utilisateur
            </Dropdown.Item>
            <Dropdown.Item onClick={handleLogout}>
              <i className="bi bi-box-arrow-right me-2"></i> Déconnexion
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <div className="container mt-5">
        <h2 className="text-center mb-4">Liste des Utilisateurs</h2>

        {/* Search Bar */}
        <div className="input-group mb-4 search-bar">
          <span className="input-group-text bg-success text-white" id="basic-addon1">
            <i className="bi bi-search"></i>
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Rechercher un utilisateur..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <ul className="list-group">
          {filteredUsers.map((user) => (
            <li className="list-group-item d-flex justify-content-between align-items-center" key={user.id}>
              <div>
                <h5>{user.firstName} {user.lastName}</h5>
                <p className="mb-0"><strong>Rôle:</strong> {user.role}</p>
                <p className="mb-0"><strong>Email:</strong> {user.email}</p>
              </div>
              <div>
                <Link className="btn btn-primary btn-sm mx-1" to={`/userdetails/${user.id}`}>
                  <i className="bi bi-eye"></i>
                </Link>
                <Link className="btn btn-warning btn-sm mx-1" to={`/edituser/${user.id}`}>
                  <i className="bi bi-pencil"></i>
                </Link>
                <button className="btn btn-danger btn-sm mx-1" onClick={() => handleDelete(user.id)}>
                  <i className="bi bi-trash"></i>
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* Delete Confirmation Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmer la Suppression</Modal.Title>
          </Modal.Header>
          <Modal.Body>Êtes-vous sûr de vouloir supprimer cet utilisateur ?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Annuler</Button>
            <Button variant="danger" onClick={confirmDelete}>Supprimer</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}
