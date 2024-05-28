import axios from "axios";
import { useEffect, useState } from "react";

const API = "https://paw-some-nepal.vercel.app";

export default function useFetchPetById(id) {
  const [petInfo, setPetInfo] = useState({});

  useEffect(() => {
    axios
      .get(`${API}0/petFinder/selected/${id}`)
      .then((response) => {
        setPetInfo(response?.data.getPetData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return petInfo;
}
