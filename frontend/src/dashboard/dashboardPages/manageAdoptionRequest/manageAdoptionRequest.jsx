// 
// http://localhost:3000/petFinder/adopt/viewadoptionrequest

import { useEffect, useState } from "react";
import "./manageAdoptionRequest.scss"
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Sidebar } from "../../dashboardComponents/dashboardNav/newDash";
import { useCookies } from "react-cookie";

export default function ManageAdoptionRequest() {

    const [petRequests, setPetRequests] = useState([]);
    const [cookies] = useCookies(["token"]);
    const [status, setStatus] = useState("Pending");

    
    const handleStatusChange = (id, newStatus) => {
        axios.put(`http://localhost:3000/petFinder/adopt/update/${id}`, { status: newStatus }, {
            headers: {
                authorization: cookies.token,
            },
        })
        .then(function (response) {
            // Handle success, maybe update UI
            console.log(response.data);
        })
        .catch(function (error) {
            // Handle error
            console.log(error);
        });
    };

    useEffect(() => {
        axios.get("http://localhost:3000/petFinder/adopt/viewadoptionrequest", {
            headers: {
                authorization: cookies.token,
            },
        })
        .then(function (response) {
            setPetRequests(response?.data?.viewReq);
        })
        .catch(function (error) {
            console.log(error);
        });
    }, []);

    return (
        <>
            <Sidebar />
            <div className="managePetAdoptionRequest_Section">
                <div className="container">
                    <h1>User Who Wants To Adopt These Pets!</h1>
                    <div className="posts">
                        {petRequests?.map((data) => {
                            return (
                                <div className="post" key={data._id}>
                                    <div className="top">
                                        <img src={data?.user?.profile[0]?.url} className="user_profile" />
                                        <div className="user_info">
                                            <h1>{data?.user?.firstname}</h1>
                                            <p>{data?.user?.number}</p>
                                        </div>
                                    </div>
                                    <Carousel showThumbs={false}>
                                        {data?.pet?.image?.map((imgs, index) => {
                                            return <img key={index} src={imgs?.url} className="post_img" />;
                                        })}
                                    </Carousel>
                                    <div className="options">
                                        <div className="option">
                                            <p onClick={() => handleStatusChange(data._id, "Accepted")}>Approve</p>
                                        </div>
                                        <div className="option">
                                            <p onClick={() => handleStatusChange(data._id, "Rejected")}>Disapprove</p>
                                        </div>
                                        <div className="option">
                                            <p>Message</p>
                                        </div>
                                    </div>
                                    <div className="caption">
                                        <p><span className="bold">Reason : </span>{data?.reason}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}
