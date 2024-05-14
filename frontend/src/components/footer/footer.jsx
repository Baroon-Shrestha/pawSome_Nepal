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
    <>
      <footer className={styles.module}>
        <h1 className={styles.logo}>
          <div className={styles.logo_name}>pet finder</div>
          <div className={styles.logo_slogan}>Save a Life, Adopt a Pet</div>
        </h1>
        <div className={styles.footer_container}>
          <div className={styles.footer_col_1}>
            <h2>About Us</h2>
            <p>
              Thank you for choosing PetsNepal to find your furry family member.
              Together, we are creating a brighter future for pets in need. Join
              us in our mission to find loving homes for every pet.
            </p>

            <div className={styles.additional_info}></div>
          </div>

          <div className={styles.footer_wrapper}>
            <div className={styles.footer_col_2}>
              <h2>Address</h2>
              <p>
                <FontAwesomeIcon icon={faMapMarkerAlt} /> Address: Kathmandu,
                Nepal
              </p>
              <p>
                <FontAwesomeIcon icon={faPhone} /> Phone: +1234567890
              </p>
              <p>
                <FontAwesomeIcon icon={faEnvelope} /> Email: info@petsnepal.com
              </p>
            </div>

            <div className={styles.footer_col_3}>
              <h2>Contact Us</h2>
              <div className="content">
                <form action="#">
                  <div className="email">
                    <div className="text">Email *</div>
                    <input type="email" required />
                  </div>
                  <div className="msg">
                    <div className="text">Message *</div>
                    <textarea rows="2" cols="25" required></textarea>
                  </div>
                  <div className="btn">
                    <button type="submit">Send</button>
                  </div>
                </form>
              </div>
            </div>

            <div className={styles.footer_col_4}>
              <p>
                Save favorite pets <br />&<br /> track their adoption status
              </p>
              <Link to="/register">
                <button className={styles.btn}>Sign Up Now👋</button>
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.footer_bottom}>
          <span className="credit">Created By PetsNepal | </span>
          <span className="far fa-copyright"></span>
          <span> 2024 All rights reserved.</span>
        </div>
      </footer>
    </>
  );
}
