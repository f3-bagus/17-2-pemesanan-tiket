import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import './css/loginregister.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Login = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { dispatch } = useContext(UserContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: 'LOGIN', payload: { email: form.email, username: form.email.split('@')[0] } });
    navigate('/admin/dashboard');
  };

  return (
    <div className="login-register background-overlay">
      <div className="login-register container">
        <h1>LOGIN</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="login-register form-label">Email</label>
            <div className="login-register input-group">
              <span className="login-register input-group-text"><i className="fas fa-envelope"></i></span>
              <input type="email" name="email" className="login-register form-control" value={form.email} onChange={handleChange} placeholder='Enter Username' required />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="login-register form-label">Password</label>
            <div className="login-register input-group">
              <span className="login-register input-group-text"><i className="fas fa-lock"></i></span>
              <input type={showPassword ? "text" : "password"} name="password" className="login-register form-control" value={form.password} onChange={handleChange} placeholder='Enter Password' required />
              <button type="button" className="btn btn-outline-secondary" onClick={() => setShowPassword(!showPassword)}>
                <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
              </button>
            </div>
          </div>
          <button type="submit" className="login-register btn-primary">Login</button>
        </form>
        <p>Don't have an account? <Link to="/register" className="login-register link-primary">Register here</Link></p>
      </div>
    </div>
  );
};

export default Login;