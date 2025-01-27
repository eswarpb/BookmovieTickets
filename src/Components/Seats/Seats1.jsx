import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Seats.css";

const Seats1 = () => {
  const location = useLocation();
  const { movieName, theatreName, date, showtime,} = location.state || {};
  const navigate = useNavigate();

  const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P"];
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Function to get ticket price based on row
  const getTicketPrice = (row) =>
    ["A", "B", "C", "D", "E", "F", "G", "H"].includes(row) ? 300 : 150;

  // Toggle seat selection
  const toggleSeat = (row, col) => {
    const seat = `${row}${col}`;
    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );
  };

  // Calculate total price based on selected seats
  const totalPrice = selectedSeats.reduce(
    (total, seat) => total + getTicketPrice(seat[0]),
    0
  );

  // Handle payment and navigate to the summary page
  const handlePay = () => {
    const convenienceFee = 18 * selectedSeats.length; // Convenience fee per seat
    const gst = 0.18 * (totalPrice + convenienceFee); // 18% GST
    const grandTotal = totalPrice + convenienceFee + gst;

    navigate("/booking-summary", {
      state: {
        selectedSeats,
        totalPrice,
        convenienceFee,
        gst,
        grandTotal,
        movieName,
        theatreName,
        date,
        showtime,
        
      },
    });
  };

  return (
    <div className="theatre-container">
      <div className="movie-details-header">
        <h2 className="movie-title">{movieName}</h2>
        <p className="theatre-info">
          {theatreName} | {date}, {showtime}
        </p>
       
      </div>
      <div className="theatre">
        {/* Seat Map */}
        {rows.map((row) => {
          const numSeats = row === "A" || row === "I" ? 30 : 28;
          return (
            <div key={row} className="row">
              <div className="row-label">{row}</div>
              {Array.from({ length: numSeats }, (_, i) => i + 1).map((col) => {
                const seat = `${row}${col}`;
                const isSelected = selectedSeats.includes(seat);

                if (col === 15 && row !== "A" && row !== "I") {
                  return (
                    <React.Fragment key={col}>
                      <div className="gap"></div>
                      <div
                        className={`seat ${
                          isSelected ? "selected" : "available"
                        }`}
                        onClick={() => toggleSeat(row, col)}
                      >
                        {col}
                      </div>
                    </React.Fragment>
                  );
                }

                return (
                  <div
                    key={col}
                    className={`seat ${isSelected ? "selected" : "available"}`}
                    onClick={() => toggleSeat(row, col)}
                  >
                    {col}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <div className="screen">All eyes this way please!</div>

      {/* Conditionally render the legend */}
      {selectedSeats.length === 0 && (
        <div className="seat-legend">
          <span className="available"></span> Available
          <span className="selected"></span> Selected
          <span className="sold"></span> Sold
        </div>
      )}

      {/* <div className="selected-seats">
        <p>Selected Seats: {selectedSeats.join(", ") || "None"}</p>
      </div> */}

      {/* Conditionally render the Pay button */}
      {selectedSeats.length > 0 && (
        <div className="total-price-container">
          <button className="pay-button" onClick={handlePay}>
            Pay ₹{totalPrice}
          </button>
        </div>
      )}
    </div>
  );
};

export default Seats1;
