import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    if (search.trim() === "") return;

    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/movies/search?title=${search}`
        );
        setMovies(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
  }, [search]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        Lux<span>Reel</span>
      </div>

      <div className="navbar-search">
        <input
          type="text"
          placeholder="Search Movies..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="search-btn">🔍</button>
      </div>

      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <a href="#">Locations</a>
        </li>
        <li>
          <a href="#">Promotions</a>
        </li>
      </ul>

      {isLoggedIn ? (
        <button className="login-btn" onClick={handleLogout}>
          SIGN OUT
        </button>
      ) : (
        <Link to="/login">
          <button className="login-btn">LOGIN/SIGNUP</button>
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
