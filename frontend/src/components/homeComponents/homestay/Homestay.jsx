import React from "react";
import "./Homestay.css";
import { Link } from "react-router-dom";

export default function Homestay() {
  return (
    <>
      <div className="hs-container">
        <div className="hs-title">
          a home like environemnt for
          <br /> your pets
        </div>
        <div className="hs-desc">
          Discover our exceptional pet homestay, designed to make your furry
          friends feel right at home. With cozy resting areas, engaging play
          zones, and personalized care, we ensure every pet enjoys a comfortable
          and fun stay. Experience peace of mind knowing your beloved companion
          is in a loving, safe, and nurturing environment. Welcome to the
          perfect retreat for your pets.
        </div>
        <Link to="/homestay">
          <div className="hs-btn">
            Book a place for you pet's stay in your absence
          </div>
        </Link>
      </div>
    </>
  );
}
