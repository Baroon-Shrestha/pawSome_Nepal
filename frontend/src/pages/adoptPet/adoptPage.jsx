import "./adoptPage.scss";

import Nav from "../../components/nav/nav";
import { useParams } from "react-router-dom";
import useFetchPetById from "../../hooks/useFetchPetById";
import { useCookies } from "react-cookie";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useNavigate } from "react-router-dom";
import { Backend_Url } from "../../../url";

export default function AdoptPage() {
  const { id } = useParams();
  const petInfo = useFetchPetById(id);
  const [cookies, __] = useCookies("token");
  const [loading, setIsLoading] = useState(false);
  const [reason, setReason] = useState("");

  const navigate = useNavigate();

  async function adoptPet(e) {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${Backend_Url}/petfinder/adopt/adoptpet/${id}`,
        { reason: reason }, // Send reason as part of an object
        {
          headers: {
            authorization: cookies.token,
          },
        }
      );

      if (response.data.success === true) {
        toast.success("Your adoption request has been sent successfully", {
          onClose: () => {
            navigate("/");
          },
        });
        setIsLoading(false);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      setIsLoading(false);
    }
  }

  return (
    <>
      <Nav />
      <ToastContainer />
      <div className="adopt_page_section">
        <div className="adopt_page_section_container">
          <div className="title">
            Adopt <span className="petName">{petInfo?.name}</span>
          </div>

          <div className="wrapper_container">
            <Carousel showThumbs={false}>
              {petInfo?.image?.map((imgs) => {
                return <img src={imgs.url} className="img"></img>;
              })}
            </Carousel>

            <div className="name">{petInfo?.name}</div>
            <p className="description">{petInfo?.description}</p>
            <textarea
              placeholder="Why do u want to adopt this pet?"
              onChange={(e) => setReason(e.target.value)}
              value={reason}
            ></textarea>
            <button className="btn" onClick={adoptPet}>
              Adopt
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
