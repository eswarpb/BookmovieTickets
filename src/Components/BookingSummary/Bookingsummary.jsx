import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import "./BookingSummary.css";

const BookingSummary = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentId, setPaymentId] = useState(null); // State to store payment ID
  const location = useLocation();
  const navigate = useNavigate();
  const {
    selectedSeats,
    totalPrice,
    convenienceFee,
    gst,
    grandTotal,
    movieName,
    theatreName,
    date,
    showtime,
  } = location.state || {};

  const handlePayment = async () => {
    const razorpayKey = process.env.REACT_APP_RAZORPAY_KEY_ID;

    if (!razorpayKey) {
      alert("Razorpay key not found in environment variables");
      return;
    }

    const options = {
      key: razorpayKey,
      amount: Math.round(grandTotal * 100),
      currency: "INR",
      name: "Movie Booking",
      description: "Enjoy your show!",
      handler: function (response) {
        // Store payment ID and show modal
        setPaymentId(response.razorpay_payment_id);
        setIsModalOpen(true);
      },
      prefill: {
        name: "Your Name",
        email: "youremail@example.com",
        contact: "1234567890",
      },
      theme: {
        color: "#F84464",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

    rzp.on("payment.failed", function (response) {
      alert(`Payment Failed: ${response.error.description}`);
    });
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    navigate("/ticket", {
      state: {
        selectedSeats,
        movieName,
        theatreName,
        date,
        showtime,
        totalPrice,
        convenienceFee,
        gst,
        grandTotal,
        paymentId, // Pass the payment ID to the ticket page
      },
    });
  };

  return (
    <div className="booking-summary">
      <h2 className="h2">Booking Summary</h2>
      <div className="summary-container">
        <div className="details-section">
          <p><strong>Movie:</strong> {movieName}</p>
          <p><strong>Theatre:</strong> {theatreName}</p>
          <p><strong>Date & Time:</strong> {date}, {showtime}</p>
          <p><strong>Selected Seats:</strong> {selectedSeats.join(", ")}</p>
          <p><strong>Base Price:</strong> ₹{totalPrice}</p>
          <p><strong>Convenience Fee:</strong> ₹{convenienceFee}</p>
          <p><strong>GST (18%):</strong> ₹{gst.toFixed(2)}</p>
          <h3>Total: ₹{grandTotal.toFixed(2)}</h3>
        </div>
        <div className="popcorn-section">
          <img
            src="https://in.bmscdn.com/fnb/v3/xxhdpi/1020007_16082018153109.png"
            alt="Popcorn"
            className="popcorn-image"
          />
          <p>Unlock the tastiest binges! Prebook your snacks and enjoy more.</p>
        </div>
      </div>
      <p>
        <button className="proceed-button" onClick={handlePayment}>
          Proceed ₹{grandTotal.toFixed(2)}
        </button>
      </p>
      <button className="back-button" onClick={() => navigate(-1)}>
        Go Back
      </button>

      {/* Modal for payment success */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleModalClose}
        contentLabel="Payment Success"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <h2>Payment Successful!</h2>
        <p>Your payment was successful.</p>
        <p>Payment ID: {paymentId}</p> {/* Display the payment ID */}
        <p>You can now view your ticket.</p>
        <div className="modal-buttons">
          <button className="modal-button" onClick={handleModalClose}>
            OK
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default BookingSummary;
