import { useEffect, useState } from "react";
import "./adoptionRequest.scss";
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Nav from "../../components/nav/nav";
import { useCookies } from "react-cookie";
import { Backend_Url } from "../../../url";

export default function AdoptionRequest() {
  const [petRequests, setPetRequests] = useState([]);
  const [cookies] = useCookies(["token"]);

  useEffect(() => {
    axios
      .get(`${Backend_Url}/petfinder/adopt/viewyourrequest`, {
        headers: {
          authorization: cookies.token,
        },
      })
      .then(function (response) {
        console.log(response);
        setPetRequests(response?.data?.adoptionRequest);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  console.log(petRequests);

  return (
    <>
      <div className="adoptionRequest_section">
        <h1>Your Adoption Requests!</h1>
        <div className="posts">
          {petRequests?.map((data) => {
            return (
              <>
                <div className="post">
                  <div className="top">
                    <div className="left">
                      <img
                        src={data?.user?.profile[0]?.url}
                        className="user_profile"
                      />

                      <div className="user_info">
                        <h1>{data?.user?.firstname}</h1>
                        <p>{data?.user?.number}</p>
                      </div>
                    </div>

                    <p
                      className={
                        data?.status === "Accepted"
                          ? "status status_accepted"
                          : "status status_pending"
                      }
                    >
                      {data?.status}
                    </p>
                  </div>
                  <Carousel showThumbs={false}>
                    {data?.pet?.image?.map((imgs) => {
                      return <img src={imgs?.url} className="post_img" />;
                    })}
                  </Carousel>

                  <div className="caption">
                    <p>
                      <span className="bold">Reason : </span>
                      {data?.reason}
                    </p>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
