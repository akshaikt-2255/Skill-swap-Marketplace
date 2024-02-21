import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { useSelector } from "react-redux";
import SideBar from "../SideBar/SideBar";
import { Avatar } from "@mui/material";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);
  const user = useSelector((state) => state.user.user);
  console.log({ user });
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
  console.log({isSidebarOpen})
  return (
    <header className={`app-header ${isMenuOpen ? "menu-open" : ""}`}>
      <div className="menu-wrapper">
        <div className="logo">
          <Link to="/">SkillSwap</Link>
        </div>
        <form className="search main-menu" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search skills"
            className="search-bar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
        <div className="login-signup main-menu">
          {loggedInUser ? (
            <div className="user-avatar" onClick={toggleSidebar}>
              <Avatar src={''} alt="Avatar" />
            </div>
          ) : (
            <>
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
        <form className="search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search skills"
            className="search-bar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
        <div className="login-signup">
          {loggedInUser ? (
            <>
              <button onClick={handleLogout} className="signup-button">
                Logout
              </button>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
