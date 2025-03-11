import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaCog, FaTrashAlt } from 'react-icons/fa'; // Import des icônes
import { Modal, Button } from 'react-bootstrap'; // Import de Bootstrap Modal
import './MenuListPage.css'; // Assurez-vous que le chemin est correct
import 'bootstrap/dist/css/bootstrap.min.css'; // Pour les styles Bootstrap

const MenuList = () => {
    const [menus, setMenus] = useState([]);
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null); // Référence pour le menu
    const [showModal, setShowModal] = useState(false); // Gérer l'affichage du Modal de confirmation

    useEffect(() => {
        axios.get('http://localhost:8080/menus/week')
            .then(response => {
                setMenus(response.data);
            })
            .catch(error => {
                console.error('Il y a eu un problème avec la récupération des menus:', error);
            });
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleDeleteAll = () => {
        axios.delete('http://localhost:8080/menus/delete-all')
            .then(() => {
                setMenus([]);  // Vider la liste après suppression
                alert('Tous les menus ont été supprimés.');
                setShowModal(false); // Fermer le modal après suppression
            })
            .catch(error => {
                console.error('Il y a eu un problème avec la suppression des menus:', error);
                alert('Erreur lors de la suppression des menus.');
            });
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleShowModal = () => {
        setShowModal(true); // Afficher le modal
    };

    const handleCloseModal = () => {
        setShowModal(false); // Fermer le modal sans supprimer
    };

    return (
        <div className="menu-list-page">
            <header className="header">
                <img src={require('../asset/image2.png')} alt="Logo" className="logo-img" />
                <div className="hamburger-menu" onClick={toggleMenu} ref={menuRef}>
                    <div className="hamburger-icon">&#9776;</div>
                    <div className={`menu-dropdown ${menuOpen ? 'show' : ''}`}>
                        <Link to="/dashboard-section1" className="menu-link">
                            <button className="btn-custom-back">
                                <FaArrowLeft className="icon" /> Retour
                            </button>
                        </Link>
                        <Link to="/menu-management" className="menu-link">
                            <button className="btn-custom btn-custom-manage">
                                <FaCog className="icon" /> Gérer Menus
                            </button>
                        </Link>
                        <button className="btn-custom btn-custom-delete" onClick={handleShowModal}>
                            <FaTrashAlt className="icon" /> Supprimer Tout
                        </button>
                    </div>
                </div>
            </header>
            <div className="content">
                <h2 className="menu-title">Menu de la semaine</h2>
                {menus.length > 0 ? (
                    <table className="menu-table">
                        <thead>
                            <tr>
                                <th>Jour</th>
                                <th>Petit Déjeuner</th>
                                <th>Déjeuner</th>
                                <th>Diner</th>
                            </tr>
                        </thead>
                        <tbody>
                            {menus.map(menu => (
                                <tr key={menu.id}>
                                    <td>{menu.jour}</td>
                                    <td>{menu.petitDejeuner}</td>
                                    <td>{menu.dejeuner}</td>
                                    <td>{menu.diner}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>Aucun menu disponible pour le moment.</p>
                )}
            </div>

            {/* Modal de confirmation */}
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmer la suppression</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Êtes-vous sûr de vouloir supprimer **tous les menus** ? Cette action est irréversible.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Annuler
                    </Button>
                    <Button variant="danger" onClick={handleDeleteAll}>
                        Supprimer Tout
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default MenuList;
