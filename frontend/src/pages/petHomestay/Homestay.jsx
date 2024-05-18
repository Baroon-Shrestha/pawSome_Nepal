import React, { useState } from "react";
import PetHostel from "../petHostel/PetHostel";
import Nav from "../../components/nav/nav";
import "./Homestay.css";

export default function Homestay() {
  const [showModal, setShowModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const toggleModal = () => {
    if (showModal && showConfirmation) {
      setShowModal(false);
      setShowConfirmation(false);
    } else {
      setShowModal(!showModal);
    }
  };

  const handleConfirmClose = () => {
    setShowConfirmation(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setShowConfirmation(false);
  };

  return (
    <>
      <Nav />
      <div className="ps-title">Leave your pet in a home-like environment</div>
      <div className="ps-req">
        <div className="ps-req-title">Your Requests</div>
        <div className="ps-req-btn">
          <button className="ps-btn-text" onClick={toggleModal}>
            Send Request
          </button>
        </div>
      </div>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-content">
              <PetHostel />
            </div>
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
