import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './DashboardSection1.css';
import image from '../asset/imagee.png'; // Ajustez le chemin si nécessaire

const DashboardSection1 = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <img src={image} alt="Tableau de bord" className="dashboard-image" />
      <div className="dashboard-content">
        <h1 className="dashboard-title">Bonjour</h1>
        <p className="dashboard-subtitle">
          Bienvenue dans l'interface d'administration. Utilisez les boutons ci-dessous pour naviguer dans les différentes sections ou pour vous déconnecter.
        </p>
        <div className="dashboard-buttons">
          <Link to="/home">
            <button className="dashboard-button dashboard-button-users">
             Gérer les Utilisateurs
            </button>
          </Link>
          <Link to="/room">
            <button className="dashboard-button dashboard-button-rooms">
            Gérer les Chambres
            </button>
          </Link>
          <Link to="/menus">
            <button className="dashboard-button dashboard-button-menu">
              Gérer le Menu
            </button>
          </Link>
          <button className="dashboard-button dashboard-button-logout" onClick={handleLogout}>
            Se Déconnecter
          </button>
        </div>
      </div>
      <footer className="dashboard-footer">
        <p>&copy; {new Date().getFullYear()} IbnGhazi cpge. Tous droits réservés.</p>
      </footer>
    </div>
  );
};

export default DashboardSection1;
