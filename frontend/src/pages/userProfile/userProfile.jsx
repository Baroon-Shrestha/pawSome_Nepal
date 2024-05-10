import "./userProfile.scss";
import { useEffect, useState } from "react";
import Favourites from "../favourites/favourites";
import AdoptionRequest from "../adoptionRequest/adoptionRequest";
import Nav from "../../components/nav/nav";
import { useCookies } from "react-cookie";
import EditUserProfile from "../../components/modal/editUserProfile";

export default function UserProfile() {
  const [cookies] = useCookies(["token"]);
  const [selectedTab, setSelectedTab] = useState("favourites");
  const [showEditModal, setShowEditModal] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const userFromLocalStorage = JSON.parse(localStorage.getItem("user"));
    const tokenFromCookies = cookies.token;

    if (userFromLocalStorage && tokenFromCookies) {
      setLoggedInUser(userFromLocalStorage);
    }
  }, [cookies.token, localStorage.getItem("user")]);

  return (
    <>
      <Nav />

      <div className="userProfile_section">
        {showEditModal && <div className="overlay"></div>}
        <img src="./blue.jpg" className="cover_img"></img>
        <div className="container">
          <div className="profile_container">
            <img
              src={loggedInUser?.profile[0]?.url}
              className="user_profile_img"
            ></img>

            <div className="user_info">
              <h1>{loggedInUser?.firstname}</h1>
              <p>{loggedInUser?.number}</p>
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
