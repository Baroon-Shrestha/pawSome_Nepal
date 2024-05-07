import { useState, useRef, useEffect, useReducer } from "react";
import styles from "./newDash.module.css";
import { IoMdHome, IoMdSettings, IoIosLogOut } from "react-icons/io";
import { IoAddCircleSharp, IoPersonCircle } from "react-icons/io5";
import { MdOutlinePets, MdExpandMore } from "react-icons/md";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";


export const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const side = useRef(null);


  const handleClick = (item) => {
    setActiveItem((prev) => (prev !== item ? item : ""));
  };

  useEffect(() => {
    const userFromLocalStorage = JSON.parse(localStorage.getItem("user"));
    const tokenFromCookies = cookies.token;

    if (userFromLocalStorage && tokenFromCookies) {
      setLoggedInUser(userFromLocalStorage);
    }
  }, [cookies.token]);

  function handleLogOutClick() {
    localStorage.clear();
    setLoggedInUser(null);
    removeCookie("token");
  }

  return (
    <aside className={styles.sidebar} ref={side}>
      <header className={styles["sidebar-header"]}>
        <button type="button">
          <img
            src={loggedInUser?.profile[0]?.url}
            alt="Profile"
            className={styles.profileIcon}
          />
        </button>
        <span> Welcome, {loggedInUser?.firstname}</span>
      </header>
      <Link to="/dashboard" className={styles.navLink}>
        <NavButton
          onClick={handleClick}
          name="Home"
          icon={<IoMdHome />}
          isActive={activeItem === "Home"}
          hasSubNav={false}
        />
      </Link>
      <Link to="/managepets" className={styles.navLink}>
        <NavButton
          onClick={handleClick}
          name="Manage pets"
          icon={<MdOutlinePets />}
          isActive={activeItem === "Manage pets"}
          hasSubNav={false}
        />
      </Link>
      <div>
        <NavButton
          onClick={handleClick}
          name="Manage Users"
          icon={<IoPersonCircle />}
          isActive={activeItem === "Manage Users"}
        />
      </div>
      <div>
        <NavButton
          onClick={handleClick}
          name="Settings"
          icon={<IoMdSettings />}
          isActive={activeItem === "Settings"}
        />
      </div>
      <Link to="/manageAdoptionRequest">
        <NavButton
          onClick={handleClick}
          name="Adoption Request"
          icon={<IoMdSettings />}
          isActive={activeItem === "Settings"}
        />
      </Link>
      <Link to="/">
        <NavButton
          onClick={handleClick}
          name="User Dashboard"
          icon={<IoMdSettings />}
          isActive={activeItem === "Settings"}
        />
      </Link>
      <Link to="/">
        <NavButton
          onClick={handleLogOutClick}
          name="Logout"
          icon={<IoIosLogOut />}
          isActive={activeItem === "Logout"}
        />
      </Link>
    </aside>
  );
};

const NavButton = ({ onClick, name, icon, isActive, hasSubNav }) => (
  <button
    type="button"
    onClick={() => onClick(name)}
    className={isActive ? styles.active : ""}
  >
    {icon && (
      <span className={styles["material-symbols-outlined"]}>{icon}</span>
    )}
    <span>{name}</span>
    {hasSubNav && (
      <span className={styles["material-symbols-outlined"]}>
        <MdExpandMore />
      </span>
    )}
  </button>
);
