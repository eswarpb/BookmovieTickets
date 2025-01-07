import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Offcanvas from "react-bootstrap/Offcanvas";
import datab from "../TheatresData/Theatresfirebase"; // Firebase config
import { collection, getDocs } from "firebase/firestore";
import "./TheatersDetails.css";

const MovieShowtimes = () => {
  const [theatresData, setTheatresData] = useState([]); // Theater data state
  const [loading, setLoading] = useState(true); // Loading state
  const [selectedLanguage, setSelectedLanguage] = useState("Telugu"); // Language filter state
  const [date, setDate] = useState(new Date()); // Date state
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const location = useLocation();
  const { movieName } = location.state || { movieName: "Select Movie" };
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Fetch theater data from Firestore
  useEffect(() => {
    const fetchTheatres = async () => {
      setLoading(true);
      try {
        const theatresCollection = collection(datab, "theatres");
        const theatresSnapshot = await getDocs(theatresCollection);
        const theatresList = theatresSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTheatresData(theatresList);
      } catch (error) {
        console.error("Error fetching theaters: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTheatres();
  }, []);

  // Handle language selection
  const handleLanguageChange = (language) => setSelectedLanguage(language);

  // Navigate between dates
  const getNext7Days = () => {
    const days = [];
    for (let i = 0; i < 5; i++) {
      const newDate = new Date();
      newDate.setDate(date.getDate() + i);
      days.push(newDate);
    }
    return days;
  };

  // Filter theaters by language and search query
  const filteredTheatres = theatresData.filter(
    (theatre) =>
      theatre.language?.includes(selectedLanguage) &&
      theatre.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Navigate to theater details
  const handleTheatreClick = (theatre) => {
    navigate(`/theatre/${theatre.id}`, { state: theatre });
  };

  // Determine class for showtime based on index
  const getShowtimeClass = (index) =>
    index % 2 === 0 ? "available" : "fast-filling";

  return (
    <div>
          <div>
      <header className="header">
        <div className="logo">BookMovieTickets</div>
        <input
          type="text"
          placeholder="Search for theaters..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="city-select">
          <select>
            <option value="hyderabad">Hyderabad</option>
            <option value="bengaluru">Bangalore</option>
          </select>
        </div>

        <div
          className={`hamburger-menu ${menuOpen ? "open" : ""}`}
          onClick={toggleMenu}
        >
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>

        {/* Offcanvas Dropdown Menu */}
        <Offcanvas show={menuOpen} onHide={toggleMenu} placement="end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Hey User!</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <nav>
              <div className="menu-item">Home</div>
              <div className="menu-item">Movies</div>
              <div className="menu-item">Events</div>
              <div className="menu-item">Plays</div>
              <div className="menu-item">Sports</div>
              <div className="menu-item">Activities</div>
            </nav>
          </Offcanvas.Body>
        </Offcanvas>
      </header>
       </div>
       <div className="container">

      <h1>🎬 {movieName} - Showtimes</h1>

      {loading ? (
        <center>
          <Spinner animation="border" variant="danger" />
        </center>
      ) : (
        <>
           <div className="date-navigation">
            {getNext7Days().map((day, index) => (
              <button
                key={index}
                className={`date-button ${
                  day.toDateString() === date.toDateString() ? "selected" : ""
                }`}
                onClick={() => setDate(day)}
              >
                <div>{day.toLocaleString("default", { weekday: "short" })}</div>
                <div>{day.getDate()}</div>
              </button>
            ))}
          </div>
          <p>Selected Date: {date.toDateString()}</p>

          <div className="language-selection">
            <select
              value={selectedLanguage}
              onChange={(e) => handleLanguageChange(e.target.value)}
            >
              <option value="Telugu">Telugu</option>
              <option value="Hindi">Hindi</option>
              <option value="Tamil">Tamil</option>
              <option value="Malayalam">Malayalam</option>
            </select>

            <div className="legend">
              <span className="avail">🟩 Available</span>
              <span className="fill">🟧 Fast filling</span>
            </div>
          </div>

          <div className="showtimes-container">
            {filteredTheatres.length > 0 ? (
              filteredTheatres.map((theatre) => (
                <div
                  key={theatre.id}
                  className="theatre-card"
                  onClick={() => handleTheatreClick(theatre)}
                >
                  <h3 className="theatre-name">{theatre.name}</h3>
                  <div className="showtimes">
                    {theatre.showtimes.map((time, index) => (
                      <span
                        key={index}
                        className={`showtime ${getShowtimeClass(index)}`}
                      >
                        {time}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p>No theatres available for the selected language or search.</p>
            )}
          </div>
        </>
      )}
      </div>
    </div>
  );
};

export default MovieShowtimes;
