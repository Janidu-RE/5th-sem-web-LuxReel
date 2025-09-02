import React from "react";
import "./MovieDetails.css";
import { useLocation } from "react-router-dom";

const MovieDetails = () => {
  const location = useLocation();
    const { movie } = location.state;
    console.log(movie);
  const embedUrl = movie.trailerLink.replace("watch?v=", "embed/");

  

  return (
    <div className="trailer-app">
      <div className="trailer-wrapper">
        <div className="trailer-container">
          <iframe
            className="trailer-video"
            src={`${embedUrl}?autoplay=1&mute=1&rel=0`}
            title={movie.title || "Movie Trailer"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <div className="trailer-details">
          <div className="poster-container">
            <img
              src={movie.poster}
              alt={movie.title}
              className="movie-poster"
            />
          </div>
          
          <div className="movie-info">
            <h2>{movie.title}</h2>
            <div className="info-grid">
              <div className="info-item">
                <strong>Language</strong>
                <span>{movie.language}</span>
              </div>
              <div className="info-item">
                <strong>Genre</strong>
                <span>{movie.genres.join(', ')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    
      <div className="trailer-description">
        <h3>Synopsis</h3>
        <p>{movie.description}</p>
      </div>
      <div className="book-ticket-container">
        <button className="book-btn">Book Tickets</button>
      </div>
    </div>
  );
};

export default MovieDetails;