import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./editUserProfile.module.css";
import { MdCancel } from "react-icons/md";
import { Backend_Url } from "../../../url";

function EditUserProfile({ setShowEditModal }) {
  const [cookies] = useCookies(["token"]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState("");
  const [number, setNumber] = useState(0);
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState(null);

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

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const formSubmit = async (event) => {
    event.preventDefault();

    const formDataToUpdate = new FormData();

    formDataToUpdate.append("firstname", firstName);
    formDataToUpdate.append("lastname", lastName);
    formDataToUpdate.append("number", number);
    formDataToUpdate.append("password", password);

    // Check if an image is provided
    if (image) {
      formDataToUpdate.append(`profile`, image);
    }

    try {
      setIsLoading(true);
      if (userId) {
        const response = await axios.put(
          `${Backend_Url}/petfinder/user/update/${userId}`,
          formDataToUpdate,
          {
            headers: {
              "content-type": "multipart/form-data",
              authorization: cookies.token,
            },
          }
        );
        if (response.data.success === true) {
          console.log(response.data);
          localStorage.setItem(
            "user",
            JSON.stringify(response?.data?.userToUpdate)
          );

          toast.success("Profile Updated Successfully");
          setIsLoading(false);
          setImage(null);
        }
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to update your profile");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoading) {
      document.getElementById("imageUpload").value = null;
    }
  }, [isLoading]);

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
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className={styles.inputDiv}>
              <h1 className={styles.inputTitle}>Your New Profile</h1>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                id="imageUpload"
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
