import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios untuk request HTTP
import "@fortawesome/fontawesome-free/css/all.min.css";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    noHp: "", // Ganti nama field menjadi noHp
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error state
    setSuccess(""); // Reset success state
    try {
      // Lakukan request POST ke endpoint register
      const response = await axios.post("http://localhost:3000/api/register", form);

      // Tampilkan pesan sukses
      setSuccess("Registration successful! Redirecting to login...");

      // Setelah berhasil, arahkan pengguna ke halaman login
      setTimeout(() => {
        navigate("/login");
      }, 2000); // Redirect setelah 2 detik
    } catch (error) {
      // Tangani error yang terjadi
      if (error.response) {
        setError(
          error.response.data.message || "Registration failed! Please try again."
        );
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="login-register">
      <div className="background-overlay"></div>
      <div className="container">
        <h1>REGISTER</h1>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="fas fa-user"></i>
              </span>
              <input
                type="text"
                name="username"
                className="form-control"
                value={form.username}
                onChange={handleChange}
                placeholder="Username"
                required
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="fas fa-envelope"></i>
              </span>
              <input
                type="email"
                name="email"
                className="form-control"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                required
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="fas fa-lock"></i>
              </span>
              <input
                type="password"
                name="password"
                className="form-control"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                required
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="noHp" className="form-label">
              Phone Number
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="fas fa-phone"></i>
              </span>
              <input
                type="text"
                name="noHp"
                className="form-control"
                value={form.noHp}
                onChange={handleChange}
                placeholder="Phone Number"
                required
              />
            </div>
          </div>
          <button type="submit" className="btn-primary">
            Register
          </button>
        </form>
        <p>
          Already have an account?{" "}
          <Link to="/login" className="link-primary">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
