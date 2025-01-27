import React, { useState, useEffect } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import "./Seats.css";

const Seats2 = () => {
  const location = useLocation();
  const { movieName, theatreName, date, showtime } = location.state || {};
  const navigate = useNavigate();

  const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P"];
  const colsWithGap = 28; // Columns for rows with a gap
  const colsWithoutGap = 30; // Columns for rows without a gap (A and H)
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const getTicketPrice = (row) => (["A", "B", "C", "D", "E", "F", "G","H"].includes(row) ? 300 : 150);
  const totalPrice = selectedSeats.reduce(
    (total, seat) => total + getTicketPrice(seat[0]),
    0
  );
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

  // Effect to randomly pre-book seats
  useEffect(() => {
    const totalSeats =
      rows.reduce(
        (total, row) => total + (row === "A" || row === "I" ? colsWithoutGap : colsWithGap),
        0
      );

    const bookedCount = Math.floor(
      Math.random() * (0.8 - 0.5) * totalSeats + 0.5 * totalSeats
    );
    const booked = new Set();
    while (booked.size < bookedCount) {
      const randomRow = rows[Math.floor(Math.random() * rows.length)];
      const randomCol =
        Math.floor(
          Math.random() * (randomRow === "A" || randomRow === "I" ? colsWithoutGap : colsWithGap)
        ) + 1;
      booked.add(`${randomRow}${randomCol}`);
    }
    setBookedSeats(Array.from(booked));
  }, []);

  const toggleSeat = (row, col) => {
    const seat = `${row}${col}`;
    if (bookedSeats.includes(seat)) return; // Ignore booked seats
    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );
  };

  return (
    <div className="theatre-container">
      <div className="movie-details-header">
        <h2 className="movie-title">{movieName}</h2>
        <p className="theatre-info">
          {theatreName} | {date}, {showtime}
        </p>
      </div>

      {/* Seats Layout */}
      <div className="theatre">
        {rows.map((row) => (
          <div key={row} className="row">
            {/* Row Label */}
            <div className="row-label">{row}</div>

            {/* Seats */}
            {Array.from(
              { length: row === "A" || row === "I" ? colsWithoutGap : colsWithGap },
              (_, i) => i + 1
            ).map((col) => {
              const seat = `${row}${col}`;
              const isSelected = selectedSeats.includes(seat);
              const isBooked = bookedSeats.includes(seat);

              // Add gap in the middle after column 14 for rows with gaps
              if (col === 15 && row !== "A" && row !== "I") {
                return (
                  <React.Fragment key={col}>
                    <div className="gap"></div>
                    <div
                      className={`seat ${
                        isBooked ? "booked" : isSelected ? "selected" : "available"
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
                  key={seat}
                  className={`seat ${
                    isBooked ? "booked" : isSelected ? "selected" : "available"
                  }`}
                  onClick={() => toggleSeat(row, col)}
                >
                  {col}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div className="screen">All eyes this way please!</div>
      {/* Legend */}
      {selectedSeats.length === 0 && (
        <div className="seat-legend">
          <span className="available"></span> Available
          <span className="selected"></span> Selected
          <span className="sold"></span> Sold
        </div>
      )}
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

export default Seats2;