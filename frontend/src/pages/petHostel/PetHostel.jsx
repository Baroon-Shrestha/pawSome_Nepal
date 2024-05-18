import React, { useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import styles from "./PetHostel.module.css";
import Nav from "../../components/nav/nav";

function PetHostel() {
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [category, setCategory] = useState("");
  const [availability, setAvailability] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [breed, setBreed] = useState("");
  const [specialCare, setSpecialCare] = useState("");
  const [disease, setDisease] = useState("");
  const [gender, setGender] = useState("");
  const [cookies] = useCookies(["token"]);
  const [images, setImages] = useState([]);
  const [submittedData, setSubmittedData] = useState(null);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    setImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentDate = new Date();
    const fromDate = new Date(dateFrom);
    const toDate = new Date(dateTo);

    if (
      fromDate <= currentDate ||
      toDate <= currentDate ||
      toDate <= fromDate
    ) {
      setAvailability(null);
      setErrorMessage("Invalid date!");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    formData.append("age", age);
    formData.append("gender", gender);
    formData.append("breed", breed);
    formData.append("specialCare", specialCare);
    formData.append("disease", disease);
    formData.append("dateFrom", fromDate.toISOString());
    formData.append("dateTo", toDate.toISOString());

    images.forEach((image, index) => {
      formData.append(`image`, image);
    });

    try {
      const response = await axios.post(
        "http://localhost:3000/petfinder/homestay/addrequest",
        formData,
        {
          headers: {
            authorization: cookies.token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setAvailability("Submitted");
      console.log("Data submitted successfully:", response.data);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Failed to submit request. Please try again.");
      console.error("Error submitting data:", error);
    }
  };

  return (
    <>
      <div className={styles.petHostelContainer}>
        <div className={styles.petHostelBackground}></div>
        <img
          src="petimage.jpg"
          className={styles.petHostelBackground}
          alt="Pet Hostel Background"
        />
        <div className={styles.petHostelFormContainer}>
          <div className={styles.phs_title}>Book your pet's stay!</div>
          <div className={styles.phs_desc}>
            Please provide the required information:
          </div>
          <br />
          <form onSubmit={handleSubmit}>
            <div className={styles.first}>
              <label>
                Pet's Name:
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
            </div>
            <div className={styles.first}>
              <label>
                Age:
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </label>
              <label>
                Breed:
                <input
                  type="text"
                  value={breed}
                  onChange={(e) => setBreed(e.target.value)}
                />
              </label>
            </div>
            <div className={styles.first}>
              <label>
                Special Care:
                <input
                  type="text"
                  value={specialCare}
                  onChange={(e) => setSpecialCare(e.target.value)}
                />
              </label>
              <label>
                Disease:
                <input
                  type="text"
                  value={disease}
                  onChange={(e) => setDisease(e.target.value)}
                />
              </label>
            </div>
            <label>
              Gender:
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </label>
            <label>
              Check-In Date:
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
              />
            </label>
            <label>
              Check-Out Date:
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
              />
            </label>
            <label>
              Select Pet Category:
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Your Pet Category</option>
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
                <option value="Other">Other</option>
              </select>
            </label>
            <label>
              Upload Images:
              <input type="file" multiple onChange={handleImageUpload} />
            </label>
            <div className={styles.petHostelButtonContainer}>
              <button type="submit">Submit</button>
            </div>
            {errorMessage && (
              <div className={styles.petHostelErrorMessage}>{errorMessage}</div>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default PetHostel;
