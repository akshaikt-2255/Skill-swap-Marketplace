import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import "./Search.css";
import { Link } from "react-router-dom";
import { getImageUrl } from "../../utils";
import { search } from "../../data/reducer/api/userThunk";

const SearchComponent = ({isDesktop,onToggleMenu}) => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const searchResults = useSelector((state) => state.user.searchResults);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchTerm(query);
    if (query.trim()) {
      dispatch(search(query.trim()));
      setIsDropdownVisible(true);
    } else {
      setIsDropdownVisible(false);
    }
  };

  const onSearchClose = () => {
    setIsDropdownVisible(false);
    if(onToggleMenu) {
      onToggleMenu();
    }
  }

  return (
    <div className={`search-container ${isDesktop ? 'main-menu' : ""}`}>
      <div className="search-wrapper">
        <SearchIcon className="search-icon" />
        <input
          className="search-input"
          type="text"
          placeholder="Search skills or events"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      {isDropdownVisible && searchResults && (
        <ul className="results-dropdown" ref={dropdownRef}>
          {searchResults?.users?.length > 0 ||
          searchResults?.events?.length > 0 ? (
            <>
              {searchResults.users?.map((user) => (
                <li key={user._id} onClick={onSearchClose}>
                  <Link to={`/user/${user._id}`} className="search-result-item">
                    <img
                      src={getImageUrl(user.profilePicture)}
                      alt={user.name}
                      className="search-image"
                    />
                    <div className="search-info">
                      <div className="search-name">{user.name}</div>
                      <div className="search-skill">{user.primarySkill}</div>
                    </div>
                  </Link>
                </li>
              ))}
              {searchResults.events?.map((event) => (
                <li key={event._id} onClick={onSearchClose}>
                  <Link
                    to={`/event-details/${event._id}`}
                    className="search-result-item"
                  >
                    <img
                      src={getImageUrl(event.eventImage)}
                      alt={event.title}
                      className="search-image"
                    />
                    <div className="search-info">
                      <div className="search-name">{event.title}</div>
                    </div>
                  </Link>
                </li>
              ))}
            </>
          ) : (
            <li className="search-no-results">No skills or events found.</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchComponent;
