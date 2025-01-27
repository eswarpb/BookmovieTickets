import React, { useState ,useEffect,useRef} from "react";
import Carousel from "react-bootstrap/Carousel";
import Offcanvas from 'react-bootstrap/Offcanvas';
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate } from "react-router-dom";
import { collection,getDocs,query } from "firebase/firestore";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
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
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (credentialResponse) => {
    console.log("Login Success:", credentialResponse);
    const jwtToken = credentialResponse.credential;

    // Decode JWT to get user information (optional)
    const userObject = JSON.parse(atob(jwtToken.split(".")[1]));
    setUser(userObject);
  };

  const handleLoginFailure = (error) => {
    console.error("Login Failed:", error);
  };


  const moviesRef = useRef(null);
  const eventsRef = useRef(null);
  const playsRef = useRef(null);
  const sportsRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  

  const scrollToSection = (ref) => {
    toggleMenu(); // Close menu
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleMovieClick = (movie) => {
    navigate(`/movie/${movie.title}`, { state: movie });
  };

  const events = [
    {
      id: 1,
      title: "McDowell Soda Yaari Jam Anuv Jain And Zaeden",
      date: "Sat, 25 Jan",
      location: "Hitex Exhibition Center: Hyderabad",
      image: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-text,ie-U2F0LCAyNSBKYW4%3D,fs-29,co-FFFFFF,ly-612,lx-24,pa-8_0_0_0,l-end/et00406804-lgepsmkkrn-portrait.jpg", // Replace with actual image URL
      tag: "PROMOTED",
    },
    {
      id: 2,
      title: "Sonu Nigam Live in Concert - Hyderabad",
      date: "Sat, 8 Feb",
      location: "The League: Hyderabad",
      image: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-text,ie-U2F0LCA4IEZlYg%3D%3D,fs-29,co-FFFFFF,ly-612,lx-24,pa-8_0_0_0,l-end/et00421825-vgxzvdleal-portrait.jpg", // Replace with actual image URL
    },
    {
      id: 3,
      title: "3D - A TAMIL STANDUP COMEDY BUFFET",
      date: "Sat, 5 Apr",
      location: "The Comedy Theatre: Hyderabad",
      image: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-text,ie-U2F0LCA1IEFwcg%3D%3D,fs-29,co-FFFFFF,ly-612,lx-24,pa-8_0_0_0,l-end/et00425877-ftqewjgfsx-portrait.jpg", // Replace with actual image URL
    },
    {
      id: 4,
      title: "Hyderabad Kids Fair and Petex India",
      date: "Fri, 31 Jan onwards",
      location: "HITEX Exhibition Center: Hyderabad",
      image: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-text,ie-RnJpLCAzMSBKYW4gb253YXJkcw%3D%3D,fs-29,co-FFFFFF,ly-612,lx-24,pa-8_0_0_0,l-end/et00418488-cdsysqwbuf-portrait.jpg", // Replace with actual image URL
    },
    {
      id: 5,
      title: "Kukdukoo Fest Hyderabad",
      date: "Sat, 15 Feb onwards",
      location: "NITHM, Gachibowli: Hyderabad",
      image: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-text,ie-U2F0LCAxNSBGZWIgb253YXJkcw%3D%3D,fs-29,co-FFFFFF,ly-612,lx-24,pa-8_0_0_0,l-end/et00427658-gnfwlcqkzy-portrait.jpg", // Replace with actual image URL
    },
  ];
  const plays = [
    {
      id: 1,
      title: "Madbeth",
      date: "Sat, 25 Jan onwards",
      language: "English",
      location: "Rangbhoomi in association with Red Nose Entertainment",
      image: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-text,ie-U2F0LCAyNSBKYW4gb253YXJkcw%3D%3D,fs-29,co-FFFFFF,ly-612,lx-24,pa-8_0_0_0,l-end/et00319342-cnhlynfnpl-portrait.jpg", // Replace with the actual image URL
      tag: "PROMOTED",
    },
    {
      id: 2,
      title: "25 & Single - Helly Shah - India Tour",
      date: "Sun, 16 Feb",
      language: "English/Hindi/Hinglish",
      image: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-text,ie-U3VuLCAxNiBGZWI%3D,fs-29,co-FFFFFF,ly-612,lx-24,pa-8_0_0_0,l-end/et00403216-bhllhtkbcf-portrait.jpg", // Replace with the actual image URL
    },
    {
      id: 3,
      title: "Open Mic (Poetry, Storytelling Comedy)",
      date: "Sun, 26 Jan onwards",
      language: "English/Hindi",
      image: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-text,ie-U3VuLCAyNiBKYW4gb253YXJkcw%3D%3D,fs-29,co-FFFFFF,ly-612,lx-24,pa-8_0_0_0,l-end/et00403491-fgcukpknfh-portrait.jpg", // Replace with the actual image URL
    },
    {
      id: 4,
      title: "Mezok",
      date: "Sat, 15 Feb onwards",
      language: "English/Garhwali/Hindi/Kannada",
      image: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-text,ie-U2F0LCAxNSBGZWIgb253YXJkcw%3D%3D,fs-29,co-FFFFFF,ly-612,lx-24,pa-8_0_0_0,l-end/et00429379-vszhhtdvna-portrait.jpg", // Replace with the actual image URL
    },
    {
      id: 5,
      title: "Shadow and Sand Art",
      date: "Sun, 23 Feb",
      language: "English/Hindi/Telugu",
      image: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-text,ie-U3VuLCAyMyBGZWI%3D,fs-29,co-FFFFFF,ly-612,lx-24,pa-8_0_0_0,l-end/et00428916-gvejsthyxg-portrait.jpg", // Replace with the actual image URL
    },
  ];
  const games = [
    {
      id: 1,
      title: "5K/10K Run & Walk for Gomatha",
      date: "Sun, 16 Mar",
      location: "Necklace Road: Hyderabad",
      image: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-text,ie-U3VuLCAxNiBNYXI%3D,fs-29,co-FFFFFF,ly-612,lx-24,pa-8_0_0_0,l-end/et00423329-ycuxgxkxwu-portrait.jpg", // Replace with actual image URL
    },
    {
      id: 2,
      title: "TRAIL BLAZERS VICTORY TRAIL MARATHON",
      date: "Sun, 26 Jan onwards",
      location: "Your Place and Your Time: Hyderabad",
      image: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-text,ie-U3VuLCAyNiBKYW4gb253YXJkcw%3D%3D,fs-29,co-FFFFFF,ly-612,lx-24,pa-8_0_0_0,l-end/et00429006-zgcxwgwdtv-portrait.jpg", // Replace with actual image URL
    },
    {
      id: 3,
      title: "India Marathon - Get T-Shirt & Medal by Courier",
      date: "Sun, 26 Jan onwards",
      location: "Your Place and Your Time: Mumbai",
      image: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-text,ie-U3VuLCAyNiBKYW4gb253YXJkcw%3D%3D,fs-29,co-FFFFFF,ly-612,lx-24,pa-8_0_0_0,l-end/et00423283-tygspkfrlt-portrait.jpg", // Replace with actual image URL
    },
    {
      id: 4,
      title: "Chess Championship (Online) For All Age Group",
      date: "Sun, 26 Jan",
      location: "Your Place and Your Time: India",
      image: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-text,ie-U3VuLCAyNiBKYW4%3D,fs-29,co-FFFFFF,ly-612,lx-24,pa-8_0_0_0,l-end/et00426647-npqfjnjpzd-portrait.jpg", // Replace with actual image URL
    },
    {
      id: 5,
      title: "Walkathon Republic Day 2025",
      date: "Sun, 26 Jan",
      location: "Your Place and Your Time: India",
      image: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-text,ie-U3VuLCAyNiBKYW4%3D,fs-29,co-FFFFFF,ly-612,lx-24,pa-8_0_0_0,l-end/et00429941-ktgsqpxjsa-portrait.jpg", // Replace with actual image URL
    },
  ];

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
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
  <div className="App">
    {user ? (
      <div>
        <div>
          <img
            src={user.picture}
            alt="Profile"
            style={{ width: '20%', height: '20%', borderRadius: '20px', cursor:'pointer' }}
          />
          <span style={{marginLeft:"10px",color:"white"}}>{user?.name || "User"}</span> {/* Fallback if user.name is not available */}
        </div>
      </div>
    ) : (
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={handleLoginFailure}
      />
    )}
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
  <Offcanvas show={menuOpen} onHide={toggleMenu} placement="end" className="modern-offcanvas">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title className="offcanvas-title">
          Hey, {user?.name || "Guest"} 👋
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <nav className="menu-nav">
          <div className="menu-items">
            <div className="menu-item" onClick={() => scrollToSection(moviesRef)}>
              🎬 Movies
            </div>
            <div className="menu-item" onClick={() => scrollToSection(eventsRef)}>
              📢 Events
            </div>
            <div className="menu-item" onClick={() => scrollToSection(playsRef)}>
              🎵 Plays
            </div>
            <div className="menu-item" onClick={() => scrollToSection(sportsRef)}>
              🏀 Sports
            </div>
           
          </div>
        </nav>
      </Offcanvas.Body>
    </Offcanvas>
</GoogleOAuthProvider>

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

      <section className="movies-section" ref={moviesRef}>
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
      <div className="containerr" ref={eventsRef}>
      <div className="headerr">
        <h2>Popular Events</h2>
        <button className="see-all">See All</button>
      </div>
      <div className="event-list">
        {events.map((event) => (
          <div key={event.id} className="event-card">
            <div className="image-container">
              <img src={event.image} alt={event.title} />
              {event.tag && <span className="tag">{event.tag}</span>}
            </div>
            <div className="event-info">
              <p className="date">{event.date}</p>
              <h3 className="title">{event.title}</h3>
              <p className="location">{event.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className="plays-container" ref={playsRef}>
      <div className="headers">
        <h2>The Latest Plays</h2>
        <button className="see-all">See All</button>
      </div>
      <div className="play-list">
        {plays.map((play) => (
          <div key={play.id} className="play-card">
            <div className="image-containers">
              <img src={play.image} alt={play.title} />
              {play.tag && <span className="tag">{play.tag}</span>}
            </div>
            <div className="play-infos">
              <p className="dates">{play.date}</p>
              <h3 className="titles">{play.title}</h3>
              <p className="languages">{play.language}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className="plays-container" ref={sportsRef}>
      <div className="headers">
        <h2>Top Games & Sport Events</h2>
        <button className="see-all">See All</button>
      </div>
      <div className="play-list">
        {games.map((game) => (
          <div key={game.id} className="play-card">
            <div className="image-containers">
              <img src={game.image} alt={game.title} />
            </div>
            <div className="play-infos">
              <p className="dates">{game.date}</p>
              <h3 className="titles">{game.title}</h3>
              <p className="location">{game.location}</p>
            </div>
          </div>
        ))}
      </div>
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
}


export default HomePage;