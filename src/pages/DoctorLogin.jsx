import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stethoscope, Clock, MapPin, Briefcase, UserCircle, Calendar, Mail, Phone, ChevronRight, Camera } from 'lucide-react';
import './DoctorLogin.css';

export default function DoctorLogin() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [profileImage, setProfileImage] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    specialization: '',
    experience: '',
    age: '',
    gender: 'Other',
    workExperience: '',
    currentHospitals: '',
    workingHours: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Doctor Registration Data:', { ...formData, profileImage });
    // Save to localStorage for demo
    localStorage.setItem('doctorProfile', JSON.stringify({ ...formData, profileImage }));
    navigate('/provider');
  };

  return (
    <div className="doctor-login-page">
      <div className="glass-card doctor-login-card">
        <div className="form-header">
          <div className="profile-upload-wrapper">
            <div className={`icon-circle profile-preview ${profileImage ? 'has-image' : ''}`} onClick={handleImageClick}>
              {profileImage ? (
                <img src={profileImage} alt="Profile Preview" className="uploaded-image" />
              ) : (
                <Stethoscope size={32} color="var(--primary-color)" />
              )}
              <div className="upload-badge">
                <Camera size={14} color="#000" />
              </div>
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImageChange} 
              accept="image/*" 
              style={{ display: 'none' }} 
            />
          </div>
          <h1>Doctor Registration</h1>
          <p>Join the Aura Med provider network</p>
        </div>

        <form onSubmit={handleSubmit} className="doctor-form">
          <div className="form-grid">
            <div className="input-group">
              <label><UserCircle size={18} /> Full Name</label>
              <input 
                type="text" 
                name="fullName" 
                placeholder="Dr. Shreyas P" 
                value={formData.fullName} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="input-group">
              <label><Mail size={18} /> Email Address</label>
              <input 
                type="email" 
                name="email" 
                placeholder="shreyas@auramed.com" 
                value={formData.email} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="input-group">
              <label><Phone size={18} /> Phone Number</label>
              <input 
                type="tel" 
                name="phone" 
                placeholder="+91 98765 43210" 
                value={formData.phone} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="input-group">
              <label><Stethoscope size={18} /> Specialization / Major</label>
              <input 
                type="text" 
                name="specialization" 
                placeholder="Cardiology" 
                value={formData.specialization} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="input-group">
              <label><Calendar size={18} /> Age</label>
              <input 
                type="number" 
                name="age" 
                placeholder="35" 
                value={formData.age} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="input-group">
              <label><Briefcase size={18} /> Years of Experience</label>
              <input 
                type="number" 
                name="experience" 
                placeholder="10" 
                value={formData.experience} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="input-group full-width">
              <label>Gender</label>
              <div className="radio-group">
                {['Male', 'Female', 'Other'].map(option => (
                  <label key={option} className="radio-label">
                    <input 
                      type="radio" 
                      name="gender" 
                      value={option} 
                      checked={formData.gender === option} 
                      onChange={handleChange} 
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="input-group full-width">
              <label><MapPin size={18} /> Current Hospitals / Clinics</label>
              <input 
                type="text" 
                name="currentHospitals" 
                placeholder="Aura Medical Center, Apollo Hospital" 
                value={formData.currentHospitals} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="input-group full-width">
              <label><Clock size={18} /> Working Hours</label>
              <input 
                type="text" 
                name="workingHours" 
                placeholder="Mon-Fri, 9:00 AM - 5:00 PM" 
                value={formData.workingHours} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="input-group full-width">
              <label><Briefcase size={18} /> Work Experience (Brief History)</label>
              <textarea 
                name="workExperience" 
                placeholder="Briefly describe your medical career and previous roles..." 
                value={formData.workExperience} 
                onChange={handleChange} 
                rows="4"
              />
            </div>
          </div>

          <button type="submit" className="submit-btn">
            Complete Registration <ChevronRight size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}

