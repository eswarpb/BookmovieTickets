import React ,{useState}from "react";
import Carousel from 'react-bootstrap/Carousel';

import "./Homepage.css";

function Homepage() {
  const movies = [
    {
      title: "Pushpa 2: The Rule",
      rating: "8.4/10",
      votes: "296.1K Votes",
      genre: "Action/Thriller",
      poster:
        "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-image,i-discovery-catalog@@icons@@star-icon-202203010609.png,lx-24,ly-615,w-29,l-end:l-text,ie-OC40LzEwICAzNjYuMksgVm90ZXM%3D,fs-29,co-FFFFFF,ly-612,lx-70,pa-8_0_0_0,l-end/et00356724-gsglcmjwxd-portrait.jpg", // Pushpa 2 Poster
    },
    {
      title: "Mufasa: The Lion King",
      likes: "135.6K Likes",
      genre: "Adventure/Animation/Drama",
      poster:
        "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-image,i-discovery-catalog@@icons@@star-icon-202203010609.png,lx-24,ly-615,w-29,l-end:l-text,ie-OC41LzEwICAxNksgVm90ZXM%3D,fs-29,co-FFFFFF,ly-612,lx-70,pa-8_0_0_0,l-end/et00396541-shwnybpcvd-portrait.jpg", // Mufasa Poster
    },
    {
      title: "SALAAR",
      rating: "8.3/10",
      votes: "650.3K Votes",
      genre: "Action/Thriller",
      poster:
        "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/salaar-cease-fire--part-1-et00301886-1702971289.jpg", // Placeholder for "Miss You"
    },
    {
        title: "Baby John",
        rating: "N/A", // Rating not available yet
        votes: "88.5 likes", // Votes not available yet
        genre: "Action/Thriller",
        poster: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-image,i-discovery-catalog@@icons@@like_202006280402.png,lx-24,ly-617,w-29,l-end:l-text,ie-ODguNksgTGlrZXM%3D,fs-29,co-FFFFFF,ly-612,lx-70,pa-8_0_0_0,l-end/et00386190-uyhrsnljur-portrait.jpg", // Placeholder poster image
      },
      {
        title: "Sankranthiki Vasthunnam",
        rating: "N/A", // Rating not available yet
        votes: "N/A", // Votes not available yet
        genre: "Action/Drama",
        poster: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-text,ie-MTQsIEphbiAyMDI1,fs-29,co-FFFFFF,ly-612,lx-24,pa-8_0_0_0,l-end/et00418119-bxcdaxdxvd-portrait.jpg", // Placeholder poster image
      },
    {
      title: "Bachhala Malli",
      likes: "26.3K Likes",
      genre: "Action/Drama",
      poster:
        "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-image,i-discovery-catalog@@icons@@star-icon-202203010609.png,lx-24,ly-615,w-29,l-end:l-text,ie-OC4xLzEwICA4NzkgVm90ZXM%3D,fs-29,co-FFFFFF,ly-612,lx-70,pa-8_0_0_0,l-end/et00401910-sxupzqqkqe-portrait.jpg", // Placeholder for "Bachhala Malli"
    },
    {
      title: "Game Changer",
      rating: "8.5/10",
      votes: "75.4K Votes",
      genre: "Action/Drama",
      poster:
        "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-text,ie-MTAsIEphbiAyMDI1,fs-29,co-FFFFFF,ly-612,lx-24,pa-8_0_0_0,l-end/et00311772-cyayfjnueg-portrait.jpg",
    },
    {
      title: "Hara Hara Veera Mallu",
      likes: "145.7K Likes",
      genre: "Action/Drama/Period",
      poster:
        "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-text,ie-MjgsIE1hciAyMDI1,fs-29,co-FFFFFF,ly-612,lx-24,pa-8_0_0_0,l-end/et00308207-uzkhshyusd-portrait.jpg",
    },
    {
      title: "Toxic",
      rating: "7.8/10",
      votes: "43.2K Votes",
      genre: "Thriller/Psychological",
      poster:
        "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-text,ie-MTAsIEFwciAyMDI1,fs-29,co-FFFFFF,ly-612,lx-24,pa-8_0_0_0,l-end/et00378770-jbmjmnczkv-portrait.jpg",
    },
    {
      title: "Kalki 2898 AD",
      rating: "9.2/10",
      votes: "112.8K Votes",
      genre: "Sci-Fi/Action/Drama",
      poster:
        "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/kalki-2898-ad-et00352941-1718275859.jpg",
    },
    {
      title: "Sonic the Hedgehog 3",
      likes: "325.8K Likes",
      genre: "Sci-Fi/Fantasy/Adventure",
      poster:
        "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-text,ie-MywgSmFuIDIwMjU%3D,fs-29,co-FFFFFF,ly-612,lx-24,pa-8_0_0_0,l-end/et00399670-hltvlgjvfn-portrait.jpg", // Moana 2 Poster
    },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter movies based on the search query
  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    movie.genre.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  const [menuOpen, setMenuOpen] = useState(false); // Track hamburger menu state

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="App">
      {/* Header */}
      <header className="header">
        <div className="logo">BookMovieTickets</div>
        <input
          type="text"
          placeholder="Search for Movies,theaters..etc"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update search query on input change
        />
        <div className="city-select">
          <select>
            <option value="hyderabad">Hyderabad</option>
            <option value="bengaluru">Bengaluru</option>
          </select>
        </div>
        <div className={`hamburger-menu ${menuOpen ? "open" : ""}`} onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
        <nav className={`dropdown-menu ${menuOpen ? "show" : ""}`}>
          <ul>
            <li>Home</li>
            <li>Movies</li>
            <li>Events</li>
            <li>Plays</li>
            <li>Sports</li>
            <li>Activities</li>
          </ul>
        </nav>
      </header>
      
      <Carousel className="banner" activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
      <img className="banimg"
          src="https://assets-in.bmscdn.com/promotions/cms/creatives/1726036566435_playcardnewweb.jpg"
          alt="credit card"
        />
      </Carousel.Item>
      <img className="banimg"
          src="https://assets-in.bmscdn.com/promotions/cms/creatives/1732797085304_asiancinemawebbanner.jpg"
          alt="credit card"
        />
      <Carousel.Item>
      </Carousel.Item>
      <Carousel.Item>
      <img className="banimg"
          src="https://assets-in.bmscdn.com/promotions/cms/creatives/1733491218245_prasadsmultiplexweb.jpg"
          alt="credit card"
        />
      </Carousel.Item>
    </Carousel>
        {/* Add more images here */}

      <section className="movies-section">
        <h2>Recommended Movies</h2>
        <div className="movies-grid">
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie, index) => (
              <div className="movie-card" key={index}>
                <div className="movie-poster">
                  <img src={movie.poster} alt={movie.title} />
                </div>
                <div className="movie-info">
                  <h3>{movie.title}</h3>
                  <p>{movie.genre}</p>
                  {movie.rating ? (
                    <p>
                      <span>⭐ {movie.rating}</span> | {movie.votes}
                    </p>
                  ) : (
                    <p>{movie.likes}</p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>No movies found.</p>
          )}
        </div>
      </section>
      <footer className="footer">
  <div className="footer-container">
    <h3>Contact Us</h3>
    <p>Email: <a href="mailto:support@bookmovietickets.com">support@bookmovietickets.com</a></p>
    <div className="social-links">
      <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
        <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" />
      </a>
      <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
        <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram" />
      </a>
      <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
        <img src="https://upload.wikimedia.org/wikipedia/commons/4/42/YouTube_icon_%282013-2017%29.png" alt="YouTube" />
      </a>
      <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
        <img src="https://upload.wikimedia.org/wikipedia/commons/0/01/LinkedIn_Logo.svg" alt="LinkedIn" />
      </a>
      <a href="https://www.pinterest.com" target="_blank" rel="noopener noreferrer">
        <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Pinterest-logo.png" alt="Pinterest" />
      </a>
    </div>
  </div>
</footer>

    </div>
  );
}

export default Homepage;