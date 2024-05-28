import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";

const API = "https://paw-some-nepal.vercel.app";

function useFavoritePet(petId) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [cookies] = useCookies(["token"]);
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    async function fetchFavourites() {
      try {
        const response = await axios.get(`${API}/petFinder/getfav`, {
          headers: {
            authorization: cookies.token,
          },
        });

        setFavourites(response?.data?.favorites);

        const isPetFavorite = response?.data?.favorites.some(
          (fav) => fav.pet._id === petId
        );
        setIsFavorite(isPetFavorite);

        return response.data;
      } catch (error) {
        console.log(error);
      }
    }

    fetchFavourites();
  }, [petId, cookies.token]);

  const handleAddToFavorites = async (id) => {
    try {
      const response = await axios.post(`${API}/petFinder/addfav/${id}`, null, {
        headers: {
          authorization: cookies.token,
        },
      });

      toast(response?.data?.message, {
        type: "success",
      });

      setIsFavorite(true);
      return response.data;
    } catch (error) {
      setIsFavorite(false);
      toast(error?.response?.data?.message, {
        type: "error",
      });
    }
  };

  return { isFavorite, handleAddToFavorites, favourites };
}

export default useFavoritePet;
