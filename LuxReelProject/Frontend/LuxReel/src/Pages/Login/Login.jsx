import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import "./Login.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
    const login = async () => {
      try {
        const res = await axios.post(`http://localhost:9090/api/auth/login`,
          {
            usernameOrEmail : username,
            password : password
          }
        )
        localStorage.setItem("token", res.data.token);
        if (res.data.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/");
      }
      } 
      catch (err) {
        console.log(err);
        if(err.response && err.response.data){
          setError(err.response.data||"Login Failed")
        }else{
          setError("Login Failed, try again later..")
        }
      }
    };
    if(username && password){
      login();
    }
    
  };

  return (
    <div className="login-container">
      <Navbar />

      <div className="login-content">
        <form className="login-form" onSubmit={handleSubmit}>
          <h1 className="login-title">Welcome Back,</h1>

          {error && <div className="error-message">{error}</div>}

          <div className="input-group">
            <label htmlFor="email">Email or Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your email or username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-button" id="loginButton">
            Login
          </button>

          <div className="signup-link">
            <span>Don’t have an account?</span>{" "}
            <Link to="/signup">Sign Up</Link>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
