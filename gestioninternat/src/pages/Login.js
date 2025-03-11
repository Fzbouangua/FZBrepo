import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Assurez-vous de créer et de lier ce fichier CSS

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://localhost:8080/auth/login', { email, password });
      const user = response.data;

      // Stocker les informations utilisateur dans le localStorage ou le contexte
      localStorage.setItem('userEmail', user.email);
      localStorage.setItem('userRole', user.role);

      // Redirection en fonction du rôle de l'utilisateur
      if (user.role === 'STUDENT') {
        navigate('/student-dashboard');
      } else if (user.role === 'SURVEILLANT') {
        navigate('dashboard-section2');
      } else if (user.role === 'ADMIN') {
        navigate('/dashboard-section1'); // Assurez-vous que cette route existe
       } else if (user.role === 'TECHNICIEN') {
          navigate('/dashboard-section1'); // Assurez-vous que cette route existe
      } else {
        setError('Invalid role');
      }
    } catch (err) {
      console.error(err);
      setError('Invalid email or password');
    }
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center">
      <div className="login-form card p-4 shadow">
        <h2 className="text-center">Bienvenue</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Mot de passe</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block mt-3">Se connecter</button>
        </form>
        {error && <p className="text-danger text-center mt-3">{error}</p>}
        <p className="text-center mt-4" style={{ fontSize: '0.8rem', color: '#6c757d' }}>
          &copy; {new Date().getFullYear()} IbnGhazi cpge. Tous droits réservés.
        </p>
      </div>
    </div>
  );
};

export default Login;
