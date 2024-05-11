import styles from "./allPets.module.css";
import Nav from "../../components/nav/nav";
import Footer from "../../components/footer/footer";
import { AiOutlineSearch } from "react-icons/ai";
import NewCard from "../../components/card/NewCard";
import useFetchAllPets from "../../hooks/useFetchAllPets";
import useFavoritePet from "../../hooks/useFavouritePets";
import { ToastContainer } from "react-toastify";

export default function AllPets() {
  const {
    pets,
    filteredPets,
    selectedCategory,
    searchQuery,
    uniqueCategories,
    handleCategoryClick,
    handleSearchChange,
    loading: fetchLoading,
  } = useFetchAllPets();

  const loading = fetchLoading;

  return (
    <>
      <ToastContainer bodyclassName="toastBody" />
      <Nav />
      <div className={styles.mainContainer}>
        <div className={styles.img_container}>
          <h1 className={styles.heading}>Available Pets</h1>
        </div>
        <div className={styles.container}>
          <div className={styles.categories}>
            <h2 className={styles.smallTitle}>Pet Categories</h2>
            <div className={styles.cat}>
              <div className={styles.box_container}>
                {uniqueCategories.map((category) => (
                  <div
                    className={`${styles.box} ${
                      selectedCategory === category ? styles.selected : ""
                    }`}
                    key={category}
                    onClick={() => handleCategoryClick(category)}
                  >
                    <h2 className={styles.category}>{category}</h2>
                  </div>
                ))}
              </div>
              <div className={styles.inputContainer}>
                <input
                  type="text"
                  placeholder="Search by breed"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className={styles.searchInput}
                />
                <AiOutlineSearch size={20} className={styles.searchIcon} />
              </div>
            </div>
          </div>

          {loading ? (
            <div className={styles.loaderContainer}>
              <div className={styles.loader}></div>
            </div>
          ) : filteredPets.length === 0 ? (
            <div className={styles.noImgFoundContainer}>
              <img
                src="../no_result_found.png"
                className={styles.noImg}
                alt="No result found"
              />
              <p className={styles.noImgP}>
                No pets found matching your search criteria.
              </p>
            </div>
          ) : (
            <div className={styles.cards}>
              {filteredPets.map((pet) => (
                <NewCard pet={pet} key={pet._id} />
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
