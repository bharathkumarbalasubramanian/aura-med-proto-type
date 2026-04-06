import { useState } from 'react';
import { User, Activity, AlertCircle, Clock, ChevronDown, ChevronRight, FileText, ArrowLeft } from 'lucide-react';

const mockPatients = [
  {
    id: 1,
    name: "John Doe",
    age: 28,
    bloodType: "A+",
    gender: "Male",
    lastVisit: "2026-03-10",
    conditions: ["Hypertension", "Early stage Type 2 Diabetes"],
    symptoms: ["Frequent Headaches", "Dizziness", "Increased Thirst"],
    history: ["Appendectomy (2018)", "Family history of heart disease", "Allergic to Penicillin"],
  },
  {
    id: 2,
    name: "Maya Patel",
    age: 34,
    bloodType: "O-",
    gender: "Female",
    lastVisit: "2026-02-25",
    conditions: ["Asthma", "Seasonal Allergies"],
    symptoms: ["Shortness of breath", "Chest Tightness", "Wheezing"],
    history: ["Fractured wrist (2020)", "Mild Scoliosis diagnosed at 14"],
  },
  {
    id: 3,
    name: "Ravi Singh",
    age: 52,
    bloodType: "B+",
    gender: "Male",
    lastVisit: "2026-03-15",
    conditions: ["Chronic Back Pain", "High Cholesterol"],
    symptoms: ["Lower back stiffness", "Leg numbness"],
    history: ["L5-S1 Disc Herniation (2022)", "Former Smoker"],
  },
];

export default function PatientsView() {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [activeTab, setActiveTab] = useState('conditions');
  const [openAccordion, setOpenAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  if (selectedPatient) {
    return (
      <div className="view-container">
        <button 
          onClick={() => setSelectedPatient(null)}
          style={{ 
            display: 'flex', alignItems: 'center', gap: '0.5rem', 
            background: 'none', border: 'none', color: 'var(--primary-color)', 
            cursor: 'pointer', marginBottom: '1.5rem', fontWeight: '500' 
          }}
        >
          <ArrowLeft size={18} /> Back to Patient List
        </button>

        <div className="glass-panel" style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '15px', background: 'rgba(0, 223, 216, 0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <User size={30} color="var(--primary-color)" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.8rem', color: 'var(--text-main)' }}>{selectedPatient.name}</h3>
              <p style={{ color: 'var(--text-muted)' }}>{selectedPatient.age} years • {selectedPatient.gender} • {selectedPatient.bloodType}</p>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Last Visit</p>
            <p style={{ fontWeight: '500', color: 'var(--text-main)' }}>{selectedPatient.lastVisit}</p>
          </div>
        </div>

        <div className="tabs-header">
          <button className={`tab-btn ${activeTab === 'conditions' ? 'active' : ''}`} onClick={() => setActiveTab('conditions')}>Conditions</button>
          <button className={`tab-btn ${activeTab === 'symptoms' ? 'active' : ''}`} onClick={() => setActiveTab('symptoms')}>Active Symptoms</button>
          <button className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`} onClick={() => setActiveTab('history')}>Medical History</button>
        </div>

        <div className="tab-content">
          {activeTab === 'conditions' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {selectedPatient.conditions.map((item, index) => (
                <div key={index} className="glass-panel" style={{ padding: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', cursor: 'pointer' }} onClick={() => toggleAccordion(index)}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <Activity size={18} color="var(--primary-color)" />
                      <span style={{ fontWeight: '500' }}>{item}</span>
                    </div>
                    <ChevronDown size={18} color="var(--text-muted)" style={{ transform: openAccordion === index ? 'rotate(180deg)' : 'none', transition: '0.3s' }} />
                  </div>
                  {openAccordion === index && (
                    <div style={{ marginTop: '1rem', padding: '1rem', borderTop: '1px solid var(--panel-border)', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                      Clinical notes for {item} indicate stable progression with supervised treatment.
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'symptoms' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {selectedPatient.symptoms.map((item, index) => (
                <div key={index} className="glass-panel" style={{ padding: '1.2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <AlertCircle size={20} color="var(--warning)" />
                  <span style={{ fontWeight: '500' }}>{item}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'history' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {selectedPatient.history.map((item, index) => (
                <div key={index} className="glass-panel" style={{ padding: '1.2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <FileText size={20} color="var(--secondary-color)" />
                  <span style={{ fontWeight: '500' }}>{item}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="view-container">
      <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Today's Patients</h2>
      
      <div className="glass-panel" style={{ padding: 0, overflow: 'hidden' }}>
        <table className="patient-table">
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Age</th>
              <th>Last Visit</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {mockPatients.map((p) => (
              <tr key={p.id} className="row-interactive" onClick={() => setSelectedPatient(p)}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(59, 130, 246, 0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <User size={16} color="var(--secondary-color)" />
                    </div>
                    <span style={{ fontWeight: '600' }}>{p.name}</span>
                  </div>
                </td>
                <td style={{ color: 'var(--text-muted)' }}>{p.age} yrs</td>
                <td style={{ color: 'var(--text-muted)' }}>{p.lastVisit}</td>
                <td>
                  <span style={{ padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.8rem', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)' }}>
                    Ready
                  </span>
                </td>
                <td>
                  <ChevronRight size={18} color="var(--text-muted)" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
