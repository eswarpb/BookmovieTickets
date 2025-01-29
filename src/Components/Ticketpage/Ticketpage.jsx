import React, { useRef } from "react";
import QRCode from "react-qr-code";
import { useLocation, useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import "./TicketPage.css"

const TicketPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const ticketRef = useRef();

  const {
    selectedSeats,
    movieName,
    theatreName,
    date,
    showtime,
    convenienceFee,
    gst,
    grandTotal,
  } = location.state || {};

  if (!selectedSeats.length) {
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

  const handleDownload = async () => {
    const buttons = document.querySelector(".action-buttons");
    buttons.style.display = "none";
  
    // Capture the ticket as an image
    const canvas = await html2canvas(ticketRef.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    buttons.style.display = "flex";
    const doc = new jsPDF("p", "mm", "a4");
    doc.addImage(imgData, "PNG", 40, 20, 140, 170);
    doc.save("Movie_Ticket.pdf");
  };
  
  return (
    <div className="ticket-page">
      <div className="ticket-container" ref={ticketRef}>
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
            <QRCode value={qrData} size={120} />
          </div>
        </div>
        <div className="action-buttons no-print">
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