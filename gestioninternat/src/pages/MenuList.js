import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MenuList = () => {
    const [menus, setMenus] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8080/menus/week')
            .then(response => {
                setMenus(response.data);
            })
            .catch(error => {
                console.error('Il y a eu un problème avec la récupération des menus:', error);
            });
    }, []);

    const handleBack = () => {
        navigate('/student-dashboard');
    };

    // Inline styles
    const containerStyle = {
        padding: '20px',
        backgroundColor: '#f4f4f4',
        minHeight: '100vh',
        fontFamily: 'Arial, sans-serif',
    };

    const headerStyle = {
        marginBottom: '20px',
        fontSize: '28px',
        color: '#333',
        textAlign: 'center',
    };

    const tableStyle = {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px',
    };

    const thStyle = {
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '12px',
        textAlign: 'center',  // Center text
        borderBottom: '2px solid #ddd',
    };

    const tdStyle = {
        padding: '12px',
        textAlign: 'center',  // Center text
        borderBottom: '1px solid #ddd',
    };

    const trStyle = {
        transition: 'background-color 0.3s',
    };

    const trHoverStyle = {
        backgroundColor: '#f1f1f1',
    };

    const noDataStyle = {
        textAlign: 'center',
        color: '#777',
        fontSize: '18px',
    };

    const backButtonStyle = {
        display: 'flex',
        alignItems: 'center',
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#a9a9a9',  // Blue color
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        textDecoration: 'none',
        marginBottom: '20px',
        width: 'fit-content',  // Adjust width to content
    };

    const backButtonTextStyle = {
        marginLeft: '8px',  // Space between emoji and text
    };

    return (
        <div style={containerStyle}>
            <button style={backButtonStyle} onClick={handleBack}>
                <span role="img" aria-label="back">⬅️</span>
                <span style={backButtonTextStyle}>Retour</span>
            </button>
            <h2 style={headerStyle}>Menu de la semaine</h2>
            {menus.length > 0 ? (
                <table style={tableStyle}>
                    <thead>
                        <tr>
                            <th style={thStyle}>Jour</th>
                            <th style={thStyle}>Petit Déjeuner</th>
                            <th style={thStyle}>Déjeuner</th>
                            <th style={thStyle}>Diner</th>
                        </tr>
                    </thead>
                    <tbody>
                        {menus.map(menu => (
                            <tr key={menu.id} style={trStyle} onMouseEnter={e => e.currentTarget.style.backgroundColor = trHoverStyle.backgroundColor} onMouseLeave={e => e.currentTarget.style.backgroundColor = ''}>
                                <td style={tdStyle}>{menu.jour}</td>
                                <td style={tdStyle}>{menu.petitDejeuner}</td>
                                <td style={tdStyle}>{menu.dejeuner}</td>
                                <td style={tdStyle}>{menu.diner}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p style={noDataStyle}>Aucun menu disponible pour le moment.</p>
            )}
        </div>
    );
};

export default MenuList;
