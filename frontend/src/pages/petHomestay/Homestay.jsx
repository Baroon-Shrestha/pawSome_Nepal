import React, { useState } from "react";
import PetHostel from "../petHostel/PetHostel";
import Nav from "../../components/nav/nav";
import "./Homestay.css";

export default function Homestay() {
  const [showModal, setShowModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const toggleModal = () => {
    if (showModal && showConfirmation) {
      // If modal is open and confirmation is shown, close modal and reset confirmation
      setShowModal(false);
      setShowConfirmation(false);
    } else {
      setShowModal(!showModal);
    }
  };

  const handleConfirmClose = () => {
    // Show confirmation message and close modal
    setShowConfirmation(true);
  };

  const handleCloseModal = () => {
    // Close modal without confirmation
    setShowModal(false);
    setShowConfirmation(false);
  };

  return (
    <>
      <Nav />
      <div>Leave your pet in a home-like environment</div>
      <button onClick={toggleModal}>
        Fill the form to leave your pet in your absence
      </button>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <PetHostel />
            {showConfirmation ? (
              <div className="confirmation-message">
                Are you sure you want to close the form? Your data will be lost.{" "}
                <br />
                <button onClick={handleCloseModal}>Yes, Close</button>
              </div>
            ) : (
              <button className="close-btn" onClick={handleConfirmClose}>
                Close
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
