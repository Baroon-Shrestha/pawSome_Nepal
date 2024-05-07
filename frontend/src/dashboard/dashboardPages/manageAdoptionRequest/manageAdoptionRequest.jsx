import { useEffect, useState } from "react";
import "./manageAdoptionRequest.scss"
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Sidebar } from "../../dashboardComponents/dashboardNav/newDash";

export default function ManageAdoptionRequest() {

    const [petRequests, setPetRequests] = useState([])

    useEffect(() => {
        console.log("hello")
        petRequests?.pet?.image?.map((data) => {
            console.log("asdasdasd")
            console.log("heyyyyyyyy", data);
        });
    }, [petRequests]);



    useEffect(() => {
        axios
            .get("http://localhost:3000/petFinder/adopt/viewadoptionrequest")
            .then(function (response) {

                setPetRequests(response?.data?.viewReq);


            })
            .catch(function (error) {
                console.log(error);
            });


    }, []);



    console.log(petRequests)


    



    return (
        <>
        <Sidebar/>
            <div className="managePetAdoptionRequest_Section">
           
                <div className="container">
                <h1>User Who Wants To Adopt These Pets!</h1>
                    <div className="posts">
                        {
                            petRequests?.map((data) => {
                                return (
                                    <>
                                        <div className="post">
                                            <div className="top">
                                                <img src={data?.user?.profile[0]?.url} className="user_profile" />


                                                <div className="user_info">
                                                    <h1>{data?.user?.firstname}</h1>
                                                   <p>{data?.user?.number}</p>

                                                </div>
                                            </div>
                                            <Carousel  showThumbs = {false} >


                                                
                                                    {
                                                        data?.pet?.image?.map((imgs)=>{
                                                           return <img src={imgs?.url} className="post_img" />
                                                        })
                                                    }



                                                   

                                                

                                            </Carousel>




                                            <div className="options">
                                                <div className="option">
                                                    <p>Approve</p>
                                                </div>
                                                <div className="option">
                                                    <p>Disaprove</p>
                                                </div>

                                                <div className="option">
                                                    <p>Message</p>
                                                </div>

                                            </div>

                                            <div className="caption">
                                                <p><span className="bold">Reason : </span>{data?.reason}</p>
                                            </div>

                                        </div>
                                    </>
                                )

                            })
                        }















                    </div>

                </div>
            </div>
        </>
    )
}