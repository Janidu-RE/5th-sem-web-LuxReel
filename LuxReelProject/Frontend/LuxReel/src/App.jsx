import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import AddMovie from "./Pages/AddMovies/AddMovie";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addMovie" element={<AddMovie />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
