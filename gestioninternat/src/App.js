import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login'; 
import DashboardSection1 from './pages/DashboardSection1'; 
import DashboardSection2 from './pages/DashboardSection2'; 
import Home from './pages/Home';
import AddUser from './users/AddUser';
import EditUser from './users/EditUser';
import UserDetails from './users/ViewUser';
import AssignRoom from './pages/AssignRoom';
import Rooms from './pages/Room';
import AddRoom from './rooms/AddRoom';
import EditRoom from './rooms/EditRoom';
import RoomDetails from './rooms/ViewRoom';
import RoomsWithStudents from './pages/RoomsWithStudents';
import StudentDashboard from './pages/StudentDashboard';
import SubmitComplaint from './pages/SubmitComplaint'; // Import the SubmitComplaint component
import ListComplaints from './pages/ListComplaints'; // Import the ListComplaints component
import ChangeRoom from './pages/ChangeRoom';
import AddMenu from './pages/AddMenu';
import ListMenu from './pages/MenuList';
import MenuListPage from './pages/MenuListPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/adduser" element={<AddUser />} />
          <Route path="/edituser/:id" element={<EditUser />} />
          <Route path="/userdetails/:id" element={<UserDetails />} />
          <Route path="/room" element={<Rooms />} />
          <Route path="/addroom" element={<AddRoom />} />
          <Route path="/editroom/:id" element={<EditRoom />} />
          <Route path="/roomdetails/:id" element={<RoomDetails />} />
          <Route path="/assignroom" element={<AssignRoom />} />
          <Route path="/rooms-with-students" element={<RoomsWithStudents />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/dashboard-section1" element={<DashboardSection1 />} />
          <Route path="/dashboard-section2" element={<DashboardSection2 />} />
          <Route path="/change-room" element={<ChangeRoom />} />
          {/* Routes for complaints */}
          <Route path="/submit-complaint" element={<SubmitComplaint />} />
          <Route path="/students-with-complaints" element={<ListComplaints />} />
          <Route path="/menu-management" element={<AddMenu />} />
          <Route path="/list-menu" element={<ListMenu />} />
          <Route path="/menus" element={<MenuListPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
