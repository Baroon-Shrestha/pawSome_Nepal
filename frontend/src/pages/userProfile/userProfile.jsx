import "./userProfile.scss";
import { useState } from "react";
import Favourites from "../favourites/favourites";
import AdoptionRequest from "../adoptionRequest/adoptionRequest";
import Nav from "../../components/nav/nav";

import EditUserProfile from "../../components/modal/editUserProfile";

export default function UserProfile() {
  const [selectedTab, setSelectedTab] = useState("favourites");
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <>
      <Nav />

      <div className="userProfile_section">
        {showEditModal && <div className="overlay"></div>}
        <img src="./blue.jpg" className="cover_img"></img>
        <div className="container">
          <div className="profile_container">
            <img
              src="https://www.jammable.com/_next/image?url=https%3A%2F%2Fimagecdn.voicify.ai%2Fmodels%2F3387b086-9edf-41de-856f-0293cafa9178.png&w=640&q=100"
              className="user_profile_img"
            ></img>

            <div className="user_info">
              <h1>Buddha Lama</h1>
              <p>9812908790</p>
            </div>

            <button className="btn" onClick={() => setShowEditModal(true)}>
              {" "}
              Edit{" "}
            </button>
          </div>
          <div className="links_container">
            <p
              className={selectedTab === "favourites" ? "active" : ""}
              onClick={() => setSelectedTab("favourites")}
            >
              Favourites
            </p>
            <p
              className={selectedTab === "adoption-request" ? "active" : ""}
              onClick={() => setSelectedTab("adoption-request")}
            >
              Adoption Request
            </p>
          </div>

          <div className="tab-content">
            {selectedTab === "favourites" && <Favourites />}
            {selectedTab === "adoption-request" && <AdoptionRequest />}
          </div>
        </div>

        {showEditModal && (
          <div className="edit_profile_container">
            <EditUserProfile setShowEditModal={setShowEditModal} />
          </div>
        )}
      </div>
    </>
  );
}
