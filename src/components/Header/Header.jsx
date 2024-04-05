import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { useSelector } from "react-redux";
import SideBar from "../SideBar/SideBar";
import { Avatar } from "@mui/material";
import { getImageUrl } from "../../utils";
import SearchComponent from "./Search";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    // Check for the username in localStorage when the component mounts
    const isUser = localStorage.getItem("username");
    if (isUser && user) {
      setLoggedInUser(user?.username);
    }
  }, [user]);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search term submitted:", searchTerm);
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    setLoggedInUser(null);
    toggleSidebar();
    navigate("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <header className={`app-header ${isMenuOpen ? "menu-open" : ""}`}>
      <div className="menu-wrapper">
        <div className="logo">
          <Link to="/">SkillSwap</Link>
        </div>
        <SearchComponent isDesktop={true} />
        <div className="login-signup main-menu">
          {loggedInUser ? (
            <>
              <Link to="/skills" className="login-button">
                Browse Skills
              </Link>
              <Link to="/allEvents" className="login-button">
                Browse Events
              </Link>
              <div className="user-avatar" onClick={toggleSidebar}>
                <Avatar
                  src={
                    user?.profilePicture &&
                    (typeof user?.profilePicture === "string"
                      ? getImageUrl(user?.profilePicture)
                      : URL.createObjectURL(user?.profilePicture))
                  }
                  alt="Avatar"
                />
              </div>
            </>
          ) : (
            <>
              <Link to="/skills" className="login-button">
                Browse Skills
              </Link>
              <Link to="/allEvents" className="login-button">
                Browse Events
              </Link>
              <Link to="/login" className="login-button">
                Log in
              </Link>
              <Link to="/register" className="signup-button">
                Sign up
              </Link>
            </>
          )}
        </div>
        <div className="menu-bar" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
      <SideBar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        handleLogout={handleLogout}
      />
      <div className="mobile-menu">
        <SearchComponent onToggleMenu={toggleMenu} />
        <div className="login-signup">
          {loggedInUser ? (
            <div className="profile-logout-wrapper">
              <Link to="/skills" className="login-button" onClick={toggleMenu}>
                Browse Skills
              </Link>
              <Link
                to="/allEvents"
                className="login-button"
                onClick={toggleMenu}
              >
                Browse Events
              </Link>
              <Link to="/create" className="login-button" onClick={toggleMenu}>
                Create Event
              </Link>
              <Link
                to="/myEvents"
                className="login-button"
                onClick={toggleMenu}
              >
                My Events
              </Link>
              <Link to="/profile" onClick={toggleMenu}>
                <button className="login-button">View Profile</button>
              </Link>
              <Link to="/chat" className="login-button" onClick={toggleMenu}>
                Messages
              </Link>
              <button onClick={handleLogout} className="signup-button">
                Logout
              </button>
            </div>
          ) : (
            <div className="profile-logout-wrapper">
              <Link to="/skills" className="login-button" onClick={toggleMenu}>
                Browse Skills
              </Link>
              <Link
                to="/allEvents"
                className="login-button"
                onClick={toggleMenu}
              >
                Browse Events
              </Link>
              <Link to="/login" className="login-button" onClick={toggleMenu}>
                Log in
              </Link>
              <Link
                to="/register"
                className="signup-button"
                onClick={toggleMenu}
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
