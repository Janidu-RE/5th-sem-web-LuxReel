import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Navbar.css";

const Navbar = () => {

const [search, setSearch] = useState("");
const [movies, setMovies] = useState([]);


useEffect(() =>{
  if(search.trim()==="") return;
  
  const fetchMovies = async() => {
    try{
      const response = await axios.get(`http://localhost:8080/api/movies/search?title=${search}`);;
      setMovies(response.data);
      console.log(response.data); 
    }
    catch(error){
      console.error("Error fetching movies:", error);
    }
  }
  fetchMovies();
},[search]);


  return (
    <nav className="navbar">
      <div className="navbar-logo">
        Lux<span>Reel</span>
      </div>

      <div className="navbar-search">
        <input type="text" placeholder="Search Movies..."  onChange={(e) => setSearch(e.target.value)}/>
        <button className="search-btn">🔍</button>
      </div>

      <ul className="navbar-links">
        <li><a href="#">Home</a></li>
        <li><a href="#">Locations</a></li>
        <li><a href="#">Promotions</a></li>
      </ul>

      <button className="login-btn">LOGIN/SIGNUP</button>
    </nav>
  );
};

export default Navbar;
