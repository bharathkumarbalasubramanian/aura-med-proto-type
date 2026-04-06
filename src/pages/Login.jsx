import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Calendar, MapPin, Heart, ChevronRight, Camera, Lock, FileText } from 'lucide-react';
import './Login.css';

export default function Login() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const docInputRef = useRef(null);
  
  const [isLogin, setIsLogin] = useState(true);
  const [profileImage, setProfileImage] = useState(null);
  const [document, setDocument] = useState(null);
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '',
    phone: '', 
    age: '', 
    gender: 'Other', 
    address: '' 
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'image') setProfileImage(reader.result);
        if (type === 'doc') setDocument({ name: file.name, data: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    const payload = isLogin 
      ? { email: formData.email, password: formData.password }
      : { ...formData, profileImage, documents: document ? [document] : [] };

    try {
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      if (isLogin) {
        localStorage.setItem('patientProfile', JSON.stringify(data));
        navigate('/dashboard');
      } else {
        setSubmitted(true);
        setTimeout(() => setIsLogin(true), 2000);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card glassmorphism animate-fade-in">
        <div className="login-header">
           {!isLogin && (
             <div className="profile-upload-wrapper">
               <div className={`icon-circle profile-preview ${profileImage ? 'has-image' : ''}`} onClick={() => fileInputRef.current.click()}>
                 {profileImage ? (
                   <img src={profileImage} alt="Profile Preview" className="uploaded-image" />
                 ) : (
                   <Heart size={32} color="var(--primary-color)" fill="var(--primary-color)" fillOpacity={0.2} />
                 )}
                 <div className="upload-badge">
                   <Camera size={14} color="#000" />
                 </div>
               </div>
               <input 
                 type="file" 
                 ref={fileInputRef} 
                 onChange={(e) => handleFileChange(e, 'image')} 
                 accept="image/*" 
                 style={{ display: 'none' }} 
               />
             </div>
           )}
           <h2 className="title">{isLogin ? 'Welcome Back' : 'Create Your Account'}</h2>
           <p className="subtitle">
             {isLogin ? 'Log in to access your Aura Med dashboard' : 'Start your personalized health journey with Aura Med'}
           </p>
        </div>

        {submitted ? (
          <div className="success-state">
            <div className="success-icon">✅</div>
            <p className="success-msg">Account created successfully!</p>
            <p className="text-muted">Please log in to continue.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="login-form">
            {error && <div className="error-msg" style={{ color: 'var(--danger)', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
            
            <div className="form-grid">
              {!isLogin && (
                <div className="input-group full-width">
                  <label><User size={16} /> Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="John Doe" />
                </div>
              )}

              <div className="input-group">
                <label><Mail size={16} /> Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="john@example.com" />
              </div>

              <div className="input-group">
                <label><Lock size={16} /> Password</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} required placeholder="••••••••" />
              </div>

              {!isLogin && (
                <>
                  <div className="input-group">
                    <label><Phone size={16} /> Phone</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="+91 98765 43210" />
                  </div>

                  <div className="input-group">
                    <label><Calendar size={16} /> Age</label>
                    <input type="number" name="age" value={formData.age} onChange={handleChange} required placeholder="25" />
                  </div>

                  <div className="input-group full-width">
                    <label>Gender</label>
                    <div className="radio-group">
                      {['Male', 'Female', 'Other'].map(option => (
                        <label key={option} className="radio-label">
                          <input type="radio" name="gender" value={option} checked={formData.gender === option} onChange={handleChange} />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="input-group full-width">
                    <label><MapPin size={16} /> Address</label>
                    <textarea name="address" value={formData.address} onChange={handleChange} required placeholder="123 Health St, Wellness City" rows="2" />
                  </div>

                  <div className="input-group full-width">
                    <label><FileText size={16} /> Medical Documents (Optional)</label>
                    <div className="file-upload-box" onClick={() => docInputRef.current.click()} style={{ cursor: 'pointer', padding: '1rem', border: '1px dashed var(--panel-border)', borderRadius: '0.75rem', textAlign: 'center' }}>
                       {document ? (
                         <span style={{ color: 'var(--primary-color)' }}>{document.name} uploaded</span>
                       ) : (
                         <span className="text-muted">Click to upload health records (PDF, Image)</span>
                       )}
                    </div>
                    <input type="file" ref={docInputRef} onChange={(e) => handleFileChange(e, 'doc')} style={{ display: 'none' }} />
                  </div>
                </>
              )}
            </div>

            <button type="submit" className="submit-btn mt-4">
              {isLogin ? 'Log In' : 'Create Account'} <ChevronRight size={18} />
            </button>

            <p className="toggle-auth" onClick={() => setIsLogin(!isLogin)} style={{ textAlign: 'center', marginTop: '1.5rem', cursor: 'pointer', color: 'var(--primary-color)' }}>
              {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
            </p>
          </form>
        )}
      </div>
    </div>
  );
}


