import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function ChangeRoom() {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState('');
  const [message, setMessage] = useState('');
  const [student, setStudent] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const studentId = query.get('studentId');

  useEffect(() => {
    if (studentId) {
      fetchStudent(studentId);
    }
    fetchAvailableRooms();
  }, [studentId]);

  const fetchStudent = (id) => {
    axios.get(`http://localhost:8080/users/${id}`)
      .then(response => {
        setStudent(response.data);
      })
      .catch(error => {
        console.error('Error fetching student:', error);
        setMessage('Error fetching student data.');
      });
  };

  const fetchAvailableRooms = () => {
    axios.get('http://localhost:8080/rooms/available')
      .then(response => {
        setRooms(response.data);
      })
      .catch(error => {
        console.error('Error fetching available rooms:', error);
        setMessage('Error fetching available rooms.');
      });
  };

  const handleChangeRoom = () => {
    if (student && selectedRoom) {
      axios.put(`http://localhost:8080/${student.id}/room/${selectedRoom}`)
        .then(response => {
          setMessage('Room changed successfully.');
          setTimeout(() => navigate('/rooms-with-students'), 2000); // Navigate after 2 seconds
        })
        .catch(error => {
          console.error('Error changing room:', error);
          const errorMessage = error.response?.data || 'Error changing room.';
          setMessage(errorMessage);
        });
    } else {
      setMessage('Please select a room.');
    }
  };

  const handleRoomSelection = (e) => {
    setSelectedRoom(e.target.value);
    if (message) setMessage(''); // Clear message when changing selection
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="card shadow-lg" style={{ maxWidth: '600px', width: '100%', borderRadius: '15px', padding: '20px', marginTop: '-50px' }}>
        <h2 className="text-center mb-4" style={{ fontSize: '1.8rem', color: '#333', fontWeight: '700' }}>
          Change Room for {student ? `${student.firstName} ${student.lastName}` : 'Student'}
        </h2>
        {message && (
          <div className="alert alert-info text-center" style={{ fontSize: '1rem', padding: '10px', borderRadius: '10px' }}>
            {message}
          </div>
        )}
        <div className="form-group">
          <label htmlFor="roomSelect" className="form-label" style={{ fontWeight: '600', fontSize: '1.1rem', color: '#555' }}>
            Select New Room
          </label>
          <select
            id="roomSelect"
            className="form-select form-select-lg mb-3"
            value={selectedRoom}
            onChange={handleRoomSelection}
            style={{ borderRadius: '10px', padding: '10px' }}
          >
            <option value="">Select a room</option>
            {rooms.map(room => (
              <option key={room.id} value={room.id}>
                Room {room.numéro}
              </option>
            ))}
          </select>
        </div>
        <div className="text-center mt-4">
          <button
            className="btn btn-primary btn-lg"
            onClick={handleChangeRoom}
            style={{ backgroundColor: '#28a745', borderColor: '#28a745', borderRadius: '10px', padding: '10px 20px' }}
          >
            Change Room
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChangeRoom;
