import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./login.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCookies } from "react-cookie";
import Nav from "../../components/nav/nav";
import { Backend_Url } from "../../../url";

const useFormInput = (initialValue, validator) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
    setError(validator(e.target.value));
  };

  return {
    value,
    onChange: handleChange,
    error,
    setError,
  };
};

export default function Register() {
  const email = useFormInput("", (value) => {
    if (!value) return "Please enter your email.";
    if (!/\S+@\S+\.\S+/.test(value)) return "Invalid email format.";
    return "";
  });

  const password = useFormInput("", (value) => {
    if (!value) return "Please enter your password.";
    return "";
  });

  const [__, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  function formSubmit(e) {
    e.preventDefault();

    if (email.error || password.error) return;

    const postData = {
      email: email.value,
      password: password.value,
    };

    axios
      .post(`${Backend_Url}/petFinder/user/login`, postData)
      .then((response) => {
        const token = response?.data?.jwtToken;
        const user = response?.data?.user;
        setCookie("token", token, {
          path: "/",
          sameSite: "None",
          secure: true,
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
      <ToastContainer bodyClassName="toastBody" />
      <div className={styles.formSection}>
        <div className={styles.myFormContainer}>
          <img src="/new.GIF" className={styles.gif} alt="Login GIF" />
          <form id="myForm" className={styles.myForm} onSubmit={formSubmit}>
            <p className={styles.message}>Hey there! Welcome Back</p>
            <div className={styles.formPadding}>
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
            </div>
            <div className={styles.btnDiv}>
              <button
                className={`${styles.btn} ${styles.btnSend}`}
                type="submit"
                id="submit_btn"
              >
                Login
              </button>
            </div>
            <p className={styles.signInMessage}>
              Don't Have An Account? <Link to="/register">Sign up now!</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
