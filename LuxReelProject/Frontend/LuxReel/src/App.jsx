import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import AddMovie from "./Pages/AddMovies/AddMovie";
import SelectedMovie from "./Pages/SelectedMovie/SelectedMovie";
import MovieDetails from "./components/MovieDetails/MovieDetails"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addMovie" element={<AddMovie />} />
        <Route path="/movieDetails" element={<MovieDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
