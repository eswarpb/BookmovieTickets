import React from "react";
import "./moviecart.css";

function Moviecart({ title,name, genre, rating, votes, poster, onClick }) {
  return (
    <div className="movie-card" onClick={onClick}>
      <div className="movie-poster">
        <img src={poster} alt={`Poster of ${title}`} />
      </div>
      <div className="movie-info">
        <h4>{title}</h4>
        <p>{genre}</p>
        <p>
          <span>⭐{rating || "N/A"}</span> | {votes || "N/A"}
        </p>
      </div>
    </div>
  );
}

export default Moviecart;