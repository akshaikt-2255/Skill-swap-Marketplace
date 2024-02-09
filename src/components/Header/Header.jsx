import  { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; 
const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');

  
  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Search term submitted:', searchTerm);
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
        <Link to="/login" className="login-button">Log in</Link>
        <Link to="/register" className="signup-button">Sign up</Link>
      </div>
    </header>
  );
};

export default Header;
