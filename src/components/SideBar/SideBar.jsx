import { Link } from 'react-router-dom';
import './SideBar.css'

const Sidebar = ({ isOpen, toggleSidebar, handleLogout }) => {
    console.log({isOpen})
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
    <div className="sidebar-header">
      <button onClick={toggleSidebar} className="back-arrow">
        ← Back
      </button>
    </div>
    <div className="sidebar-links">
        <Link to="/profile" onClick={toggleSidebar}>Profile</Link>
        <Link to="/settings" onClick={toggleSidebar}>Settings</Link>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
  </div>
  );
};

export default Sidebar;
