import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import DoctorDashboard from './components/DoctorDashboard';
import PatientDashboard from './pages/PatientDashboard';
import HospitalFinder from './pages/HospitalFinder';
import DoctorProfiles from './pages/DoctorProfiles';
import ProviderDashboard from './pages/ProviderDashboard';
import Login from './pages/Login';
import RoleSelection from './pages/RoleSelection';
import DoctorLogin from './pages/DoctorLogin';

import { ThemeProvider } from './context/ThemeContext';
import ThemeToggle from './components/ThemeToggle';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="app-container">
          <ThemeToggle />
          <Sidebar />
          <main className="main-content animate-fade-in">
            <Routes>
              <Route path="/" element={<RoleSelection />} />
              <Route path="/login" element={<Login />} />
              <Route path="/doctor-login" element={<DoctorLogin />} />
              <Route path="/dashboard" element={<PatientDashboard />} />
              <Route path="/hospitals" element={<HospitalFinder />} />
              <Route path="/doctors" element={<DoctorProfiles />} />
              <Route path="/provider" element={<ProviderDashboard />} />
          <Route path="/doctor" element={<DoctorDashboard />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
