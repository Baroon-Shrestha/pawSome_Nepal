import "./newPetDescription.scss";
import Nav from "../../components/nav/nav";
import NewCard from "../../components/card/NewCard";
import useFetchAllPets from "../../hooks/useFetchAllPets";
import useFetchPetById from "../../hooks/useFetchPetById";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { IoMdFemale, IoIosMale } from "react-icons/io";
import { MdOutlinePets, MdNumbers, MdOutlineVaccines } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import _ from "lodash";

export default function NewPetDescription() {
  const { pets } = useFetchAllPets();
  const { id } = useParams();
  const petInfo = useFetchPetById(id);

  const randomUniquePets = getRandomUniquePets(pets, 3);

  return (
    <>
      <Nav />
      <div className="newPetDescription_section">
        <div className="background">
          <div className="bg_title">{petInfo?.name}</div>
        </div>
        <div className="container">
          <div className="container_top">
            <div className="top_container">
              <div className="cards">
                <div className="card">
                  <div className="left">
                    <h2>
                      <MdOutlinePets size={32} />
                    </h2>
                  </div>

                  <div className="right">
                    <h2>Breed</h2>
                    <h1>{petInfo?.breed}</h1>
                  </div>
                </div>

                <div className="card">
                  <div className="left">
                    <h2>
                      <BiCategory size={32} />
                    </h2>
                  </div>

                  <div className="right">
                    <h2>Category</h2>
                    <h1>{petInfo?.category}</h1>
                  </div>
                </div>

                <div className="card">
                  <div className="left">
                    <h2>
                      {petInfo?.gender == "Male" ? (
                        <IoIosMale size={32} />
                      ) : (
                        <IoMdFemale size={32} />
                      )}
                    </h2>
                  </div>

                  <div className="right">
                    <h2>Gender</h2>
                    <h1>{petInfo?.gender}</h1>
                  </div>
                </div>

                <div className="card">
                  <div className="left">
                    <h2>
                      <MdNumbers size={32} />
                    </h2>
                  </div>

                  <div className="right">
                    <h2>Age (In Months)</h2>
                    <h1>{petInfo?.age} </h1>
                  </div>
                </div>
                <div className="card">
                  <div className="left">
                    <h2>
                      <MdOutlineVaccines size={32} />
                    </h2>
                  </div>

                  <div className="right">
                    <h2>Vaccination Status</h2>
                    <h1>{petInfo?.vaccination} </h1>
                  </div>
                </div>
              </div>
            </div>

            <div className="bottom_container">
              <h1>About {petInfo?.name}</h1>
              <p>{petInfo?.description}</p>

              <div className="btn-container">
                <Link to={`/adoptPet/${petInfo._id}`}>
                  <button className="btn">
                    Adopt {petInfo?.name} as you new furry companion
                  </button>
                </Link>
              </div>
            </div>

            <div className="img_container">
              {petInfo?.image?.map((imgs) => {
                return <img src={imgs?.url} className="img"></img>;
              })}
            </div>
          </div>

          <div className="container_bottom">
            <h1>You may also like</h1>
            <div className="more_img_container">
              <div className="cards">
                {/* Display random and unique pet cards */}
                {randomUniquePets.map((pet) => {
                  return <NewCard pet={pet} key={pet._id} />;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function getRandomUniquePets(pets, count) {
  // Shuffle the pets array
  const shuffledPets = _.shuffle(pets);
  // Get a slice of the shuffled array with the required count
  const randomPets = shuffledPets.slice(0, count);
  // Filter out any duplicate pets
  const uniquePets = _.uniqBy(randomPets, "_id");
  return uniquePets;
}
