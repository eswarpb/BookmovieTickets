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
  } = location.state || {};

  if (!selectedSeats) {
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
  
    // Movie Details Section
    doc.setFontSize(12);
    doc.text(`Movie: ${movieName}`, 10, 40);
    doc.text(`Theatre: ${theatreName}`, 10, 50);
    doc.text(`Date & Time: ${date}, ${showtime}`, 10, 60);
    doc.text(`Selected Seats: ${selectedSeats.join(", ")}`, 10, 70);
    doc.text(`Convenience Fee: ₹${convenienceFee.toFixed(2)}`, 10, 80);
    doc.text(`GST: ₹${gst.toFixed(2)}`, 10, 90);
    doc.text(`Total Paid: ₹${grandTotal.toFixed(2)}`, 10, 100);
  
    // Add QR Code Image
    const qrCanvas = qrRef.current?.querySelector("canvas");
    if (qrCanvas) {
      const qrDataUrl = qrCanvas.toDataURL("image/png");
      // Positioning QR code
      doc.addImage(qrDataUrl, "PNG", 150, 40, 40, 40);
    }
  
    // Saving the PDF
    doc.save("Movie_Ticket.pdf");
  };
  
  return (
    <div className="ticket-page">
      <div className="ticket-container">
        <h2 className="ticket-header">🎫 Your Movie Ticket</h2>

        <div className="ticket-info">
          <div className="movie-details">
            <h3>{movieName}</h3>
            <p><strong>Theatre:</strong> {theatreName}</p>
            <p><strong>Date & Time:</strong> {date}, {showtime}</p>
            <p><strong>Seats:</strong> {selectedSeats.join(", ")}</p>
            <p><strong>Convenience Fee:</strong> ₹{convenienceFee.toFixed(2)}</p>
            <p><strong>GST:</strong> ₹{gst.toFixed(2)}</p>
            <p><strong>Total Paid:</strong> ₹{grandTotal.toFixed(2)}</p>
          </div>

          <div className="qr-section">
            <h4>Scan this QR Code at the Theatre</h4>
            <div ref={qrRef}>
              <QRCode value={qrData} size={120} />
            </div>
          </div>
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
    </div>
  );
};

export default TicketPage;
