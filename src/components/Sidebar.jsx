import { NavLink } from 'react-router-dom';
import { Activity, MapPin, Users, User } from 'lucide-react';
import './Sidebar.css';

export default function Sidebar() {
  return (
    <aside className="sidebar glass-panel">
      <div className="sidebar-header">
        <div className="logo">
           <Activity color="var(--primary-color)" size={32} />
           <h2>Aura Med</h2>
        </div>
      </div>
      <nav className="sidebar-nav">
        <NavLink to="/login" className="nav-item">
          <User size={20} />
          <span>Login</span>
        </NavLink>
        <NavLink to="/dashboard" className="nav-item">
          <Activity size={20} />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/hospitals" className="nav-item">
          <MapPin size={20} />
          <span>Hospitals</span>
        </NavLink>
        <NavLink to="/doctors" className="nav-item">
          <Users size={20} />
          <span>Doctors</span>
        </NavLink>
        <NavLink to="/provider" className="nav-item">
          <Activity size={20} />
          <span>Provider</span>
        </NavLink>
      </nav>
    </aside>
  );
}
