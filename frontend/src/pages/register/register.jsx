import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Nav from "../../components/nav/nav";
import styles from "./register.module.css";
import { Backend_Url } from "../../../url";

function useFormInput(initialValue, validator) {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
    setError(validator(e.target.value));
  };

  return { value, onChange: handleChange, error };
}

function Register() {
  const firstname = useFormInput("", (value) =>
    value ? "" : "Please enter your first name."
  );
  const lastname = useFormInput("", (value) =>
    value ? "" : "Please enter your last name."
  );

  const number = useFormInput("", (value) => {
    if (!value) return "Please enter your phone number.";
    if (!/^\d{10}$/.test(value)) return "Please enter a valid phone number.";
    return "";
  });

  const email = useFormInput("", (value) =>
    value ? "" : "Please enter your email."
  );
  const password = useFormInput("", (value) =>
    value ? "" : "Please enter your password."
  );
  const confirmPassword = useFormInput("", (value) =>
    value === password.value ? "" : "Passwords do not match."
  );

  const [__, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  function formSubmit(e) {
    e.preventDefault();

    if (
      firstname.error ||
      lastname.error ||
      number.error ||
      email.error ||
      password.error ||
      confirmPassword.error
    ) {
      return;
    }

    const formData = {
      firstname: firstname.value,
      lastname: lastname.value,
      number: number.value,
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
    };

    axios
      .post(`${Backend_Url}/petfinder/user/register`, formData)
      .then((response) => {
        const token = response?.data?.jwtToken;
        const user = response?.data?.user;

        setCookie("token", token, {
          path: "/", // Set path to root to make it valid for all paths
          sameSite: "None", // Set SameSite attribute to None for cross-origin requests
          secure: true, // Ensure that cookie is only sent over HTTPS
        });

        localStorage.setItem("user", JSON.stringify(user));
        navigate("/");
      })
      .catch((error) => {
        toast(error?.response?.data?.message, {
          type: "error",
        });
      });
  }

  return (
    <>
      <Nav />
      <div className={styles.formSection}>
        <div className={styles.myFormContainer}>
          <img src="/reg.gif" className={styles.gif} alt="Register GIF" />
          <form id="myForm" className={styles.myForm} onSubmit={formSubmit}>
            <ToastContainer bodyClassName="toastBody" />
            <p className={styles.message}>Hey there! Want to Register?</p>
            <div className={styles.formPadding}>
              <div className={styles.inputDiv}>
                <input
                  type="text"
                  placeholder="Your First Name"
                  {...firstname}
                  autoComplete="off"
                  required
                />
              </div>
              {firstname.error && (
                <p className={styles.error}>{firstname.error}</p>
              )}
              <div className={styles.inputDiv}>
                <input
                  type="text"
                  placeholder="Your Last Name"
                  {...lastname}
                  autoComplete="off"
                  required
                />
              </div>
              {lastname.error && (
                <p className={styles.error}>{lastname.error}</p>
              )}
              <div className={styles.inputDiv}>
                <input
                  type="number"
                  placeholder="Your Phone Number"
                  maxLength="10"
                  {...number}
                  autoComplete="off"
                  required
                />
              </div>
              {number.error && <p className={styles.error}>{number.error}</p>}
              <div className={styles.inputDiv}>
                <input
                  type="email"
                  placeholder="Your Email"
                  {...email}
                  autoComplete="off"
                  required
                />
              </div>
              {email.error && <p className={styles.error}>{email.error}</p>}
              <div className={styles.inputDiv}>
                <input
                  type="password"
                  placeholder="Your Password"
                  {...password}
                  autoComplete="off"
                  required
                />
              </div>
              {password.error && (
                <p className={styles.error}>{password.error}</p>
              )}
              <div className={styles.inputDiv}>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  {...confirmPassword}
                  autoComplete="off"
                  required
                />
              </div>
              {confirmPassword.error && (
                <p className={styles.error}>{confirmPassword.error}</p>
              )}
            </div>
            <div className={styles.btnDiv}>
              <button
                className={`${styles.btn} ${styles.btnSend}`}
                type="submit"
                id="submit_btn"
              >
                Register
              </button>
            </div>
            <p className={styles.signInMessage}>
              Already Have An Account ? <Link to="/login">Sign In</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
