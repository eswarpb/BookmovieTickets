import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./Components/Homepage/Homepage";
import MovieDetails from "./Components/Moviedetails/Moviedetails";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/movie/:title" element={<MovieDetails />} />
      </Routes>
    </Router>
  );
}

export default App;