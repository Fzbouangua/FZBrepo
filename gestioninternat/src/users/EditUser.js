import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function EditUser() {
  let navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    role: "",
    email: "",
    password: "",
  });

  const { firstName, lastName, role, email, password } = user;

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  useEffect(() => {
    const loadUsers = async () => {
      const result = await axios.get(`http://localhost:8080/users/${id}`);
      setUser(result.data);
    };

    loadUsers();
  }, [id]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/users/${id}`, user);
      console.log('User updated successfully:', user);
      navigate("/Home");
    } catch (error) {
      console.error('There was an error updating the user!', error);
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg p-4">
            <h2 className="text-center mb-4">Editer un utilisateur</h2>
            <form onSubmit={onSubmit}>
              <div className="mb-3 input-group">
                <span className="input-group-text"><i className="bi bi-person"></i></span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter First Name"
                  name="firstName"
                  value={firstName}
                  onChange={onInputChange}
                />
              </div>
              <div className="mb-3 input-group">
                <span className="input-group-text"><i className="bi bi-person"></i></span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Last Name"
                  name="lastName"
                  value={lastName}
                  onChange={onInputChange}
                />
              </div>
              <div className="mb-3 input-group">
                <span className="input-group-text"><i className="bi bi-briefcase"></i></span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Role"
                  name="role"
                  value={role}
                  onChange={onInputChange}
                />
              </div>
              <div className="mb-3 input-group">
                <span className="input-group-text"><i className="bi bi-envelope"></i></span>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter Email"
                  name="email"
                  value={email}
                  onChange={onInputChange}
                />
              </div>
              <div className="mb-3 input-group">
                <span className="input-group-text"><i className="bi bi-lock"></i></span>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter Password"
                  name="password"
                  value={password}
                  onChange={onInputChange}
                />
              </div>
              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <button type="submit" className="btn btn-primary me-md-2">Confirmer</button>
                <Link className="btn btn-danger" to="/Home">Annuler</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
