import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddMenuPage = () => {
    const [jour, setJour] = useState('');
    const [petitDejeuner, setPetitDejeuner] = useState('');
    const [dejeuner, setDejeuner] = useState('');
    const [diner, setDiner] = useState('');
    const [message, setMessage] = useState('');
    const [hovered, setHovered] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const newMenu = { jour, petitDejeuner, dejeuner, diner };

        axios.post('http://localhost:8080/menus/create', newMenu)
            .then(response => {
                setMessage('Menu ajouté avec succès!');
                navigate('/menus');
            })
            .catch(error => {
                setMessage('Erreur lors de l\'ajout du menu.');
            });
    };

    // Inline styles
    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f4f4f4',
        padding: '20px',
    };

    const cardStyle = {
        width: '100%',
        maxWidth: '600px',
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
        position: 'relative',
    };

    const headerStyle = {
        marginBottom: '20px',
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#333',
    };

    const formGroupStyle = {
        marginBottom: '15px',
    };

    const labelStyle = {
        display: 'block',
        marginBottom: '5px',
        fontWeight: '600',
        color: '#555',
    };

    const inputStyle = {
        width: '100%',
        padding: '12px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        boxSizing: 'border-box',
        fontSize: '16px',
    };

    const buttonStyle = {
        padding: '12px 20px',
        fontSize: '16px',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'background-color 0.3s, transform 0.3s, box-shadow 0.3s',
        color: 'white',
        margin: '5px',
        textAlign: 'center',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        outline: 'none',
    };

    const submitButtonStyle = {
        backgroundColor: '#4CAF50',
        border: '2px solid #4CAF50',
    };

    const submitButtonHoverStyle = {
        backgroundColor: '#45a049',
        border: '2px solid #45a049',
        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
        transform: 'scale(1.05)',
    };

    const cancelButtonStyle = {
        backgroundColor: '#f44336',
        border: '2px solid #f44336',
    };

    const cancelButtonHoverStyle = {
        backgroundColor: '#e53935',
        border: '2px solid #e53935',
        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
        transform: 'scale(1.05)',
    };

    return (
        <div style={containerStyle}>
            <div style={cardStyle}>
                <h2 style={headerStyle}>Ajouter un menu pour la semaine</h2>
                <form onSubmit={handleSubmit}>
                    <div style={formGroupStyle}>
                        <label style={labelStyle}>Jour:</label>
                        <input
                            type="text"
                            value={jour}
                            onChange={(e) => setJour(e.target.value)}
                            required
                            style={inputStyle}
                        />
                    </div>
                    <div style={formGroupStyle}>
                        <label style={labelStyle}>Petit Déjeuner</label>
                        <input
                            type="text"
                            value={petitDejeuner}
                            onChange={(e) => setPetitDejeuner(e.target.value)}
                            required
                            style={inputStyle}
                        />
                    </div>
                    <div style={formGroupStyle}>
                        <label style={labelStyle}>Déjeuner</label>
                        <input
                            type="text"
                            value={dejeuner}
                            onChange={(e) => setDejeuner(e.target.value)}
                            required
                            style={inputStyle}
                        />
                    </div>
                    <div style={formGroupStyle}>
                        <label style={labelStyle}>Diner</label>
                        <input
                            type="text"
                            value={diner}
                            onChange={(e) => setDiner(e.target.value)}
                            required
                            style={inputStyle}
                        />
                    </div>
                    <button
                        type="submit"
                        style={{
                            ...buttonStyle,
                            ...submitButtonStyle,
                            ...(hovered === 'submit' ? submitButtonHoverStyle : {}),
                        }}
                        onMouseEnter={() => setHovered('submit')}
                        onMouseLeave={() => setHovered(null)}
                    >
                        Ajouter Menu
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/menus')}
                        style={{
                            ...buttonStyle,
                            ...cancelButtonStyle,
                            ...(hovered === 'cancel' ? cancelButtonHoverStyle : {}),
                        }}
                        onMouseEnter={() => setHovered('cancel')}
                        onMouseLeave={() => setHovered(null)}
                    >
                        Annuler
                    </button>
                </form>
                {message && <p style={{ color: '#4CAF50', marginTop: '20px' }}>{message}</p>}
            </div>
        </div>
    );
};

export default AddMenuPage;
