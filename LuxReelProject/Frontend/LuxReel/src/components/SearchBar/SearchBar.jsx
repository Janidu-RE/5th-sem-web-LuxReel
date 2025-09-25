import React from "react";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (search.trim() === "") return;

    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9090/api/movies/search?title=${search}`
        );
        setMovies(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
  }, [search]);
  return <div></div>;
};

export default SearchBar;
