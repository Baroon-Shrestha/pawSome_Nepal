import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./editUserProfile.module.css";
import { MdCancel } from "react-icons/md";

function EditUserProfile({ setShowEditModal }) {
  const [cookies] = useCookies(["token"]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [images, setImages] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState("");
  const [number, setNumber] = useState(0);
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState(null);

  console.log(userId);

  //getting the user information
  useEffect(() => {
    const userFromLocalStorage = JSON.parse(localStorage.getItem("user"));
    const tokenFromCookies = cookies.token;

    if (userFromLocalStorage && tokenFromCookies) {
      setLoggedInUser(userFromLocalStorage);
    }
  }, [cookies.token]);

  useEffect(() => {
    if (loggedInUser) {
      setFirstName(loggedInUser.firstname);
      setLastName(loggedInUser.lastname);
      setNumber(loggedInUser.number);
      setUserId(loggedInUser._id);
    }
  }, [loggedInUser]);

  console.log(loggedInUser);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImages([file]);
  };

  const formSubmit = async (event) => {
    event.preventDefault();

    const formDataToUpdate = new FormData();

    formDataToUpdate.append("firstname", firstName);
    formDataToUpdate.append("lastname", lastName);
    formDataToUpdate.append("number", number);
    formDataToUpdate.append("password", password);

    formDataToUpdate.append(`profile`, images);

    try {
      setIsLoading(true);
      if (userId) {
        const response = await axios.put(
          `http://localhost:3000/petfinder/user/update/${userId}`,
          formDataToUpdate,
          {
            headers: {
              authorization: cookies.token,
            },
          }
        );
        if (response.data.success === true) {
          toast.success("Profile Updated Sucessfully");
          setIsLoading(false);
        }
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to update your profile");
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className={styles.formSection}>
        <form id="myForm" className={styles.myForm} onSubmit={formSubmit}>
          <MdCancel
            className={styles.icon}
            onClick={() => setShowEditModal(false)}
          />
          <ToastContainer bodyclassName="toastBody" />
          <img src="/dribbblepets_v01.gif" className={styles.gif} />
          <p className={styles.message}>Update Profile</p>
          <div className={styles.formPadding}>
            <div className={styles.inputDiv}>
              <input
                type="text"
                placeholder="First Name"
                name="name"
                defaultValue={firstName}
                autoComplete="off"
                required
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className={styles.inputDiv}>
              <input
                type="text"
                placeholder="Last Name"
                name="lastname"
                defaultValue={lastName}
                autoComplete="off"
                required
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div className={styles.inputDiv}>
              <input
                type="number"
                placeholder="Number"
                name="number"
                value={number}
                autoComplete="off"
                required
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>

            <div className={styles.inputDiv}>
              <input
                type="password"
                placeholder="New Password"
                name="breed"
                value={password}
                autoComplete="off"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className={styles.inputDiv}>
              <h1 className={styles.inputTitle}>Your New Profile</h1>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>
          </div>
          <div className={styles.btnDiv}>
            <button
              className={`${styles.btn} ${styles.btnSend}`}
              type="submit"
              id="submit_btn"
            >
              {isLoading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditUserProfile;
