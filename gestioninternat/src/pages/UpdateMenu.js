import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UpdateMenu = () => {
    const { id } = useParams();
    const [jour, setJour] = useState('');
    const [petitDejeuner, setPetitDejeuner] = useState('');
    const [dejeuner, setDejeuner] = useState('');
    const [diner, setDiner] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:8080/menus/${id}`)
            .then(response => {
                setJour(response.data.jour);
                setPetitDejeuner(response.data.petitDejeuner);
                setDejeuner(response.data.dejeuner);
                setDiner(response.data.diner);
            })
            .catch(error => {
                setMessage('Erreur lors de la récupération du menu.');
            });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedMenu = { jour, petitDejeuner, dejeuner, diner };

        axios.put(`http://localhost:8080/menus/update/${id}`, updatedMenu)
            .then(response => {
                setMessage('Menu mis à jour avec succès!');
            })
            .catch(error => {
                setMessage('Erreur lors de la mise à jour du menu.');
            });
    };

    return (
        <div>
            <h2>Mettre à jour le menu</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Jour:</label>
                    <input
                        type="text"
                        value={jour}
                        onChange={(e) => setJour(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Petit Déjeuner:</label>
                    <input
                        type="text"
                        value={petitDejeuner}
                        onChange={(e) => setPetitDejeuner(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Déjeuner:</label>
                    <input
                        type="text"
                        value={dejeuner}
                        onChange={(e) => setDejeuner(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Diner:</label>
                    <input
                        type="text"
                        value={diner}
                        onChange={(e) => setDiner(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Mettre à jour Menu</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default UpdateMenu;
