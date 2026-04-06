import { Clock, User, ChevronRight } from 'lucide-react';

const mockAppointments = [
  { time: "09:00 AM", patient: "John Doe", purpose: "Routine Cardiovascular Check-up", status: "completed" },
  { time: "10:30 AM", patient: "Maya Patel", purpose: "Follow-up: Hypertension Medication", status: "in-progress" },
  { time: "01:00 PM", patient: "Ravi Singh", purpose: "Consultation: Chest Pain Analysis", status: "upcoming" },
  { time: "02:45 PM", patient: "Elena Gilbert", purpose: "New Patient: Initial Assessment", status: "upcoming" },
  { time: "04:15 PM", patient: "Damon Salvatore", purpose: "Diagnostic Test Results Review", status: "upcoming" },
];

export default function ScheduleView() {
  return (
    <div className="view-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem' }}>Today's Schedule</h2>
        <div style={{ padding: '0.5rem 1rem', background: 'rgba(0, 223, 216, 0.1)', color: 'var(--primary-color)', borderRadius: '12px', fontWeight: '500' }}>
          {mockAppointments.length} Appointments Remaining
        </div>
      </div>
      
      <div className="timeline">
        {mockAppointments.map((app, index) => (
          <div key={index} className="timeline-item">
            <div className="timeline-dot" style={{ 
              borderColor: app.status === 'completed' ? 'var(--success)' : 
                         app.status === 'in-progress' ? 'var(--primary-color)' : 'var(--panel-border)' 
            }}></div>
            <div className="timeline-content interactive">
              <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                <div style={{ minWidth: '80px', fontWeight: '600', color: 'var(--text-main)' }}>{app.time}</div>
                <div style={{ height: '30px', width: '1px', background: 'var(--panel-border)' }}></div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                    <User size={16} color="var(--primary-color)" />
                    <span style={{ fontWeight: '600', color: 'var(--text-main)' }}>{app.patient}</span>
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{app.purpose}</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ 
                  fontSize: '0.8rem', 
                  padding: '0.3rem 0.8rem', 
                  borderRadius: '20px', 
                  textTransform: 'capitalize',
                  background: app.status === 'completed' ? 'rgba(16, 185, 129, 0.1)' : 
                             app.status === 'in-progress' ? 'rgba(0, 223, 216, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                  color: app.status === 'completed' ? 'var(--success)' : 
                         app.status === 'in-progress' ? 'var(--primary-color)' : 'var(--text-muted)'
                }}>
                  {app.status}
                </span>
                <ChevronRight size={18} color="var(--text-muted)" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
