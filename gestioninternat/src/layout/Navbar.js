import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import logo from '../asset/image2.png'; // Ensure the path to your logo is correct

export default function Navbar() {
  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userEmail'); // Example: remove user email from local storage
    navigate('/'); // Navigate to the home page
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src={logo} alt="Logo" style={{ height: '100px', width: 'auto', marginRight: '10px' }} />
          </a>
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarSupportedContent" 
            aria-controls="navbarSupportedContent" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="ms-auto d-flex align-items-center">
              <Link className="btn btn-outline-success me-2" to="/adduser">
                <i className="bi bi-person-plus me-2"></i> Add User
              </Link>
              <button className="btn btn-outline-danger" onClick={handleLogout}>
                <i className="bi bi-box-arrow-right me-2"></i> Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
