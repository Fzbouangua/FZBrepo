import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function AddUser() {
  let navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    role: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const { firstName, lastName, role, email, password } = user;

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const validateForm = () => {
    let formErrors = {};
    if (!firstName) formErrors.firstName = "Le prénom est requis";
    if (!lastName) formErrors.lastName = "Le nom de famille est requis";
    if (!role) formErrors.role = "Le rôle est requis";
    if (!email) formErrors.email = "L'email est requis";
    if (!password) formErrors.password = "Le mot de passe est requis";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await axios.post("http://localhost:8080/user", user);
        console.log('Utilisateur ajouté avec succès:', user);
        navigate("/Home");
      } catch (error) {
        console.error('Il y a eu une erreur lors de l\'ajout de l\'utilisateur!', error);
      }
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8">
          <div className="card shadow-lg border-light rounded p-4">
            <h2 className="text-center mb-4">Enregistrer un utilisateur</h2>
            <form onSubmit={onSubmit}>
              <div className="mb-3">
                <label htmlFor="firstName" className="form-label">
                  <i className="bi bi-person-fill me-2"></i> Prénom
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Entrez le prénom"
                  name="firstName"
                  value={firstName}
                  onChange={onInputChange}
                  required
                />
                {errors.firstName && <div className="text-danger">{errors.firstName}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="lastName" className="form-label">
                  <i className="bi bi-person-fill me-2"></i> Nom de famille
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Entrez le nom de famille"
                  name="lastName"
                  value={lastName}
                  onChange={onInputChange}
                  required
                />
                {errors.lastName && <div className="text-danger">{errors.lastName}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="role" className="form-label">
                  <i className="bi bi-briefcase-fill me-2"></i> Rôle
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Entrez le rôle"
                  name="role"
                  value={role}
                  onChange={onInputChange}
                  required
                />
                {errors.role && <div className="text-danger">{errors.role}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  <i className="bi bi-envelope-fill me-2"></i> Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Entrez l'email"
                  name="email"
                  value={email}
                  onChange={onInputChange}
                  required
                />
                {errors.email && <div className="text-danger">{errors.email}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  <i className="bi bi-lock-fill me-2"></i> Mot de passe
                </label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Entrez le mot de passe"
                  name="password"
                  value={password}
                  onChange={onInputChange}
                  required
                />
                {errors.password && <div className="text-danger">{errors.password}</div>}
              </div>
              <div className="d-flex justify-content-between">
                <button type="submit" className="btn btn-success">
                  <i className="bi bi-check2 me-2"></i> Soumettre
                </button>
                <Link className="btn btn-outline-secondary" to="/Home">
                  <i className="bi bi-x-circle me-2"></i> Annuler
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
