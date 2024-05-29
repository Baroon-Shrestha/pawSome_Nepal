import React, { useState, useEffect } from "react";
import PetHostel from "../petHostel/PetHostel";
import Nav from "../../components/nav/nav";
import "./Homestay.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import axios from "axios";
import { useCookies } from "react-cookie";
import Footer from "../../components/footer/footer";
import { Backend_Url } from "../../../url";
import { FaTrash } from "react-icons/fa";

export default function Homestay() {
  const [showModal, setShowModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [homestayRequests, setHomestayRequests] = useState([]);
  const [cookies, __] = useCookies(["token"]);

  useEffect(() => {
    const fetchHomestayRequests = async () => {
      try {
        const res = await axios.get(
          `${Backend_Url}/petfinder/homestay/myrequest`,
          {
            headers: {
              authorization: cookies.token,
            },
          }
        );
        if (res.data.success) {
          setHomestayRequests(res.data.homestayRequest);
        }
      } catch (error) {
        console.error("Error fetching homestay requests:", error);
      }
    };

    fetchHomestayRequests();
  }, [cookies.token]);

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

  const handleDeleteRequest = async (id) => {
    try {
      const res = await axios.delete(
        `${Backend_Url}/petfinder/homestay/delete/${id}`,
        {
          headers: {
            authorization: cookies.token,
          },
        }
      );
      if (res.data.success) {
        setHomestayRequests((prevRequests) =>
          prevRequests.filter((request) => request._id !== id)
        );
      }
    } catch (error) {
      console.error("Error deleting homestay request:", error);
    }
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
      <div className="hss-container">
        <div className="adoptionRequest_section">
          <div className="posts">
            {homestayRequests.map((request, index) => (
              <div className={`post post-${index}`} key={request._id}>
                <div className="top">
                  <div className="left">
                    <img
                      src={request.user.profile[0].url}
                      className="user_profile"
                      alt={`${request.user.firstname} ${request.user.lastname} Profile`}
                    />
                    <div className="user_info">
                      <h1>{request.name}</h1>
                    </div>
                  </div>
                  <p
                    className={`status ${
                      request.status === "Accepted"
                        ? "hs-status_accepted"
                        : "hs-status_pending"
                    }`}
                  >
                    {request.status}
                  </p>
                </div>
                <Carousel showThumbs={false}>
                  {request.image.map((img, i) => (
                    <div className="img-container" key={img.public_id}>
                      <img
                        src={img.url}
                        className={`post_img post_img-${i}`}
                        alt={`${request.name} Image`}
                      />
                      <FaTrash
                        className="delete-btn"
                        onClick={() => handleDeleteRequest(request._id)}
                        title="Delete Request"
                      />
                    </div>
                  ))}
                </Carousel>
                <div className="caption">
                  <p>
                    <span className="bold">Special care: </span>
                    {request.specialCare}
                  </p>
                  <p>
                    <span className="bold">Disease: </span>
                    {request.disease}
                  </p>
                  <p>
                    <span className="bold">Date from: </span>
                    {new Date(request.dateFrom).toLocaleDateString()}
                  </p>
                  <p>
                    <span className="bold">Date to: </span>
                    {new Date(request.dateTo).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
