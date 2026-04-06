import { User, Mail, Phone, MapPin, Award } from 'lucide-react';

const mockDoctor = {
  name: "Dr. Sarah Chen",
  specialty: "Senior Cardiologist",
  img: "https://i.pravatar.cc/150?img=1",
  email: "sarah.chen@aura-med.com",
  phone: "+91 98765 43210",
  hospital: "City General Hospital",
  experience: "12 years",
  education: "MD, Cardiology - Stanford University",
};

export default function DoctorProfileView() {
  return (
    <div className="view-container">
      <h2 style={{ marginBottom: '2rem', fontSize: '2rem' }}>Doctor Profile</h2>
      
      <div className="glass-panel" style={{ display: 'flex', gap: '3rem', alignItems: 'flex-start', padding: '3rem' }}>
        <div style={{ position: 'relative' }}>
          <img 
            src={mockDoctor.img} 
            alt={mockDoctor.name} 
            style={{ width: '150px', height: '150px', borderRadius: '30px', objectFit: 'cover', border: '3px solid var(--primary-color)', padding: '5px' }} 
          />
          <div style={{ position: 'absolute', bottom: '-10px', right: '-10px', background: 'var(--primary-color)', color: '#000', padding: '0.5rem', borderRadius: '12px', display: 'flex' }}>
            <Award size={20} />
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: 'var(--text-main)', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}>{mockDoctor.name}</h3>
          <p style={{ color: 'var(--primary-color)', fontSize: '1.2rem', fontWeight: '500', marginBottom: '2rem' }}>{mockDoctor.specialty}</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div className="info-item" style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-main)', opacity: 0.8 }}>
              <Mail size={20} color="var(--primary-color)" />
              <span>{mockDoctor.email}</span>
            </div>
            <div className="info-item" style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-main)', opacity: 0.8 }}>
              <Phone size={20} color="var(--primary-color)" />
              <span>{mockDoctor.phone}</span>
            </div>
            <div className="info-item" style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-main)', opacity: 0.8 }}>
              <MapPin size={20} color="var(--primary-color)" />
              <span>{mockDoctor.hospital}</span>
            </div>
            <div className="info-item" style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-main)', opacity: 0.8 }}>
              <Award size={20} color="var(--primary-color)" />
              <span>{mockDoctor.experience} Exp</span>
            </div>
          </div>

          <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--panel-border)' }}>
            <h4 style={{ marginBottom: '1rem', color: 'var(--text-main)' }}>Education & Certifications</h4>
            <p style={{ color: 'var(--text-muted)' }}>{mockDoctor.education}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
