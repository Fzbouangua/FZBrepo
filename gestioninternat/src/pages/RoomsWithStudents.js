import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './RoomWithStudent.css';

function RoomsWithStudents() {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = () => {
    axios.get('http://localhost:8080/rooms-with-users')
      .then(response => {
        // Filtering unique rooms by their ID (assuming response data includes room ID)
        const uniqueRooms = Array.from(new Map(response.data.map(room => [room.id, room])).values());
        setRooms(uniqueRooms);
      })
      .catch(error => console.error('Error fetching rooms with students:', error));
  };

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    navigate('/');
  };

  return (
    <div className="rooms-container">
      <nav className="navbar navbar-expand-lg navbar-light rooms-navbar shadow-sm">
        <div className="container-fluid">
          <Link className="btn btn-outline-secondary me-auto" to="/assignroom">
            <i className="bi bi-arrow-left me-2"></i> Retour
          </Link>
          <button 
            className="btn btn-outline-danger ms-auto" 
            onClick={handleLogout}
          >
            <i className="bi bi-box-arrow-right me-2"></i> Déconnexion
          </button>
        </div>
      </nav>

      <div className="container mt-5" style={{ maxWidth: '1200px' }}>
        <h2 className="text-center mb-4 rooms-title">Liste des chambre avec les etudiants</h2>
        <div className="row">
          {rooms.map(room => (
            <div className="col-lg-6 col-md-6 mb-4" key={room.id}>
              <div className="rooms-card shadow-sm">
                <div className="rooms-card-header d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Chambre {room.numéro}</h5>
                  <span className={`badge ${room.users.length > 0 ? 'bg-success' : 'bg-secondary'}`}>
                    {room.users.length} {room.users.length === 1 ? 'Étudiant' : 'Étudiants'}
                  </span>
                </div>
                <div className="rooms-card-body">
                  {room.users.length > 0 ? (
                    <ul className="list-unstyled">
                      {room.users.map(user => (
                        <li 
                          key={user.id} 
                          className="d-flex align-items-center justify-content-between mb-3"
                        >
                          <div className="d-flex align-items-center">
                            <div className="rooms-user-icon d-flex align-items-center justify-content-center">
                              {user.firstName.charAt(0)}
                            </div>
                            <div className="ms-3">
                              <strong>{user.firstName} {user.lastName}</strong>
                              <p className="mb-0 text-muted">{user.email}</p>
                            </div>
                          </div>
                          <Link 
                            className="btn btn-change-room btn-sm"
                            to={`/change-room?studentId=${user.id}`}
                          >
                            Changer la chambre
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-center text-muted">
                      <i className="bi bi-person-x me-2"></i>
                      Aucun étudiant assigné
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RoomsWithStudents;
