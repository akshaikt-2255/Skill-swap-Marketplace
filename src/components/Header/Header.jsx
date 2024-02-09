import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css'; 
import { useSelector } from 'react-redux';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loggedInUser, setLoggedInUser] = useState(null);
  const user = useSelector((state) => state.user.user);
  console.log({user})
  const navigate = useNavigate();

  useEffect(() => {
    // Check for the username in localStorage when the component mounts
    const isUser = localStorage.getItem('username');
    if (isUser && user) {
      setLoggedInUser(user?.username);
    }
  }, [user]);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Search term submitted:', searchTerm);
  };

  const handleLogout = () => {
    localStorage.removeItem('username'); 
    setLoggedInUser(null); 
    navigate('/');
  };

  return (
    <header className="app-header">
      <div className="logo">
        <Link to="/">SkillSwap</Link>
      </div>
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
            <button onClick={handleLogout} className="signup-button">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="login-button">Log in</Link>
            <Link to="/register" className="signup-button">Sign up</Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
