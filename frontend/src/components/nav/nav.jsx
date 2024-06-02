import { useEffect, useRef, useState } from "react";
import styles from "./nav.module.css";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { FaBarsStaggered } from "react-icons/fa6";
import { ImCross } from "react-icons/im";

export default function Nav() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [showDropDown, setShowDropDown] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [isAdmin, setIsAdmin] = useState(false);
  const navRef = useRef(null);
  const logo = useRef();
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const userFromLocalStorage = JSON.parse(localStorage.getItem("user"));
    const tokenFromCookies = cookies.token;

    if (userFromLocalStorage && tokenFromCookies) {
      setLoggedInUser(userFromLocalStorage);

      if (userFromLocalStorage.email.includes("admin@gmail.com")) {
        setIsAdmin(true);
      }
    }
  }, [cookies.token]);

  function handleLogOutClick() {
    localStorage.clear();
    setShowDropDown(false);
    setLoggedInUser(null);
    removeCookie("token");
    setIsAdmin(false);
  }

  function handleSettingClick() {
    setShowDropDown(false);
  }

  function toggleMenu() {
    setShowMenu(!showMenu);
  }

  return (
    <>
      <nav ref={navRef} className={styles.nav}>
        <div className={styles.navContainer}>
          <Link to="/">
            <div className={styles.logo_container} ref={logo}>
              <div className={styles.logo}>Pets </div>
              <div className={styles.logoOrange}>Nepal</div>
            </div>
          </Link>

          <div
            className={`${styles.linksWrapper} ${
              showMenu ? styles.showMenu : ""
            }`}
          >
            <div className={styles.navigationLinks}>
              <ul className={styles.ul}>
                <li className={styles.list}>
                  <Link to="/" className={styles.text}>
                    Home
                  </Link>
                </li>

                <li className={styles.list}>
                  <Link to="/allPets" className={styles.text}>
                    Available Pets
                  </Link>
                </li>
                <li className={styles.list}>
                  <Link to="/products" className={styles.text}>
                    Products
                  </Link>
                </li>
                {cookies.token && !isAdmin && (
                  <li className={styles.list}>
                    <Link to="/homestay" className={styles.text}>
                      Pet Homestay
                    </Link>
                  </li>
                )}

                {isAdmin && (
                  <li className={styles.list}>
                    <Link to="/dashboard" className={styles.text}>
                      Admin Dashboard
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>

          <div className={styles.barsAndUser}>
            {cookies.token ? (
              <div className={styles.dropDown_container}>
                <p
                  className={styles.text}
                  onClick={() => setShowDropDown(!showDropDown)}
                >
                  <div className={styles.prof}>
                    Welcome,
                    <span className={styles.userName}>
                      {loggedInUser?.firstname}
                    </span>
                    <img
                      src={loggedInUser?.profile[0]?.url}
                      alt="Profile"
                      className={styles.profileIcon}
                    />
                  </div>
                </p>

                {showDropDown && (
                  <div className={styles.dropDown}>
                    <Link to="/userProfile">
                      <p
                        className={`${styles.text} ${styles.drop}`}
                        onClick={handleSettingClick}
                      >
                        Profile
                      </p>
                    </Link>
                    <p
                      className={`${styles.text} ${styles.drop}`}
                      onClick={handleLogOutClick}
                    >
                      Logout
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className={styles.authLinks}>
                <Link to="/login" className={styles.text}>
                  Login
                </Link>
                <Link to="/register" className={styles.text}>
                  Register
                </Link>
              </div>
            )}
            {showMenu ? (
              <ImCross className={styles.cross} onClick={toggleMenu} />
            ) : (
              <FaBarsStaggered className={styles.bars} onClick={toggleMenu} />
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
