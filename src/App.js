import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./Components/Homepage/Homepage";
import MovieDetailsPage from "./Components/Moviedetails/Moviedetails";
import MovieShowtimes from "./Components/TheatersDetails/TheatersDetails";
import Seats1 from "./Components/Seats/Seats1";
import Seats2 from "./Components/Seats/Seats2";
import BookingSummary from "./Components/BookingSummary/Bookingsummary";
import TicketPage from "./Components/Ticketpage/Ticketpage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/movie/:title" element={<MovieDetailsPage />} />
        <Route path="/theatre-details" element={<MovieShowtimes />} />
        <Route path="/Seats1" element={<Seats1 />} />
        <Route path="/Seats2" element={<Seats2 />} />
        <Route path="/booking-summary" element={<BookingSummary />} />
        <Route path="/ticket" element={<TicketPage />} />
      </Routes>
    </Router>
  );
}

export default App;
