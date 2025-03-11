import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './DashboardSection2.css'; // Assurez-vous que ce chemin est correct
import logo from '../asset/imagee.png'; // Ajustez le chemin si nécessaire

const DashboardSection2 = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    navigate('/'); 
  };

  return (
    <div className="dashboard-container">
      <img src={logo} alt="Logo de l'internat" className="dashboard-image" />
      <div className="dashboard-content">
        <h1 className="dashboard-title">Bonjour</h1>
        <p className="dashboard-subtitle">Ici, vous pouvez gérer les plaintes et attribuer les chambres.</p>
        <div className="dashboard-buttons">
          <Link to="/assignroom">
            <button className="dashboard-button dashboard-button-rooms">Attribuer une Chambre</button>
          </Link>
          <Link to="/students-with-complaints">
            <button className="dashboard-button dashboard-button-users">Lister les Plaintes</button>
          </Link>
          <button className="dashboard-button dashboard-button-logout" onClick={handleLogout}>Se Déconnecter</button>
        </div>
      </div>
    </div>
  );
};

export default DashboardSection2;
