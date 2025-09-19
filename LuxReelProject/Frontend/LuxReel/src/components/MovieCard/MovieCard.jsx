import React from "react";
import "./MovieCard.css";

function MovieCard({ movie, onBook }) {
  if (!movie) return null;

  const genres = Array.isArray(movie.genres) ? movie.genres.join(", ") : "No genres";

  return (
    <div className="movie-card">
      <img src={movie.poster} alt={movie.title} className="movie-poster" />
      <div className="overlay">
        <div className="movie-details">
          <h3>{movie.title}</h3>
          <p>{genres}</p>
        </div>
        <button className="card-book-btn" onClick={() => onBook(movie)}>
          More Info
        </button>
      </div>
    </div>
  );
}


export default MovieCard;
