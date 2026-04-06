import { useEffect, useState } from 'react';
import { Activity, Bell, Target, Pill, CheckCircle2, User, Mail, Phone, MapPin, Calendar, Heart, Pencil, Circle, FileText } from 'lucide-react';
import Card from '../components/Card';
import './PatientDashboard.css';

const HealthImprovementChart = () => {
  const [view, setView] = useState('daily');
  
  const data = {
    daily: [
      { label: 'Mon', value: 65, status: 'up' },
      { label: 'Tue', value: 45, status: 'down' },
      { label: 'Wed', value: 75, status: 'up' },
      { label: 'Thu', value: 85, status: 'up' },
      { label: 'Fri', value: 70, status: 'up' },
      { label: 'Sat', value: 90, status: 'up' },
      { label: 'Sun', value: 80, status: 'down' }
    ],
    weekly: [
      { label: 'W1', value: 60, status: 'up' },
      { label: 'W2', value: 72, status: 'up' },
      { label: 'W3', value: 68, status: 'down' },
      { label: 'W4', value: 85, status: 'up' }
    ],
    monthly: [
      { label: 'Jan', value: 55, status: 'up' },
      { label: 'Feb', value: 62, status: 'up' },
      { label: 'Mar', value: 58, status: 'down' },
      { label: 'Apr', value: 75, status: 'up' },
      { label: 'May', value: 82, status: 'up' },
      { label: 'Jun', value: 88, status: 'up' }
    ]
  };

  const activeData = data[view];
  const maxVal = 100;

  return (
    <div className="health-chart-wrapper">
      <div className="chart-header">
        <div className="view-toggle">
          {['daily', 'weekly', 'monthly'].map(v => (
            <button 
              key={v} 
              className={`view-btn ${view === v ? 'active' : ''}`}
              onClick={() => setView(v)}
            >
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </button>
          ))}
        </div>
      </div>
      
      <div className="bar-chart">
        <div className="bars-container">
          {activeData.map((d, i) => (
            <div key={i} className="bar-item">
              <div className="bar-group">
                <div 
                  className={`bar-fill ${d.status}`} 
                  style={{ height: `${(d.value / maxVal) * 100}%` }}
                >
                  <span className="bar-value">{d.value}%</span>
                </div>
              </div>
              <span className="bar-label">{d.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function PatientDashboard() {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john@aura-med.com',
    phone: '+91 98765 43210',
    age: '28',
    gender: 'Male',
    address: 'Indiranagar, Bengaluru, KA'
  });

  useEffect(() => {
    const savedProfile = localStorage.getItem('patientProfile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  const [medicines, setMedicines] = useState([
    { id: 1, name: 'Vitamin D3', time: '8:00 AM', instruction: 'After Breakfast', taken: true },
    { id: 2, name: 'Amoxicillin', time: '2:00 PM', instruction: 'After Lunch', taken: false, urgent: true },
    { id: 3, name: 'Omega 3', time: '8:00 PM', instruction: 'After Dinner', taken: false }
  ]);

  const toggleMedicineComplete = (id) => {
    setMedicines(prev => prev.map(med => 
      med.id === id ? { ...med, taken: !med.taken } : med
    ));
  };

  const handleEditMedicine = (id) => {
    const med = medicines.find(m => m.id === id);
    const newName = prompt('Enter medicine name:', med.name);
    const newDetails = prompt('Enter time and instruction (e.g., 8:00 AM • After Breakfast):', `${med.time} • ${med.instruction}`);
    
    if (newName && newDetails) {
      const [time, ...instructionParts] = newDetails.split(' • ');
      setMedicines(prev => prev.map(m => 
        m.id === id ? { ...m, name: newName, time: time || m.time, instruction: instructionParts.join(' • ') || m.instruction } : m
      ));
    }
  };

  const steps = 6430;
  const goal = 10000;
  const progress = (steps / goal) * 100;

  return (
    <div className="page-container animate-fade-in">
      <header className="page-header" style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', background: 'linear-gradient(90deg, var(--text-main), var(--primary-color))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent' }}>Patient Dashboard</h1>
        <p className="text-muted">Welcome back, {profile.name.split(' ')[0]}. Here is your health overview for today.</p>
      </header>
      
      <div className="dashboard-grid">
        <Card title="Personal Profile" icon={User} className="profile-card">
           <div className="profile-content">
             <div className="profile-main">
               <div className="profile-avatar has-image">
                 {profile.profileImage ? (
                   <img src={profile.profileImage} alt={profile.name} className="uploaded-image" />
                 ) : (
                   <Heart size={24} color="var(--primary-color)" fill="var(--primary-color)" fillOpacity={0.2} />
                 )}
               </div>
               <div className="profile-info">
                 <h3>{profile.name}</h3>
                 <p className="text-muted">Aura ID: AM-{profile.name.substring(0,2).toUpperCase()}{profile.age}</p>
               </div>
             </div>
             
             <div className="profile-details">
               <div className="detail-item">
                 <Mail size={16} color="var(--primary-color)" />
                 <span>{profile.email}</span>
               </div>
               <div className="detail-item">
                 <Phone size={16} color="var(--primary-color)" />
                 <span>{profile.phone}</span>
               </div>
               <div className="detail-item">
                 <Calendar size={16} color="var(--primary-color)" />
                 <span>{profile.age} Years • {profile.gender}</span>
               </div>
               <div className="detail-item">
                 <MapPin size={16} color="var(--primary-color)" />
                 <span>{profile.address}</span>
               </div>
             </div>
             <button className="btn btn-glass w-100 mt-4" style={{ fontSize: '0.85rem' }}>Edit Profile</button>
           </div>
        </Card>

        <Card title="Step Tracker" icon={Activity} className="step-card">
          <div className="circular-progress-container">
            <svg className="circular-progress" viewBox="0 0 100 100">
              <circle className="bg" cx="50" cy="50" r="45" />
              <circle className="progress" cx="50" cy="50" r="45" style={{ strokeDashoffset: 283 - (283 * progress) / 100 }} />
            </svg>
            <div className="progress-text">
              <h2>{steps.toLocaleString()}</h2>
              <p>of {goal.toLocaleString()}</p>
            </div>
          </div>
          <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-muted)' }}>Keep going! You are {Math.round(progress)}% to your goal.</p>
        </Card>

        <Card title="Health Improvement" icon={Target} className="improvement-card">
          <HealthImprovementChart />
        </Card>

        <Card title="Medicine Intake" icon={Pill} className="medicine-card">
          <ul className="medicine-list">
            {medicines.map(med => (
              <li key={med.id} className={`medicine-item ${med.taken ? 'taken' : 'pending'} ${med.urgent && !med.taken ? 'urgent' : ''}`}>
                <div className="med-info">
                  <strong>{med.name}</strong>
                  <span>{med.time} • {med.instruction}</span>
                </div>
                <div className="med-actions">
                  <button className="edit-action" onClick={() => handleEditMedicine(med.id)} title="Edit Medicine">
                    <Pencil size={14} />
                  </button>
                  <button 
                    className={`complete-toggle ${med.taken ? 'completed' : ''}`} 
                    onClick={() => toggleMedicineComplete(med.id)}
                    title={med.taken ? "Mark as Pending" : "Mark as Completed"}
                  >
                    {med.taken ? <CheckCircle2 size={24} color="var(--success)" /> : <Circle size={24} color="var(--text-muted)" />}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Health Goals" icon={Target} className="goals-card">
           <div className="goal-item">
             <div className="goal-header">
               <span>Water Intake</span>
               <span>1.5 / 2.5 L</span>
             </div>
             <div className="progress-bar">
               <div className="fill" style={{ width: '60%', background: 'var(--secondary-color)', boxShadow: '0 0 10px var(--secondary-color)' }}></div>
             </div>
           </div>
           
           <div className="goal-item">
             <div className="goal-header">
               <span>Sleep</span>
               <span>6h 30m / 8h</span>
             </div>
             <div className="progress-bar">
               <div className="fill" style={{ width: '80%', background: 'var(--primary-color)', boxShadow: '0 0 10px var(--primary-color)' }}></div>
             </div>
           </div>
           
           <div className="goal-item mb-0">
             <div className="goal-header">
               <span>Calories Burned</span>
               <span>450 / 600 kcal</span>
             </div>
             <div className="progress-bar">
               <div className="fill" style={{ width: '75%', background: 'var(--danger)', boxShadow: '0 0 10px var(--danger)' }}></div>
             </div>
           </div>
        </Card>

        {profile.documents && profile.documents.length > 0 && (
          <Card title="Medical Records" icon={FileText} className="docs-card">
            <div className="docs-list">
              {profile.documents.map((doc, i) => (
                <div key={i} className="doc-item" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'var(--panel-bg)', borderRadius: '0.75rem', marginBottom: '1rem' }}>
                  <FileText size={20} color="var(--primary-color)" />
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, fontWeight: 500 }}>{doc.name}</p>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Uploaded on {new Date(doc.uploadDate).toLocaleDateString()}</p>
                  </div>
                  <a href={doc.data} download={doc.name} className="btn btn-glass" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>View</a>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
