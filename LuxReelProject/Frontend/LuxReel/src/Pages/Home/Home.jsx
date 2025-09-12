import CardGrid from '@/components/CardGrid/CardGrid'
import Footer from '@/components/Footer/Footer'
import Navbar from '@/components/Navbar/Navbar'
import MovieCard from "@/components/MovieCard/MovieCard"
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom' 
import "./Home.css"
import axios from 'axios'

const Home = () => {
  const moviesRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const scrollToMovies = () => {
    if (moviesRef.current) {
      moviesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:8080/api/movies/search?title=${query}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  return (
    <div>
      <Navbar searchValue={searchQuery} onSearch={handleSearch} />
      
      {searchQuery ? (
        <section className="search-results-section">
          <h1 className="home-title">Search Results for "{searchQuery}"</h1>
          <div className="card-grid-inline">
            {searchResults.map((movie) => (
              <div key={movie.id} className="card-wrapper">
                <MovieCard movie={movie} onBook={(movie) => {
                  navigate("/movieDetails", { state: { movie } });
                }} />
              </div>
            ))}
          </div>
        </section>
      ) : (
        <section className="movie-banner">
          <div className="banner-overlay">
            <div className="banner-content">
              <h1 className="banner-title">Welcome to LuxReel</h1>
              <p className="banner-subtitle">
                Watch trailers, book tickets, and explore upcoming releases
              </p>
              <button className="banner-button" onClick={scrollToMovies}>
                Get Started
              </button>
            </div>
          </div>
        </section>
      )}

      <section className="home-section" ref={moviesRef}>
        <h1 className="home-title">Now Showing</h1>
        <CardGrid status="now_showing" />
      </section>

      <section className="home-section">
        <h1 className="home-title">Coming Soon</h1>
        <CardGrid status="coming_soon" />
      </section>

      <Footer/>
    </div>
  )
}

export default Home