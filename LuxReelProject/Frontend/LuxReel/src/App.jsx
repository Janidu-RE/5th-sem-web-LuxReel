import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import AddMovie from "./Pages/AddMovies/AddMovie";
import SelectedMovie from "./Pages/SelectedMovie/SelectedMovie";
import MovieDetails from "./Pages/MovieDetails/MovieDetails";
import Login from "./Pages/Login/Login";
import AdminHome from "./Pages/AdminHome/AdminDashboard";
import SignUp from "./Pages/SignUp/SignUp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addMovie" element={<AddMovie />} />
        <Route path="/movieDetails" element={<MovieDetails />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/admin" element={<AdminHome/>}/>
        <Route path="/signup" element={<SignUp/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
