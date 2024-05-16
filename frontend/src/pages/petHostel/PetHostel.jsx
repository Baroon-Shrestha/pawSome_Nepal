import React, { useState } from "react";
import styles from "./PetHostel.module.css";
import Nav from "../../components/nav/nav";

function PetHostel() {
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [petType, setPetType] = useState("");
  const [deliveryOption, setDeliveryOption] = useState("");
  const [availability, setAvailability] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [age, setAge] = useState("");
  const [breed, setBreed] = useState("");
  const [specialCare, setSpecialCare] = useState("");
  const [disease, setDisease] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const currentDate = new Date();
    const checkInDateTime = new Date(checkInDate);
    const checkOutDateTime = new Date(checkOutDate);

    if (
      checkInDateTime <= currentDate ||
      checkOutDateTime <= currentDate ||
      checkOutDateTime <= checkInDateTime
    ) {
      setAvailability(null);
      setErrorMessage("Invalid date!");
      return;
    }

    setAvailability("Submitted");
    setErrorMessage("");
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
              <label>
                Category:
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </label>
            </div>
            <div className={styles.first}>
              {" "}
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
              {" "}
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
              Check-In Date:
              <input
                type="date"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
              />
            </label>
            <label>
              Check-Out Date:
              <input
                type="date"
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
              />
            </label>
            <label>
              Select Pet Type:
              <select
                value={petType}
                onChange={(e) => setPetType(e.target.value)}
              >
                <option value="">Select Your Pet Type</option>
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
                <option value="Other">Other</option>
              </select>
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
