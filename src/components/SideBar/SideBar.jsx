import { Link } from "react-router-dom";
import "./SideBar.css";

const Sidebar = ({ isOpen, toggleSidebar, handleLogout }) => {
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-header">
        <button onClick={toggleSidebar} className="back-arrow">
          ← Back
        </button>
      </div>
      <div className="sidebar-links">
        <Link to="/profile" onClick={toggleSidebar}>
          View Profile
        </Link>
        <Link to="/create" onClick={toggleSidebar}>
          Create Event
        </Link>
        <Link to="/myEvents" onClick={toggleSidebar}>
          My Events
        </Link>
        <Link to="/chat" onClick={toggleSidebar}>
          Messages
        </Link>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
