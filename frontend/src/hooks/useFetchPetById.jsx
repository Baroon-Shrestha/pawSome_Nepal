import axios from "axios";
import { useEffect, useState } from "react";
import { Backend_Url } from "../../url";

export default function useFetchPetById(id) {
  const [petInfo, setPetInfo] = useState({});

  useEffect(() => {
    axios
      .get(`${Backend_Url}/petFinder/selected/${id}`)
      .then((response) => {
        setPetInfo(response?.data.getPetData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return petInfo;
}
