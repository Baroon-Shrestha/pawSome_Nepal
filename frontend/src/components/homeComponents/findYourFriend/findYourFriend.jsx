import "./style.scss";

export default function FindYourFriend() {
  //   const {
  //     filteredPets,
  //     selectedCategory,
  //     uniqueCategories,
  //     handleCategoryClick,
  //     handleSearchChange,
  //     loading: fetchLoading,
  //   } = useFetchAllPets();
  return (
    <>
      <section className="find_your_friend_section">
        <div className="section_container">
          <div className="heading">
            <h1>Find Your Friend</h1>
            <p>select the categories</p>
          </div>

          <div className="cards">
            <div className="card">
              <div className="img_container light_pink">
                <img src="./cat_no_bg.png" />
              </div>
              <div className="card_description ">
                <h2>Cats</h2>
              </div>
            </div>

            <div className="card">
              <div className="img_container orange">
                <img src="https://i.pinimg.com/originals/23/2c/19/232c19ca0e7235277fc0fac1ced9eb68.png" />
              </div>
              <div className="card_description">
                <h2>Dogs</h2>
              </div>
            </div>

            <div className="card">
              <div className="img_container pink">
                <img src="./others.png" />
              </div>
              <div className="card_description">
                <h2>Others</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
