import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function AssignRoom() {
  const [students, setStudents] = useState([]);
  const [availableRooms, setAvailableRooms] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');
  const [message, setMessage] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
    fetchAvailableRooms();
  }, []);

  const fetchStudents = () => {
    axios.get('http://localhost:8080/users')
      .then(response => {
        const studentData = response.data.filter(user => user.role === 'STUDENT' && !user.room);
        setStudents(studentData);
      })
      .catch(error => console.error('Error fetching students:', error));
  };

  const fetchAvailableRooms = () => {
    axios.get('http://localhost:8080/rooms/available')
      .then(response => {
        setAvailableRooms(response.data);
      })
      .catch(error => console.error('Error fetching rooms:', error));
  };

  const handleAssign = () => {
    if (selectedStudent && selectedRoom) {
      axios.put(`http://localhost:8080/assignroom/${selectedStudent}/${selectedRoom}`)
        .then(response => {
          if (response.status === 200) {
            setMessage(response.data.message);
            navigate('/rooms-with-students');
          } else {
            setMessage('Échec de l\'affectation de la chambre.');
          }
        })
        .catch(error => {
          console.error('Error assigning room:', error);
          setMessage('Erreur lors de l\'affectation de la chambre.');
        });
    } else {
      setMessage('Veuillez sélectionner un étudiant et une chambre.');
    }
  };

  const handleLogout = () => {
    // Clear any user session or authentication data here
    localStorage.removeItem('userEmail'); // Example: remove user email from local storage
    navigate('/'); // Navigate to the home page
  };

  return (
    <div className="container-fluid">
      {/* Menu hamburger */}
      <div className="menu-container">
        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          <div className="menu-line"></div>
          <div className="menu-line"></div>
          <div className="menu-line"></div>
        </div>
        {menuOpen && (
          <div className="menu">
            <Link className="menu-item" to="/rooms-with-students">
              <i className="bi bi-list-ul me-2"></i> Liste des chambres avec étudiants
            </Link>
            <button className="menu-item" onClick={handleLogout}>
              <i className="bi bi-box-arrow-right me-2"></i> Déconnexion
            </button>
          </div>
        )}
      </div>

      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="assign-room-section">
          <style>
            {`
              .menu-container {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 1000;
              }

              .menu-icon {
                width: 30px;
                height: 20px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                cursor: pointer;
              }

              .menu-line {
                width: 30px;
                height: 4px;
                background-color: #333;
                border-radius: 2px;
              }

              .menu {
                position: absolute;
                top: 100%;
                right: 0;
                background: #fff;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                border-radius: 8px;
                padding: 10px;
                display: flex;
                flex-direction: column;
                gap: 10px;
                width: 200px;
              }

              .menu-item {
                text-decoration: none;
                color: #333;
                font-size: 16px;
                display: flex;
                align-items: center;
                padding: 10px;
                border-radius: 4px;
                transition: background-color 0.2s;
              }

              .menu-item:hover {
                background-color: #f0f0f0;
              }

              .assign-room-section {
                background: #4CAF50;
                border-radius: 15px;
                box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
                padding: 40px;
                max-width: 700px;
                width: 100%;
                position: relative;
                overflow: hidden;
                z-index: 1;
              }

              .section-title {
                font-family: 'Playfair Display', serif;
                color: #fffff;
                margin-bottom: 20px;
                text-align: center;
                font-size: 2.5em;
                font-weight: 700;
              }

              .form-group {
                margin-bottom: 20px;
              }

              .form-label {
                font-size: 1.1em;
                color: #333;
                font-weight: 600;
              }

              .form-select {
                border-radius: 8px;
                border: 1px solid #ddd;
                padding: 10px;
                box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
              }

              .button-group {
                display: flex;
                justify-content: center;
                gap: 20px;
                margin-top: 20px;
              }

              .btn-success {
                background-color: #28a745;
                color: #fffff;
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                border: none;
                font-size: 1em;
                padding: 12px 24px;
                transition: background-color 0.3s, transform 0.3s, box-shadow 0.3s;
              }

              .btn-success:hover {
                background-color: #218838;
                transform: translateY(-2px);
                box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
              }

              .btn-secondary {
                background-color: #6c757d;
                color: #fff;
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                border: none;
                font-size: 1em;
                padding: 12px 24px;
                transition: background-color 0.3s, transform 0.3s, box-shadow 0.3s;
              }

              .btn-secondary:hover {
                background-color: #5a6268;
                transform: translateY(-2px);
                box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
              }

              .alert-info {
                font-size: 1.1em;
                font-weight: 500;
                border-radius: 8px;
                padding: 15px;
                margin-bottom: 20px;
              }
            `}
          </style>

          <h2 className="section-title">Attribuer une Chambre</h2>
          {message && <div className="alert alert-info">{message}</div>}
          <div className="form-group">
            <label htmlFor="studentSelect" className="form-label">Sélectionner un étudiant</label>
            <select 
              id="studentSelect" 
              className="form-select" 
              value={selectedStudent} 
              onChange={(e) => setSelectedStudent(e.target.value)}
            >
              <option value="">Sélectionner un étudiant</option>
              {students.map(student => (
                <option key={student.id} value={student.id}>
                  {student.firstName} {student.lastName}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="roomSelect" className="form-label">Sélectionner une chambre</label>
            <select 
              id="roomSelect" 
              className="form-select" 
              value={selectedRoom} 
              onChange={(e) => setSelectedRoom(e.target.value)}
            >
              <option value="">Sélectionner une chambre</option>
              {availableRooms.map(room => (
                <option key={room.id} value={room.id}>
                  {room.numéro}
                </option>
              ))}
            </select>
          </div>
          <div className="button-group">
            <button className="btn-success" onClick={handleAssign}>
             Confirmer
            </button>
            <Link to="/dashboard-section2" className="btn-secondary">
              Annuler
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
