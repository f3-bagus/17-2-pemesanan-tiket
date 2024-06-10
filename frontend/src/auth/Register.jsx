import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/loginregister.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Register = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    phonenumber: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/login');
  };

  return (
    <div className="login-register background-overlay">
      <div className="login-register container">
        <h1>REGISTER</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="login-register form-label">Username</label>
            <div className="login-register input-group">
              <span className="login-register input-group-text"><i className="fas fa-user"></i></span>
              <input type="text" name="username" className="login-register form-control" value={form.username} onChange={handleChange} placeholder='Username' required />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="login-register form-label">Email</label>
            <div className="login-register input-group">
              <span className="login-register input-group-text"><i className="fas fa-envelope"></i></span>
              <input type="email" name="email" className="login-register form-control" value={form.email} onChange={handleChange} placeholder='Email' required />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="login-register form-label">Password</label>
            <div className="login-register input-group">
              <span className="login-register input-group-text"><i className="fas fa-lock"></i></span>
              <input type="password" name="password" className="login-register form-control" value={form.password} onChange={handleChange} placeholder='Password' required />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="phonenumber" className="login-register form-label">Phone Number</label>
            <div className="login-register input-group">
              <span className="login-register input-group-text"><i className="fas fa-phone"></i></span>
              <input type="text" name="phonenumber" className="login-register form-control" value={form.phonenumber} onChange={handleChange} placeholder='Phone Number' required />
            </div>
          </div>
          <button type="submit" className="login-register btn-primary">Register</button>
        </form>
        <p>Already have an account? <Link to="/login" className="login-register link-primary">Login here</Link></p>
      </div>
    </div>
  );
};

export default Register;