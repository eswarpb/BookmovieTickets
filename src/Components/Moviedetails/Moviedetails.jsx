import React from "react";
import { useLocation } from "react-router-dom";
import "./Moviedetails.css";

function MovieDetails() {
  const location = useLocation();
  const movie = location.state;

  if (!movie) {
    return <p>Movie not found!</p>;
  }

  return (
    <div id="movie-details-page">
      <div id="movie-details-container">
        <div id="movie-poster">
          <img src={movie.poster} alt={movie.title} />
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
          <button className="book-ticket-button">Book Tickets</button>
        </div>
      </div>
      <h3>
        <strong>About the movie</strong>{" "}
      </h3>
      <p>{movie.description}</p>
      <h3><b>Cast</b></h3>
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
    </div>
  );
}

export default MovieDetails;
