import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const result = await axios.get(`http://localhost:8080/users/${id}`);
        setUser(result.data);
      } catch (error) {
        console.error('There was an error fetching the user details!', error);
      }
    };

    loadUser();
  }, [id]);

  if (!user) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-secondary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="card shadow-lg">
            <div className="card-header" style={{ backgroundColor: '#f0f0f0', color: '#333' }}>
              <h2 className="text-center mb-0">Détails de l'utilisateur</h2>
            </div>
            <div className="card-body" style={{ backgroundColor: '#f9f9f9' }}>
              <ul className="list-group list-group-flush mt-4">
                <li className="list-group-item">
                  <strong><i className="bi bi-person-circle"></i> Prénom :</strong> {user.firstName}
                </li>
                <li className="list-group-item">
                  <strong><i className="bi bi-person"></i> Nom :</strong> {user.lastName}
                </li>
                <li className="list-group-item">
                  <strong><i className="bi bi-briefcase"></i> Rôle :</strong> {user.role}
                </li>
                <li className="list-group-item">
                  <strong><i className="bi bi-envelope"></i> Email :</strong> {user.email}
                </li>
                <li className="list-group-item">
                  <strong><i className="bi bi-lock"></i> Mot de passe :</strong> {user.password}
                </li>
              </ul>
            </div>
            <div className="card-footer text-center">
              <button className="btn" style={{ backgroundColor: '#d3d3d3', color: '#333' }} onClick={() => window.history.back()}>
                Retour
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
