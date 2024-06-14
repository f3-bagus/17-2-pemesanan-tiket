import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { dispatch } = useContext(UserContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Melakukan POST ke endpoint login
      const response = await axios.post("http://localhost:3000/api/auth/login", form);

      // Mendapatkan token dari response
      const token = response.data.token;

      // Menyimpan token di sessionStorage
      sessionStorage.setItem("token", token);

      // Melakukan GET ke /api/profile dengan header Authorization
      const profileResponse = await axios.get("http://localhost:3000/api/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Mendapatkan data username dari response
      const { username } = profileResponse.data;

      // Menyimpan user data di context
      dispatch({
        type: "LOGIN",
        payload: { email: form.email, username: username },
      });

      // Cek username untuk menentukan navigasi
      if (username === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      // Tangani error yang terjadi
      if (error.response) {
        setError(error.response.data.message || "Login failed! Please try again.");
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
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <div className="input-group">
              <span className="input-group-text"><i className="fas fa-envelope"></i></span>
              <input
                type="email"
                name="email"
                className="form-control"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter Email"
                required
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
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                required
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
        <p>Don't have an account? <Link to="/register" className="link-primary">Register here</Link></p>
      </div>
    </div>
  );
};

export default Login;