import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Context/auth.context";
import "./NavBar.css";
import AOS from "aos";
import "aos/dist/aos.css";

function NavBar() {
  const { isLoggedIn, logOutUser } = useContext(AuthContext);
  const [isTakingOff, setIsTakingOff] = useState(false);
  const [menuHeight, setMenuHeight] = useState("0px");


  const openMenu = () => {
    setIsTakingOff(true);
    setMenuHeight("300px");
  };

  const closeMenu = () => {
    setIsTakingOff(false);
    setMenuHeight("0px");
  };

  useEffect(() => {
    AOS.init();
  }, []);


  return (
    <div className={`navbar`} data-aos="fade-up" data-aos-duration="3000" onMouseEnter={openMenu} onMouseLeave={closeMenu}>
      <i
        className={`material-icons${isTakingOff ? " taking-off" : ""}`}
      >
        {isTakingOff ? "flight_takeoff" : "flight_land"}
      </i>
      <ul className={`menu`} style={{ maxHeight: menuHeight }}>
        <Link to="/home">
        <li>Home</li>
        </Link>
        <Link to="/contacts">
        <li>Contacts</li>
        </Link>
        {isLoggedIn ? (
          <>
            <Link to="/user-profile">
            <li>My Profile</li>
            </Link>
            <Link to="/theglobe">
            <li>The Globe</li>
            </Link>
            <Link to="/community">
            <li>Community</li>
            </Link>
            <li onClick={logOutUser} className="logout-button">
              Logout
            </li>
          </>
        ) : (
          <>
            <Link to="/auth/signup">
            <li>Signup</li>
            </Link>
            <Link to="/auth/login">
            <li>Login</li>
            </Link>
          </>
        )}
      </ul>
    </div>
  );
}

export default NavBar;
