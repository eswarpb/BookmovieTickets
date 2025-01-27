import React, { useState, useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Offcanvas from "react-bootstrap/Offcanvas";
import datab from "../TheatresData/Theatresfirebase"; // Firebase config
import { collection, getDocs } from "firebase/firestore";
import "./TheatersDetails.css";

const MovieShowtimes = (movie) => {
  const [theatresData, setTheatresData] = useState([]); // Theater data state
  const [loading, setLoading] = useState(true); // Loading state
  const [selectedLanguage, setSelectedLanguage] = useState("Telugu"); // Language filter state
  const [date, setDate] = useState(new Date()); // Date state
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const location = useLocation();
  const { movieName } = location.state || { movieName: "Select Movie" };
  const navigate = useNavigate();

 

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
   
    const [menuOpen, setMenuOpen] = useState(false);
  
    const toggleMenu = () => setMenuOpen(!menuOpen);
  

  // Navigate between dates
  const getNextDays = () => {
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
  

  // Determine class for showtime based on index
  const getShowtimeClass = (index) =>
    index % 2 === 0 ? "available" : "fast-filling";
  const handleShowtimeClick = (classType, theatreName, showtime) => {
    const movieDetails = {
      movieName,
      theatreName,
      showtime,
      date: date.toDateString(),
      poster: movie.poster,
    };

    if (classType === "available") {
      navigate("/Seats1", { state: movieDetails });
    } else if (classType === "fast-filling") {
      navigate("/Seats2", { state: movieDetails });
    }
  };


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
        <Offcanvas show={menuOpen} onHide={toggleMenu} placement="end" className="modern-offcanvas">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title className="offcanvas-title">
          Hey, {"Guest"} 👋
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <nav className="menu-nav">
          <div className="menu-items">
            <div className="menu-item" >
              🎬 Movies
            </div>
            <div className="menu-item" >
              📢 Events
            </div>
            <div className="menu-item" >
              🎵 Plays
            </div>
            <div className="menu-item" >
              🏀 Sports
            </div>
          </div>
        </nav>
      </Offcanvas.Body>
    </Offcanvas>
      </header>
       </div>
       <div className="container">
          <div>
      <h1>🎬 {movieName} - Showtimes</h1>
      </div>
      {loading ? (
        <center>
          <Spinner animation="border" variant="danger" />
        </center>
      ) : (
        <>
           <div className="date-navigation">
            {getNextDays().map((day, index) => (
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
          <p>{date.toDateString()}</p>

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
                  className="theatre-card">
                  <h3 className="theatre-name">{theatre.name}</h3>
                  <div className="showtimes">
                    {theatre.showtimes.map((time, index) => (
                       <span
                       key={index}
                       className={`showtime ${getShowtimeClass(index)}`}
                       onClick={() =>
                         handleShowtimeClick(
                           getShowtimeClass(index),
                           theatre.name,
                           time
                         )
                       }
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
      <footer class="footer">
        <div class="footer-content">
          <div class="list-your-show">
            <div class="icon-text">
              <h2>🎬</h2>
              <p>
                <strong>List your Show</strong> Got a show, event, activity, or
                a great experience? Partner with us & get listed on BookMyShow
              </p>
            </div>
            <button class="contact-btn">Contact today!</button>
          </div>

          <div class="divider">
            <hr />
            <h2>
              Book<span>Movie</span>Tickets
            </h2>
            <hr />
          </div>

          <div class="social-icons">
            <a href="https://www.facebook.com">
              <div class="circle">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                  alt="Facebook"
                />
              </div>
            </a>
            <a href="https://www.instagram.com">
              <div class="circle">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
                  alt="Instagram"
                />
              </div>
            </a>
            <a href="https://www.youtube.com">
              <div class="circle">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/4/42/YouTube_icon_%282013-2017%29.png"
                  alt="YouTube"
                />
              </div>
            </a>
            <a href="https://www.linkedin.com">
              <div class="circle">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRokEYt0yyh6uNDKL8uksVLlhZ35laKNQgZ9g&s"
                  alt="LinkedIn"
                />
              </div>
            </a>
            <a href="https://www.pinterest.com">
              <div class="circle">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/0/08/Pinterest-logo.png"
                  alt="Pinterest"
                />
              </div>
            </a>
          </div>

          <div class="footer-text">
            <p>
              Copyright 2025 © Bigtree Entertainment Pvt. Ltd. All Rights
              Reserved.
            </p>
            <p>
              The content and images used on this site are copyright protected
              and copyrights vest with the respective owners. The usage of the
              content and images on this website is intended to promote the
              works and no endorsement of the artist shall be implied.
              Unauthorized use is prohibited and punishable by law.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MovieShowtimes;
