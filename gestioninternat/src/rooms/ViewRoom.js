import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Assurez-vous que Bootstrap est importé

export default function RoomDetails() {
  const { id } = useParams(); // Utilise l'ID de la chambre depuis les paramètres de l'URL
  const [room, setRoom] = useState(null); // État pour stocker les détails de la chambre

  useEffect(() => {
    // Fonction pour charger les détails de la chambre
    const loadRoom = async () => {
      try {
        const result = await axios.get(`http://localhost:8080/rooms/${id}`);
        console.log('Room data:', result.data); // Vérifiez les données ici
        setRoom(result.data); // Met à jour l'état avec les détails de la chambre
      } catch (error) {
        console.error('There was an error fetching the room details!', error);
      }
    };

    loadRoom(); // Appelle la fonction de chargement lors du premier rendu
  }, [id]);

  if (!room) {
    return <p>Loading...</p>; // Affiche un message de chargement si les détails de la chambre ne sont pas encore disponibles
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          {/* Bouton Retour */}
          <div className="d-flex justify-content-start align-items-center mt-3 mb-4">
            <Link to="/room" className="btn btn-outline-primary">
              <i className="bi bi-arrow-left"></i> Retour
            </Link>
          </div>
          {/* Carte Détails de la Chambre */}
          <div className="d-flex justify-content-center">
            <div className="col-md-8 border rounded p-4 shadow-lg">
              <h3 className="text-center mb-4">Détails de la Chambre</h3> {/* Taille réduite */}
              <div className="card">
                <div className="card-header bg-primary text-white">
                  ID: {room.id}
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <b>Numéro:</b> {room.numéro}
                  </li>
                  <li className="list-group-item">
                    <b>Capacité:</b> {room.capacity}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
