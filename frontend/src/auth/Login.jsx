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
   const response = await axios.post(
    "http://localhost:3000/api/auth/login",
    form
   );
   const token = response.data.token;
   sessionStorage.setItem("token", token);
   navigate("/tickets");

   // Fetch user profile details
   const profileResponse = await axios.get(
    "http://localhost:3000/api/profile",
    {
     headers: {
      Authorization: `Bearer ${token}`,
     },
    }
   );

   const { username, isAdmin } = profileResponse.data;

   dispatch({
    type: "LOGIN",
    payload: {
     user: { email: form.email, username: username, isAdmin: isAdmin },
    },
   });

   // Navigate based on isAdmin
   if (isAdmin) {
    navigate("/admin");
   } else {
    navigate("/");
   }
  } catch (error) {
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
    <h1 className="fw-semibold">LOG IN</h1>
    {error && <div className="alert alert-danger">{error}</div>}
    <form onSubmit={handleSubmit}>
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
        placeholder="Enter Email"
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
     <button type="submit" className="btn-primary-login rounded-2 fw-semibold">
      Log in
     </button>
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
