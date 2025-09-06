import React, { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MovieCard from "../MovieCard/MovieCard";
import "./CardGrid.css";

const CardGrid = ({status}) => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:8080/api/movies/${status}`,
          {headers: {
            Authorization: `Bearer ${token}`,
          },
          }
        );
        setMovies(res.data);
      } catch (err) {
        console.error("Error fetching movies:", err);
      }
    };
    fetchMovies();
  }, []);

  const handleView = (movie) => {
    navigate("/movieDetails", { state: { movie } });
  };

  return (
    <div className="card-grid-inline">
      {movies.map((movie) => (
        <div key={movie.id} className="card-wrapper">
          <MovieCard movie={movie} onBook={handleView} />
        </div>
      ))}
    </div>
  );
};

export default CardGrid;
