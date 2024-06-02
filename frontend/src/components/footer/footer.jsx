import React from "react";
import styles from "./footer.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>
        <div className={styles.logo_name}>
          pets<span className={styles.orange}>Nepal</span>
        </div>
        <div className={styles.logo_slogan}>Adopt a Pet, Save a Life</div>
      </div>

      <div className={styles.footer_container}>
        <div className={styles.footer_col_1}>
          <h2>About Us</h2>
          <p>
            Thank you for choosing PetsNepal to find your furry family member.
            Together, we are creating a brighter future for pets in need. Join
            us in our mission to find loving homes for every pet.
          </p>
        </div>

        <div className={styles.footer_wrapper}>
          <div className={styles.footer_col_2}>
            <h2>Address</h2>
            <p>
              <FontAwesomeIcon icon={faMapMarkerAlt} /> Kathmandu, Nepal
            </p>
            <p>
              <FontAwesomeIcon icon={faPhone} /> +1234567890
            </p>
            <p>
              <FontAwesomeIcon icon={faEnvelope} /> info@petsnepal.com
            </p>
          </div>

          <div className={styles.footer_col_3}>
            <h2>Our Services</h2>
            <Link to="/allpets">
              <p>Pets for adoption</p>
            </Link>
            <Link to="/products">
              <p>Products for pets</p>
            </Link>
            <Link to="/homestay">
              <p>Pet's homestay</p>
            </Link>
          </div>

          <div className={styles.footer_col_4}>
            <p>Sign up and track your favourite pet</p>
            <Link to="/register">
              <div className={styles.sign}>Signup Now</div>
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.footer_bottom}>
        <span>Created By PetsNepal | </span>
        <span>&copy; 2024 All rights reserved.</span>
      </div>
    </footer>
  );
}
