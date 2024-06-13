import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const Auth = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/auth/login", {
        email: email,
        password: password,
      });
      console.log(response);
      const isAdmin = response.data.isAdmin; // Mengakses isAdmin dari respons


      if (isAdmin == true) {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "Login failed. Please try again.");
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="login-register">
      <div className="background-overlay"></div>
      <div className="container">
        <h1>LOGIN</h1>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={Auth}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <div className="input-group">
              <span className="input-group-text"><i className="fas fa-envelope"></i></span>
              <input
                type="email"
                name="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email"
                required
                autoComplete="email"
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <div className="input-group">
              <span className="input-group-text"><i className="fas fa-lock"></i></span>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
              >
                <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
              </button>
            </div>
          </div>
          <button type="submit" className="btn-primary">Login</button>
        </form>
        <p>
          Don't have an account?{" "}
          <Link to="/register" className="link-primary">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
