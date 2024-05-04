
import Card from "../../components/card/card";
import styles from "./favourites.module.css";
import Nav from "../../components/nav/nav";
import useFavoritePet from "../../hooks/useFavouritePets";

export default function Favourites() {
 
 const {favourites} = useFavoritePet()


  return (
    <>
      <Nav />

      <div className={styles.mainContainer}>
        <div className={styles.img_container}>
          <h1 className={styles.heading}>Your Favourites</h1>
        </div>

        <div className={styles.container}>
          <div className={styles.cards}>
            {favourites.map((item) => {
              return <Card pet={item.pet} key={item._id} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}
