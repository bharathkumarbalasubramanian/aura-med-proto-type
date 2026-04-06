import { useState } from 'react';
import { Calendar, Clock, Star, Award, Search, X } from 'lucide-react';
import './DoctorProfiles.css';

const MOCK_DOCTORS = [
  { id: 1, name: "Dr. Sarah Chen", specialty: "Cardiologist", exp: "12 years", rating: 4.9, img: "https://i.pravatar.cc/150?img=1", hospital: "City General Hospital" },
  { id: 2, name: "Dr. Marcus Johnson", specialty: "Neurologist", exp: "8 years", rating: 4.8, img: "https://i.pravatar.cc/150?img=11", hospital: "Aura Medical Center" },
  { id: 3, name: "Dr. Emily Taylor", specialty: "General Practitioner", exp: "15 years", rating: 5.0, img: "https://i.pravatar.cc/150?img=5", hospital: "St. Jude Clinic" },
  { id: 4, name: "Dr. Raj Patel", specialty: "Pediatrician", exp: "10 years", rating: 4.7, img: "https://i.pravatar.cc/150?img=15", hospital: "City General Hospital" },
];

export default function DoctorProfiles() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [bookingStep, setBookingStep] = useState(0); // 0: none, 1: select time, 2: success

  const filteredDoctors = MOCK_DOCTORS.filter(d => 
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    d.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openBooking = (doc) => {
    setSelectedDoctor(doc);
    setBookingStep(1);
  };

  const closeBooking = () => {
    setSelectedDoctor(null);
    setBookingStep(0);
  };

  return (
    <div className="page-container animate-fade-in">
      <header className="page-header" style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', background: 'linear-gradient(90deg, var(--text-main), var(--primary-color))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent' }}>Doctor Portfolios</h1>
        <p className="text-muted">Find specialists and book appointments seamlessly.</p>
      </header>
      
      <div className="search-bar glass-panel mb-4" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', marginBottom: '2rem' }}>
        <Search color="var(--text-muted)" size={20} />
        <input 
          type="text" 
          placeholder="Search by name or specialty..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="doctors-grid">
        {filteredDoctors.map(doc => (
          <div key={doc.id} className="glass-panel doctor-card interactive">
             <div className="doc-header">
               <img src={doc.img} alt={doc.name} className="doc-avatar" />
               <div className="doc-title">
                 <h3>{doc.name}</h3>
                  <p className="specialty">{doc.specialty}</p>
                  <p className="hospital" style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>{doc.hospital}</p>
               </div>
             </div>
             
             <div className="doc-stats">
               <div className="stat">
                 <Award size={16} color="var(--primary-color)" />
                 <span>{doc.exp}</span>
               </div>
               <div className="stat">
                 <Star size={16} color="var(--warning)" />
                 <span>{doc.rating} Rating</span>
               </div>
             </div>
             
             <button className="btn btn-primary w-100 mt-4" onClick={() => openBooking(doc)}>
               <Calendar size={18} /> Book Appointment
             </button>
          </div>
        ))}
      </div>

      {bookingStep > 0 && selectedDoctor && (
        <div className="modal-overlay animate-fade-in">
          <div className="glass-panel modal-content">
            <button className="close-btn" onClick={closeBooking}><X size={24} /></button>
            {bookingStep === 1 && (
              <>
                <h2>Book with {selectedDoctor.name}</h2>
                <p className="text-muted mb-4">Select an available time slot</p>
                <div className="time-slots">
                  {['09:00 AM', '10:30 AM', '01:00 PM', '03:15 PM'].map(time => (
                    <button key={time} className="btn btn-glass slot-btn" onClick={() => setBookingStep(2)}>
                      <Clock size={16} /> {time}
                    </button>
                  ))}
                </div>
              </>
            )}
            {bookingStep === 2 && (
              <div className="success-state text-center">
                <div className="success-icon mb-4">
                  <Star size={48} color="var(--success)" />
                </div>
                <h2>Appointment Confirmed!</h2>
                <p className="text-muted">You are booked with {selectedDoctor.name}.</p>
                <button className="btn btn-primary mt-4" onClick={closeBooking}>Done</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
