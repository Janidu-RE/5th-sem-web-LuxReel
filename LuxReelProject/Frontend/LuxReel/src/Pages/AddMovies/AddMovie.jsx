import React, { useState } from "react";
import "./AddMovie.css";

const AddMovie = () => {
  const [posterPreview, setPosterPreview] = useState("");
  const [title, setTitle] = useState("");
  const [genres, setGenres] = useState([]);
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [poster, setPoster] = useState("");
  const [language, setLanguage] = useState("");

  const genreOptions = [
    "Action",
    "Adventure",
    "Animation",
    "Comedy",
    "Crime",
    "Documentary",
    "Drama",
    "Fantasy",
    "Historical",
    "Horror",
    "Musical",
    "Mystery",
    "Romance",
    "Sci-Fi",
    "Thriller",
    "War",
    "Western"
  ];

  const handlePosterChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPoster(file);
      setPosterPreview(URL.createObjectURL(file));
    }
  };

    const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "LuxReel-movies");
    formData.append("folder", "LuxReel"); 

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dapypoc2n/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    return data.secure_url;
  };

  const handleGenreSelect = (e) => {
    const selectedGenre = e.target.value;
    if (selectedGenre && !genres.includes(selectedGenre)) {
      setGenres([...genres, selectedGenre]);
    }
    e.target.value = "";
  };

  const handleRemoveGenre = (genre) => {
    setGenres(genres.filter((g) => g !== genre));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let posterUrl = "";
      if (poster) {
        posterUrl = await uploadImageToCloudinary(poster); 
      }

      const response = await fetch("http://localhost:8080/api/movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          genres,
          duration,
          poster: posterUrl,
          rating,
          category,
          language,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMsg("Movie added successfully!");
      } else {
        setError(data.message || "Failed to add movie");
      }
    } catch (err) {
      setError("Server Error");
    }
  };

  return (
    <div className="add-movie-wrapper">
    <div className="add-movie-container">
      <h2>Add New Movie</h2>
      <form className="add-movie-form" onSubmit={handleSubmit}>
        
        <label>Title</label>
        <input
          type="text"
          placeholder="Enter movie title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label>Language</label>
        <input
          type="text"
          placeholder="Enter movie language"
          value={language}
          onChangeCapture={(e) => setLanguage(e.target.value)}
        />

        <label>Genres</label>
        <select onChange={handleGenreSelect}>
          <option value="">-- Select a genre --</option>
          {genreOptions.map((g, index) => (
            <option key={index} value={g}>
              {g}
            </option>
          ))}
        </select>

        <div className="selected-genres">
          {genres.map((g, index) => (
            <span key={index} className="genre-chip">
              {g}
              <button type="button" onClick={() => handleRemoveGenre(g)}>
                ✖
              </button>
            </span>
          ))}
        </div>

        <label>Duration (minutes)</label>
        <input
          type="number"
          placeholder="Enter duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
        />

        <label>Rating</label>
        <input
          type="number"
          min="1"
          max="10"
          step="0.1"
          placeholder="Enter rating (1-10)"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          required
        />

        <label>Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">--Select--</option>
          <option value="now_showing" >Now Showing</option>
          <option value="coming_soon">Coming Soon</option>
        </select>

        <label>Description</label>
        <textarea
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <label>Poster Image</label>
        <input type="file" accept="image/*" onChange={handlePosterChange} />

        {posterPreview && (
          <div className="poster-preview">
            <img src={posterPreview} alt="Poster Preview" />
          </div>
        )}

        <button type="submit" className="submit-btn">
          Add Movie
        </button>

        {error && <p className="error">{error}</p>}
        {successMsg && <p className="success">{successMsg}</p>}
      </form>
    </div>
    </div>
  );
};

export default AddMovie;
