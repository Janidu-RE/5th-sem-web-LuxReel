import React,{useState,useEffect} from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ searchValue, onSearch }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

 useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

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
          value={searchValue}
          onChange={(e) => onSearch(e.target.value)}
        />
        <button className="search-btn">🔍</button>
      </div>

      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="#">Locations</Link>
        </li>
        <li>
          <Link to="#">Promotions</Link>
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