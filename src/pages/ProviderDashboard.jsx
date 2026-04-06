import { useState } from 'react';
import { User, Calendar, Users, LogOut, Search, Bell } from 'lucide-react';
import DoctorProfileView from '../components/DoctorProfileView';
import ScheduleView from '../components/ScheduleView';
import PatientsView from '../components/PatientsView';
import '../components/DoctorDashboard.css';

const SidebarSections = {
  PROFILE: "profile",
  SCHEDULE: "schedule",
  PATIENTS: "patients",
};

export default function ProviderDashboard() {
  const [activeSection, setActiveSection] = useState(SidebarSections.PROFILE);

  const renderContent = () => {
    switch (activeSection) {
      case SidebarSections.PROFILE:
        return <DoctorProfileView />;
      case SidebarSections.SCHEDULE:
        return <ScheduleView />;
      case SidebarSections.PATIENTS:
        return <PatientsView />;
      default:
        return <DoctorProfileView />;
    }
  };

  return (
    <div className="doctor-dashboard">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div style={{ marginBottom: '2rem' }}>
          <img src="/vite.svg" alt="Aura Med" style={{ width: '40px' }} />
        </div>
        
        <div 
          className={`sidebar-icon ${activeSection === SidebarSections.PROFILE ? 'active' : ''}`}
          onClick={() => setActiveSection(SidebarSections.PROFILE)}
          title="Profile"
        >
          <User size={24} />
        </div>
        
        <div 
          className={`sidebar-icon ${activeSection === SidebarSections.SCHEDULE ? 'active' : ''}`}
          onClick={() => setActiveSection(SidebarSections.SCHEDULE)}
          title="Schedule"
        >
          <Calendar size={24} />
        </div>
        
        <div 
          className={`sidebar-icon ${activeSection === SidebarSections.PATIENTS ? 'active' : ''}`}
          onClick={() => setActiveSection(SidebarSections.PATIENTS)}
          title="Patients"
        >
          <Users size={24} />
        </div>

        <div style={{ marginTop: 'auto' }}>
          <div className="sidebar-icon" title="Logout">
            <LogOut size={24} />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Top Header */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
          <div style={{ position: 'relative', width: '300px' }}>
            <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={18} />
            <input 
              type="text" 
              placeholder="Search records..." 
              style={{ 
                width: '100%', 
                padding: '0.8rem 1rem 0.8rem 3rem', 
                background: 'var(--panel-bg)', 
                border: '1px solid var(--panel-border)', 
                borderRadius: '12px',
                color: 'var(--text-main)',
                outline: 'none'
              }} 
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
             <div style={{ position: 'relative', cursor: 'pointer' }}>
                <Bell size={22} color="var(--text-muted)" />
                <div style={{ position: 'absolute', top: '-2px', right: '-2px', width: '8px', height: '8px', background: 'var(--danger)', borderRadius: '50%' }}></div>
             </div>
             <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '15px', border: '1px solid var(--panel-border)' }}>
                <img src="https://i.pravatar.cc/150?img=1" alt="Me" style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
                <span style={{ fontWeight: '500', fontSize: '0.9rem' }}>Dr. Sarah Chen</span>
             </div>
          </div>
        </header>

        {renderContent()}
      </main>
    </div>
  );
}
