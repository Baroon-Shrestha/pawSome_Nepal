import "./newPetDescription.scss";
import Nav from "../../components/nav/nav";
import NewCard from "../../components/card/NewCard";
import useFetchAllPets from "../../hooks/useFetchAllPets";
import useFetchPetById from "../../hooks/useFetchPetById";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { IoMdFemale, IoIosMale } from "react-icons/io";
import { MdOutlinePets, MdNumbers } from "react-icons/md";
import { BiCategory } from "react-icons/bi";

export default function NewPetDescription() {
  const { pets } = useFetchAllPets();
  const { id } = useParams();
  const petInfo = useFetchPetById(id);

  return (
    <>
      <Nav />
      <div className="newPetDescription_section">
        <div className="background">
          <h1 className="bg_title">{petInfo?.name}</h1>
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
                    <h2>Age</h2>
                    <h1>{petInfo?.age}</h1>
                  </div>
                </div>
              </div>
            </div>

            <div className="bottom_container">
              <h2>About {petInfo?.name}</h2>
              <p>{petInfo?.description}</p>

              <Link to={`/adoptPet/${petInfo._id}`}>
                <button className="btn">Adopt {petInfo?.name}</button>
              </Link>
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
                {pets.map((pet) => {
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
