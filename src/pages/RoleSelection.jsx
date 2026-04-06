import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Stethoscope } from 'lucide-react';
import './RoleSelection.css';

export default function RoleSelection() {
  const navigate = useNavigate();

  return (
    <div className="role-selection-page">
      <div className="glass-card role-card">
        <h1 className="title">Aura Med</h1>
        <p className="subtitle">Choose your role to continue</p>
        
        <div className="role-options">
          <div className="role-option" onClick={() => navigate('/login')}>
            <div className="icon-wrapper">
              <User size={48} color="var(--primary-color)" />
            </div>
            <h3>Patient</h3>
            <p>Access your health dashboard, book appointments, and find hospitals.</p>
          </div>

          <div className="role-option" onClick={() => navigate('/doctor-login')}>
            <div className="icon-wrapper">
              <Stethoscope size={48} color="var(--primary-color)" />
            </div>
            <h3>Doctor</h3>
            <p>Manage patient portfolios, provide prescriptions, and track health data.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
