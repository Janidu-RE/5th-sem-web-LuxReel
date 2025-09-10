import React, { useState } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import "./SignUp.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    const signup = async () => {
      try {
        const res = await axios.post(`http://localhost:8080/api/auth/signup`, {
          username: formData.username,
          email: formData.email,
          password: formData.password
        });
        alert("Account created succesfully....")
        navigate("/");
      } catch (err) {
        console.log(err);
        if (err.response && err.response.data) {
          setError(err.response.data || "Signup failed");
        } else {
          setError("Signup failed. Please try again.");
        }
      }
    };

    signup();
  };

  return (
    <div className="signup-container">
      <Navbar />

      <div className="signup-content">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h1 className="signup-title">Create Account</h1>

          {error && <div className="error-message">{error}</div>}

          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="signup-button">
            Sign Up
          </button>

          <div className="login-link">
            <span>Already have an account?</span>{" "}
            <Link to="/login">Login</Link>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default SignUp;