import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../MovieCard/MovieCard";
import "./CardGrid.css";

const CardGrid = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/movies");
        setMovies(res.data);
      } catch (err) {
        console.error("Error fetching movies:", err);
      }
    };
    fetchMovies();
  }, []);

  const handleBook = (movie) => {
    alert(`Booking started for: ${movie.title}`);
  };

  return (
    <div className="card-grid-inline">
      {movies.map((movie) => (
        <div key={movie.id} className="card-wrapper">
          <MovieCard movie={movie} onBook={handleBook} />
        </div>
      ))}
    </div>
  );
};

export default CardGrid;
