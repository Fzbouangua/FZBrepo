import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../asset/image2.png'; // Ajustez le chemin en fonction de votre structure de dossiers

const StudentDashboard = () => {
  const [studentData, setStudentData] = useState(null);
  const [error, setError] = useState('');

  const email = localStorage.getItem('userEmail');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/auth/user/${email}`);
        setStudentData(response.data);
      } catch (err) {
        console.error(err);
        setError('Échec de la récupération des données de l\'étudiant');
      }
    };

    if (email) {
      fetchStudentData();
    } else {
      setError('Aucun email trouvé dans le stockage local');
    }
  }, [email]);

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    navigate('/');
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'linear-gradient(to right, #f0f0f0, #cccccc)',
    padding: '20px',
    fontFamily: "'Roboto', sans-serif",
  };

  const cardStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.15)',
    padding: '40px',
    width: '50%',
    maxWidth: '800px',
    textAlign: 'center',
    color: '#333',
  };

  const logoStyle = {
    width: '180px', // Ajustez la taille du logo selon les besoins
    marginBottom: '20px',
  };

  const infoStyle = {
    marginBottom: '20px',
    padding: '15px',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    border: '1px solid #ddd',
  };

  const errorStyle = {
    color: '#ff4d4d',
    fontWeight: 'bold',
    marginBottom: '20px',
  };

  const buttonMenuStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '30px',
  };

  const buttonStyle = {
    padding: '12px 24px',
    backgroundColor: '#28a745',
    color: '#ffffff',
    border: 'none',
    borderRadius: '50px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.3s ease, transform 0.3s ease',
    textDecoration: 'none',
    fontWeight: 'bold',
    marginBottom: '10px',
    width: '100%',
    maxWidth: '200px',
  };

  const buttonHoverStyle = {
    backgroundColor: '#218838',
    transform: 'scale(1.05)',
  };

  const logoutButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#dc3545', // Rouge pour le bouton de déconnexion
  };

  const logoutButtonHoverStyle = {
    backgroundColor: '#c82333', // Rouge plus foncé pour le survol
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <img src={logo} alt="Logo" style={logoStyle} />
        {error && <p style={errorStyle}>{error}</p>}
        {studentData ? (
          <div>
            <h2 style={{ marginBottom: '30px', fontSize: '1.5rem' }}>Bienvenue, {studentData.firstName} !</h2>
            <div style={infoStyle}>
              <strong>Prénom :</strong> {studentData.firstName}
            </div>
            <div style={infoStyle}>
              <strong>Nom :</strong> {studentData.lastName}
            </div>
            <div style={infoStyle}>
              <strong>Email :</strong> {studentData.email}
            </div>
            <div style={infoStyle}>
              <strong>Rôle :</strong> {studentData.role}
            </div>

            <div style={buttonMenuStyle}>
              <Link 
                to="/submit-complaint" 
                style={buttonStyle}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = buttonHoverStyle.backgroundColor;
                  e.target.style.transform = buttonHoverStyle.transform;
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = buttonStyle.backgroundColor;
                  e.target.style.transform = 'none';
                }}
              >
                Faire une plainte
              </Link>
              <Link 
                to="/list-menu" 
                style={buttonStyle}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = buttonHoverStyle.backgroundColor;
                  e.target.style.transform = buttonHoverStyle.transform;
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = buttonStyle.backgroundColor;
                  e.target.style.transform = 'none';
                }}
              >
                 Menu de la semaine
              </Link>
              <button
                style={logoutButtonStyle}
                onMouseOver={(e) => (e.target.style.backgroundColor = logoutButtonHoverStyle.backgroundColor)}
                onMouseOut={(e) => (e.target.style.backgroundColor = logoutButtonStyle.backgroundColor)}
                onClick={handleLogout}
              >
                Déconnexion
              </button>
            </div>
          </div>
        ) : (
          <p>Aucune donnée utilisateur disponible</p>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
