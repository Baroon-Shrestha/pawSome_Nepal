
import { useEffect, useState } from "react";
import styles from "./new.module.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Link } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import useFavoritePet from "../../hooks/useFavouritePets";
import { FaHeart } from "react-icons/fa";

export default function NewCard({ pet }) {
  const [img, setImg] = useState(null);
  const { isFavorite, handleAddToFavorites } = useFavoritePet(pet._id);

  useEffect(() => {
    const image = new Image();
    image.src = pet?.image[0]?.url;
    image.onload = () => {
      setImg(image);
    };
  }, [pet]);

  
  return (
    <div className={styles.card} key={pet?._id}>
      {img === null ? (
        <div className={styles.skeletonLoading}></div>
      ) : (
        <>
          <button
            className={styles.fav}
            onClick={() => handleAddToFavorites(pet?._id)}
          >
            {isFavorite ? <FaHeart /> : <AiOutlineHeart />}
          </button>

          <Link
            to={`/newPetDescription/${pet?._id}`}
            onClick={() => window.scrollTo(0, 0)}
          >
            {
              <img
                src={img.src}
                className={styles.card_img}
                alt={pet?.name}
              />
            }
          </Link>
        </>
      )}

      <div className={styles.description_container}>
        <div className={styles.description_one}>
          <h2 className={styles.name}>{pet?.name}</h2>

          <h2 className={styles.name}>{pet?.breed}</h2>
        </div>

        <div className={styles.description_two}>
          <p>
            <span>{pet?.age}</span> Months
          </p>
          <p className={styles.gender}>{pet?.gender}</p>
        </div>
        <div className={styles.btn}>Adopt</div>
      </div>
    </div>
  );
}
