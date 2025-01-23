import React, { useRef } from "react";
import QRCode from "react-qr-code";
import { useLocation, useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import "./TicketPage.css";

const TicketPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const qrRef = useRef(); // Reference for QR Code

  const {
    selectedSeats,
    movieName,
    theatreName,
    date,
    showtime,
    totalPrice,
    convenienceFee,
    gst,
    grandTotal,
    movie, // Add a movie image to your state when navigating
  } = location.state || {};

  if (!selectedSeats) {
    // Redirect to home if no ticket data is available
    navigate("/");
    return null;
  }

  const qrData = JSON.stringify({
    movieName,
    theatreName,
    date,
    showtime,
    selectedSeats,
    grandTotal,
  });

  const handleDownload = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text("Your Movie Ticket", 10, 20);

    doc.setFontSize(12);
    doc.text(`Movie: ${movieName}`, 10, 40);
    doc.text(`Theatre: ${theatreName}`, 10, 50);
    doc.text(`Date & Time: ${date}, ${showtime}`, 10, 60);
    doc.text(`Selected Seats: ${selectedSeats.join(", ")}`, 10, 70);
    doc.text(`Total Paid: ₹${grandTotal.toFixed(2)}`, 10, 80);

    // Add QR Code to PDF using useRef
    const qrCanvas = qrRef.current?.querySelector("canvas");
    if (qrCanvas) {
      const qrDataUrl = qrCanvas.toDataURL("image/png");
      doc.addImage(qrDataUrl, "PNG", 150, 20, 40, 40);
    }

    doc.save("Movie_Ticket.pdf");
  };

  return (
    <div className="ticket-page">
      <h2>Your Ticket</h2>

      {/* Movie Poster */}
      {movie && <img src={movie.poster} alt={movieName} className="movie-posterr" />}

      <div className="ticket-details">
        <p><strong>Movie:</strong> {movieName}</p>
        <p><strong>Theatre:</strong> {theatreName}</p>
        <p><strong>Date & Time:</strong> {date}, {showtime}</p>
        <p><strong>Selected Seats:</strong> {selectedSeats.join(", ")}</p>
        <p><strong>Convenience Fee:</strong> ₹{convenienceFee.toFixed(2)}</p>
        <p><strong>GST:</strong> ₹{gst.toFixed(2)}</p>
        <p><strong>Total Paid:</strong> ₹{grandTotal.toFixed(2)}</p>
      </div>

      {/* QR Code */}
      <div className="qr-code-container" ref={qrRef}>
        <h3>Scan this QR Code at the Theatre</h3>
        <QRCode value={qrData} size={200} />
      </div>

      <div className="action-buttons">
        <button className="download-button" onClick={handleDownload}>
          Download Ticket
        </button>
        <button className="home-button" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default TicketPage;
