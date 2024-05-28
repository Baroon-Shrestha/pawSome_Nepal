import axios from "axios";
import { useEffect, useState } from "react";

export default function useFetchPetById(id) {
  const [petInfo, setPetInfo] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:3000/petFinder/selected/${id}`)
      .then((response) => {
        setPetInfo(response?.data.getPetData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return petInfo;
}
