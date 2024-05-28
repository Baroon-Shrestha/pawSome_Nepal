import Card from "../../components/card/card";
import styles from "./favourites.module.css";
import Nav from "../../components/nav/nav";
import useFavoritePet from "../../hooks/useFavouritePets";
import NewCard from "../../components/card/NewCard";

export default function Favourites() {
  const { favourites } = useFavoritePet();

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.cards}>
          {favourites.map((item) => {
            return <NewCard pet={item.pet} key={item._id} />;
          })}
        </div>
      </div>
    </>
  );
}
