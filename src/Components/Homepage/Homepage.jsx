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
}

export default HomePage;