import "./newPetDescription.scss"
import Nav from "../../components/nav/nav"
import NewCard from "../../components/card/NewCard";
import { useEffect, useState } from "react";
import axios from "axios";
export default function NewPetDescription() {
    const [pets, setPets] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:3000/petFinder/get")
            .then(function (response) {
                setPets(response.data.getallpets);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    return (
        <>
            <Nav />
            <div className="newPetDescription_section">
                <div className="background">
                    <h1 className="bg_title">Roger</h1>
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
                                        <p>Golder Retriver</p>
                                    </div>
                                </div>

                                <div className="card">
                                    <div className="left">
                                        <h2>Icon</h2>
                                    </div>

                                    <div className="right">
                                        <h1>Breed</h1>
                                        <p>Golder Retriver</p>
                                    </div>
                                </div>

                                <div className="card">
                                    <div className="left">
                                        <h2>Icon</h2>
                                    </div>

                                    <div className="right">
                                        <h1>Breed</h1>
                                        <p>Golder Retriver</p>
                                    </div>
                                </div>

                                <div className="card">
                                    <div className="left">
                                        <h2>Icon</h2>
                                    </div>

                                    <div className="right">
                                        <h1>Breed</h1>
                                        <p>Golder Retriver</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bottom_container">
                            <h2>About Roger</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum corporis earum nesciunt libero hic tenetur obcaecati odit commodi labore nihil. Tempore eius neque quasi necessitatibus totam alias beatae itaque laborum pariatur! Consequuntur assumenda eligendi laudantium rerum, perferendis explicabo saepe. Amet labore laboriosam voluptates at, sit vero consequatur quis facilis excepturi blanditiis sint aut laborum non, dolor eum? Odit sint quos accusamus porro nobis quod magnam quis, reprehenderit impedit ullam. Mollitia, repudiandae a. Maiores aliquam nisi recusandae incidunt. Delectus fugiat itaque facilis atque, voluptates alias provident repudiandae. Accusantium officia cupiditate qui et eligendi ab. Ratione, ea dolor iusto labore deserunt animi.</p>
                        </div>

                        <div className="img_container">
                            <img src="../cat1.jpg" className="img"></img>
                            <img src="../cober.jpg" className="img"></img>
                            <img src="../cat1.jpg" className="img"></img>
                            <img src="../cober.jpg" className="img"></img>
                            <img src="../cat1.jpg" className="img"></img>
                            <img src="../cober.jpg" className="img"></img>
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