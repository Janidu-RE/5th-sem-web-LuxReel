import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [movies, setMovies] = useState([]);
  const [selectedDelete, setSelectedDelete] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8080/api/movies",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMovies(response.data);
      setError("");
    } catch (err) {
      console.error("Failed to fetch movies:", err);
      setError("Failed to load movies. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleDelete = async () => {
    if (!selectedDelete) {
      setError("Please select a movie to delete");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      console.log(selectedDelete);
      await axios.delete(`http://localhost:8080/api/movies/id/${selectedDelete}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setError("");
      alert("Movie deleted successfully!");
      fetchMovies();
      setSelectedDelete("");
    } catch (err) {
      console.error("Failed to delete movie:", err);
      setError("Failed to delete movie. Please try again.");
    }
  };

const getMovieId = (movie) => {
  console.log('movie.id:', movie?.id, 'movie._id:', movie?._id);
  return movie?._id ? movie._id.toString() : '';
};


  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>Movie Admin Dashboard</h1>
        <button 
          className="btn btn-primary"
          onClick={() => navigate("/addmovie")}
        >
          + Add New Movie
        </button>
      </header>

      <div className="admin-content">
        {error && <div className="error-message">{error}</div>}
        
        <section className="movie-list-section">
          <h2>Movie Library ({movies.length} movies)</h2>
          
          {loading ? (
            <div className="loading">Loading movies...</div>
          ) : movies.length === 0 ? (
            <div className="no-movies">No movies found in the database.</div>
          ) : (
            <div className="admin-movies-grid">
              {movies.map((movie) => {
                const id = getMovieId(movie);
                return (
                  <div key={id} className="admin-movie-card">
                    <div className="admin-movie-poster">
                      {movie.poster ? (
                        <img src={movie.poster} alt={movie.title} />
                      ) : (
                        <div className="admin-poster-placeholder">
                          <span>No Image</span>
                        </div>
                      )}
                    </div>
                    <div className="admin-movie-info">
                      <h3 className="admin-movie-title">{movie.title}</h3>
                      <p className="admin-movie-category">{movie.category}</p>
                      <div className="admin-movie-details">
                        <span className="admin-rating">⭐ {movie.rating || "N/A"}</span>
                        <span className="admin-year">{movie.releaseDate || "Unknown year"}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        <section className="delete-section">
          <h2>Delete a Movie</h2>
          <div className="delete-controls">
            <select
              value={selectedDelete}
              onChange={(e) => setSelectedDelete(e.target.value)}
              className="movie-select"
            >
              <option value="">Select a movie to delete</option>
              {movies.map((movie) => {
                const id = movie.title;
                return (
                  <option key={id} value={id}>
                    {movie.title} ({movie.releaseDate || "Unknown year"})
                  </option>
                );
              })}
            </select>
            <button 
              className="btn btn-danger"
              onClick={handleDelete}
              disabled={!selectedDelete}
            >
              Delete Movie
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;