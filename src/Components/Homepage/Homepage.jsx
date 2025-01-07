import React, { useState ,useEffect} from "react";
import Carousel from "react-bootstrap/Carousel";
import Offcanvas from 'react-bootstrap/Offcanvas';
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate } from "react-router-dom";
import { collection,getDocs,query } from "firebase/firestore";
import db from "../Moviesdata/Moviesfirebase";
import MovieCard from "./moviecart";
import "./Homepage.css";

function HomePage() {
  // Fetch movies from Firestore
  const [movies, setMovies] = useState([]); // State to hold movie data
  const [loading, setLoading] = useState(true); // Loading indicator
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const moviesCollection = collection(db, "movies");
        const moviesQuery = query(moviesCollection);
        const moviesSnapshot = await getDocs(moviesQuery);
        const moviesList = moviesSnapshot.docs.map((doc) => doc.data());
        setMovies(moviesList);
      } catch (error) {
        console.error("Error fetching movies: ", error);
      } finally {
        setLoading(false); // Stop loading spinner
      }
    };

    fetchMovies();
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const filteredMovies = movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.genre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchQuery = (e) => {
    setSearchQuery(e.target.value);
  };

  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleMovieClick = (movie) => {
    navigate(`/movie/${movie.title}`, { state: movie });
  };

  return (
    <div className="App">
      
      <header className="header">
        <div className="logo">BookMovieTickets</div>
        <input
          type="text"
          placeholder="Search for Movies, theaters..etc"
          value={searchQuery}
          onChange={handleSearchQuery}
        />

        <div className="city-select">
          <select>
            <option value="hyderabad">Hyderabad</option>
            <option value="bengaluru">Bangalore</option>
          </select>
        </div>

        <div
        className={`hamburger-menu ${menuOpen ? 'open' : ''}`}
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
          <div>
            <div className="menu-item">Home</div>
            <div className="menu-item">Movies</div>
            <div className="menu-item">Events</div>
            <div className="menu-item">Plays</div>
            <div className="menu-item">Sports</div>
            <div className="menu-item">Activities</div>
          </div>
          </nav>
        </Offcanvas.Body>
      </Offcanvas>
      </header>

      <Carousel className="banner">
        <Carousel.Item>
          <img
            className="banimg"
            src="https://assets-in.bmscdn.com/promotions/cms/creatives/1726036566435_playcardnewweb.jpg"
            alt="credit card"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="banimg"
            src="https://assets-in.bmscdn.com/promotions/cms/creatives/1732797085304_asiancinemawebbanner.jpg"
            alt="credit card"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="banimg"
            src="https://assets-in.bmscdn.com/promotions/cms/creatives/1733491218245_prasadsmultiplexweb.jpg"
            alt="credit card"
          />
        </Carousel.Item>
      </Carousel>

      <section className="movies-section">
        <h2>Recommended Movies</h2>
        <div className="movies-grid">
          {loading ? (
           <center> <Spinner animation="border" variant="danger" /></center>
            // Display a loader while data is being fetched
          ):
          filteredMovies.length > 0 ? (
            filteredMovies.map((movie, index) => (
              <MovieCard
                key={index}
                title={movie.title}
                name={movie.name}
                genre={movie.genre}
                rating={movie.rating}
                votes={movie.votes}
                poster={movie.poster}
                onClick={() => handleMovieClick(movie)}
              />
            ))
          ) : (
            <p>No Movies Found.</p>
          )}
        </div>
      </section>

      <footer className="footer">
        <div className="footer-container">
          <h3>Contact Us</h3>
          <p>
            Email:{" "}
            <a href="mailto:support@bookmovietickets.com">
              support@bookmovietickets.com
            </a>
          </p>
          <div className="social-links">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                alt="Facebook"
              />
            </a>

            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
                alt="Instagram"
              />
            </a>

            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/4/42/YouTube_icon_%282013-2017%29.png"
                alt="YouTube"
              />
            </a>

            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/01/LinkedIn_Logo.svg"
                alt="LinkedIn"
              />
            </a>

            <a
              href="https://www.pinterest.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/08/Pinterest-logo.png"
                alt="Pinterest"
              />
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default HomePage;