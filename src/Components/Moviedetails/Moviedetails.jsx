import React,{useState} from "react";
import { useLocation,useNavigate } from "react-router-dom";
import Modal from "react-modal";
import "./Moviedetails.css";

function MovieDetailsPage() {
  const location = useLocation();
  const movie = location.state;
  const navigate=useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!movie) {
    return <p>Movie not found!</p>;
  }

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleBookTickets = () => {
    navigate("/theatre-details", { state: { movieName: movie.title ,poster: movie.poster} });
  };

  return (
    <div id="movie-details-page">
      <div id="movie-details-container">
        <div id="movie-poster">
          <img
            src={movie.poster}
            alt={movie.title}
            onClick={openModal}
            style={{ cursor: "pointer" }}
          />
        </div>

        <div id="movie-info">
          <h1>{movie.title}</h1>
          <div className="rating-section">
            <span className="rating">⭐ {movie.rating}</span>
            <span className="votes">({movie.votes})</span>
          </div>

          <div className="additional-info">
            <p>
              <strong>Formats:</strong> {movie.formats.toString()}
            </p>
            <p>
              <strong>Languages:</strong> {movie.languages.toString()}
            </p>
            <p>
              <strong>Duration:</strong> {movie.duration}
            </p>
            <p>
              <strong>Genres:</strong> {movie.genre}
            </p>
            <p>
              <strong>Release Date:</strong> {movie.releaseDate}
            </p>
            <p>
              <strong>Age Rating:</strong> {movie.ageRating}
            </p>
          </div>
          <button className="book-ticket-button" onClick={handleBookTickets}>Book Tickets</button>
        </div>
      </div>

      <h3 style={{marginTop:"20px"}}>
        <strong style={{color:"black"}}>About the Movie</strong>{" "}
      </h3>
      <p>{movie.description}</p>
      <h3>
        <b style={{color:"black"}}>Cast</b>
      </h3>
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        {movie.cast.map((actor, index) => (
          <div key={index} style={{ textAlign: "center" }}>
            <img
              src={actor.image}
              alt={actor.name}
              style={{ width: "100px", height: "100px", borderRadius: "50%" }}
            />
            <p>{actor.name}</p>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Trailer Modal"
        style={{
          content: {
            inset: "50px",
            padding: "20px",
            borderRadius: "10px",
            maxWidth: "800px",
            margin: "auto",
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.75)",
          },
        }}
      >
        <button
          onClick={closeModal}
          style={{
            float: "right",
            background: "transparent",
            border: "none",
            fontSize: "20px",
            cursor: "pointer",
          }}
        >
          ✖
        </button>
        <h2>{movie.title} - Trailer</h2>
        <iframe
          width="100%"
          height="400vh"
          src={movie.trailerUrl}
          title="Trailer"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </Modal>
    </div>
  );
}

export default MovieDetailsPage;