import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./Components/Homepage/Homepage";
import MovieDetailsPage from "./Components/Moviedetails/Moviedetails";
import MovieShowtimes from "./Components/TheatersDetails/TheatersDetails";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/movie/:title" element={<MovieDetailsPage />} />
        <Route path="/theatre-details" element={<MovieShowtimes/>}/>
      </Routes>
    </Router>
  );
}

export default App;