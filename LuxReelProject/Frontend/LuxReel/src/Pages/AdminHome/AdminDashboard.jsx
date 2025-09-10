import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [movies, setMovies] = useState([]);
  const [selectedDelete, setSelectedDelete] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const [selectedEdit, setSelectedEdit] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    category: "",
    rating: "",
    releaseDate: "",
    trailerLink: ""
  });

  const navigate = useNavigate();

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8080/api/movies", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleDelete = async () => {
    if (!selectedDelete) {
      setError("Please select a movie to delete");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:8080/api/movies/id/${selectedDelete}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setError("");
      alert("Movie deleted successfully!");
      fetchMovies();
      setSelectedDelete("");
    } catch (err) {
      console.error("Failed to delete movie:", err);
      setError("Failed to delete movie. Please try again.");
    }
  };

  const handleEditClick = (movie) => {
    setSelectedEdit(movie);
    setEditForm({
      title: movie.title,
      category: movie.category,
      rating: movie.rating,
      releaseDate: movie.releaseDate,
      trailerLink: movie.trailerLink
    });
  };

  const handleUpdate = async () => {
    if (!selectedEdit) return;
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:8080/api/movies/id/${selectedEdit.title}`,
        editForm,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Movie updated successfully!");
      fetchMovies();
      setSelectedEdit(null);
    } catch (err) {
      console.error("Failed to update movie:", err);
      setError("Failed to update movie. Please try again.");
    }
  };

  const getMovieId = (movie) => {
    return movie?._id ? movie._id.toString() : movie.title;
  };

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
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
                        <span className="admin-rating">
                          ⭐ {movie.rating || "N/A"}
                        </span>
                        <span className="admin-year">
                          {movie.releaseDate || "Unknown year"}
                        </span>
                      </div>
                    </div>
                    <button
                      className="btn btn-primary"
                      style={{ width: "100%" }}
                      onClick={() => handleEditClick(movie)}
                    >
                      Edit
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {selectedEdit && (
          <section className="delete-section">
            <h2>Edit Movie: {selectedEdit.title}</h2>
            <div className="delete-controls" style={{ flexDirection: "column" }}>
              <input
                type="text"
                placeholder="Title"
                value={editForm.title}
                onChange={(e) =>
                  setEditForm({ ...editForm, title: e.target.value })
                }
                className="movie-select"
              />
              <input
                type="text"
                placeholder="Category"
                value={editForm.category}
                onChange={(e) =>
                  setEditForm({ ...editForm, category: e.target.value })
                }
                className="movie-select"
              />
              <input
                type="text"
                placeholder="Rating"
                value={editForm.rating}
                onChange={(e) =>
                  setEditForm({ ...editForm, rating: e.target.value })
                }
                className="movie-select"
              />
              <input
                type="text"
                placeholder="Release Date"
                value={editForm.releaseDate}
                onChange={(e) =>
                  setEditForm({ ...editForm, releaseDate: e.target.value })
                }
                className="movie-select"
              />
              <input
                type="text"
                placeholder="Trailer Link"
                value={editForm.trailerLink}
                onChange={(e) =>
                  setEditForm({ ...editForm, trailerLink: e.target.value })
                }
                className="movie-select"
              />
              <div style={{ display: "flex", gap: "10px", width: "100%" }}>
                <button className="btn btn-primary" onClick={handleUpdate}>
                  Save Changes
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => setSelectedEdit(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </section>
        )}

        <section className="delete-section">
          <h2>Delete a Movie</h2>
          <div className="delete-controls">
            <select
              value={selectedDelete}
              onChange={(e) => setSelectedDelete(e.target.value)}
              className="movie-select"
            >
              <option value="">Select a movie to delete</option>
              {movies.map((movie) => (
                <option key={movie.title} value={movie.title}>
                  {movie.title} ({movie.releaseDate || "Unknown year"})
                </option>
              ))}
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

        <div className="logout-section">
          <button className="btn btn-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
