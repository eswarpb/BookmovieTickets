import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';
import datab from "../TheatresData/Theatresfirebase"; // Import your Firebase config
import { collection, getDocs } from "firebase/firestore";
import "./TheatersDetails.css";

const MovieShowtimes = () => {
  const [theatresData, setTheatresData] = useState([]); // State for theater data
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [selectedLanguage, setSelectedLanguage] = useState("Telugu"); // State for language filter
  const [date, setDate] = useState(new Date()); // State for selected date
  const location = useLocation();
  const { movieName } = location.state || { movieName: "Select Movie" };

  // Fetch theater data from Firestore
  useEffect(() => {
    const fetchTheatres = async () => {
      setLoading(true);
      try {
        const theatresCollection = collection(datab, "theatres"); // Replace "theatres" with your Firestore collection name
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
  const handleDateChange = (direction) => {
    const newDate = new Date(date);
    direction === "prev"
      ? newDate.setDate(newDate.getDate() - 1)
      : newDate.setDate(newDate.getDate() + 1);
    setDate(newDate);
  };

  // Filter theaters based on selected language
  const filteredTheatres = theatresData.filter((theatre) =>
    theatre.language?.includes(selectedLanguage)
  );

  // Determine class for showtime based on index (e.g., available or fast-filling)
  const getShowtimeClass = (index) =>
    index % 2 === 0 ? "available" : "fast-filling";

  return (
    <div className="container">
      <h1>🎬{movieName} - Showtimes</h1>

      {/* Loading Indicator */}
      {loading ? (
        <center> <Spinner animation="border" variant="danger" /></center>
 
      ) : (
        <>
          {/* Date Navigation */}
          <div className="date-navigation">
            <button onClick={() => handleDateChange("prev")}>Previous</button>
            <button onClick={() => handleDateChange("next")}>Next</button>
          </div>
          <p>Selected Date: {date.toDateString()}</p>

          {/* Language Selection */}
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

          {/* Theater Cards */}
          <div className="showtimes-container">
            {filteredTheatres.length > 0 ? (
              filteredTheatres.map((theatre) => (
                <div key={theatre.id} className="theatre-card">
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
              <p>No theatres available for the selected language.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default MovieShowtimes;
