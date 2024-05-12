import { Link } from "react-router-dom";
import "./petshop.css";

export default function Petshop() {
  return (
    <>
      <div className="offer">
        <div className="off-img">
          <img src="./product.gif" alt="" />
        </div>
        <div className="off-title">Special Offer</div>
        <div className="off-sec-title">
          Get special discount on our opening ceremony
        </div>
        <div className="off-desc">
          Explore our curated collection of pet products designed to delight
          your furry friend. From cozy beds to interactive toys, we have
          everything to keep tails wagging and purrs going strong. Discover
          quality, style, and functionality for your beloved companion.
        </div>
        <Link to="/products">
          <div className="off-btn">Shop Now</div>
        </Link>
      </div>
    </>
  );
}
