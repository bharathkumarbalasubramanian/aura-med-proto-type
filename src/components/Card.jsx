export default function Card({ title, children, icon: Icon, className = "" }) {
  return (
    <div className={`glass-panel interactive ${className}`}>
      {title && (
        <div className="card-header" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {Icon && <Icon color="var(--primary-color)" size={22} />}
          <h3 style={{ fontSize: '1.1rem', color: 'var(--text-main)', margin: 0, fontWeight: 600 }}>{title}</h3>
        </div>
      )}
      <div className="card-body">
        {children}
      </div>
    </div>
  );
}
