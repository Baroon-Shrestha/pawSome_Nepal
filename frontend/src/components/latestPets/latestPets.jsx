import styles from "./latestPets.module.css";
import Card from "../card/card";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import NewCard from "../../components/card/NewCard";
import { Backend_Url } from "../../../url";

export default function LatestPets() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    axios
      .get(`${Backend_Url}/petFinder/get`) // Using the API variable here
      .then(function (response) {
        setPets(response.data.getallpets);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className={styles.main_container}>
        <div className={styles.container}>
          <h1>Our Latest Pets</h1>
          <div className={styles.grid}>
            {pets.slice(0, 3).map((pet, index) => {
              return <NewCard pet={pet} key={index} />;
            })}
          </div>
          <div className={styles.btn_container}>
            <Link to="/allPets">
              <button className={styles.btn}>View All Pets</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
