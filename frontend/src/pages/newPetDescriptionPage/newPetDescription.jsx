import "./newPetDescription.scss"
import Nav from "../../components/nav/nav"
import NewCard from "../../components/card/NewCard";
import useFetchAllPets from "../../hooks/useFetchAllPets";
import useFetchPetById from "../../hooks/useFetchPetById";
import { useParams } from "react-router-dom";

export default function NewPetDescription() {
  const {pets} = useFetchAllPets()
  const {id} = useParams()
  const petInfo = useFetchPetById(id)

 

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
                                        <h2>Icon</h2>
                                    </div>

                                    <div className="right">
                                        <h1>Breed</h1>
                                        <p>{petInfo?.breed}</p>
                                    </div>
                                </div>

                                <div className="card">
                                    <div className="left">
                                        <h2>Icon</h2>
                                    </div>

                                    <div className="right">
                                        <h1>Category</h1>
                                        <p>{petInfo?.category}</p>
                                    </div>
                                </div>

                                <div className="card">
                                    <div className="left">
                                        <h2>Icon</h2>
                                    </div>

                                    <div className="right">
                                        <h1>Gender</h1>
                                        <p>{petInfo?.gender}</p>
                                    </div>
                                </div>

                                <div className="card">
                                    <div className="left">
                                        <h2>Icon</h2>
                                    </div>

                                    <div className="right">
                                        <h1>Age</h1>
                                        <p>{petInfo?.age}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bottom_container">
                            <h2>About {petInfo?.name}</h2>
                            <p>{petInfo.description}</p>
                        </div>

                        <div className="img_container">
                            {
                                petInfo?.image?.map((imgs)=>{
                                  return  <img src={imgs?.url} className="img"></img>
                                })
                            }

                            
                            
                          
                        </div>
                    </div>

                    <div className="container_bottom">
                        <h1>You may also like</h1>
                        <div className="more_img_container">
                            <div className= "cards">
                                {pets.map((pet) => {
                                    return <NewCard pet={pet} key={pet._id} />;
                                })}
                            </div>
                        </div>
                    </div>




                </div>
            </div>
        </>
    )
}