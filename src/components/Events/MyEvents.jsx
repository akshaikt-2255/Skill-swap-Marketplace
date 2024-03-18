import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteEvent, getEventsByHostId } from "../../data/reducer/api/userThunk";
import { getImageUrl } from "../../utils";
import "../HomePage/EventSection.css";
import { format, parseISO } from "date-fns";
import { Link } from "react-router-dom";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { IconButton } from "@mui/material";


const MyEvents = () => {
  const dispatch = useDispatch();
  const { user, myEvents } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setIsLoading(true);
      dispatch(getEventsByHostId(user._id))
        .unwrap()
        .then(() => setIsLoading(false))
        .catch((error) => {
          console.error("Failed to fetch my events:", error);
          setIsLoading(false);
        });
    }
  }, [dispatch, user]);

  if (isLoading) return <p>Loading...</p>;

  const handleEditEvent = (eventId) => {
    console.log(`Editing event with ID: ${eventId}`);
  };
  

  return (
    <div className="skill-events-section">
      <h2 className="skill-events-title">My Events</h2>
      <div className="skill-events-grid">
        {myEvents && myEvents.length > 0 ? (
          myEvents.map((event, index) => (
            <div className="skill-event-card" key={index}>
              <Link
                to={`/event-details/${event._id}`}
                style={{ textDecoration: "none" }}
              >
                <img
                  src={getImageUrl(event.eventImage) || "defaultImage.jpg"}
                  alt={event.title}
                  className="skill-event-image"
                />
                <div className="skill-event-info">
                  <h3 className="skill-event-title">{event.title}</h3>
                  <p className="skill-event-date">
                    {format(parseISO(event?.datetime), "MMM d, yyyy")}
                  </p>
                  {event.online ? (
                    <a
                      href={event.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="skill-event-link"
                    >
                      Click here for link
                    </a>
                  ) : (
                    <p className="skill-event-attendees">{event.location}</p>
                  )}
                  <p className="skill-event-price">Free</p>
                </div>
              </Link>
              <div className="skill-event-actions">
                <IconButton onClick={() => handleEditEvent(event._id)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => dispatch(deleteEvent(event._id))}>
                  <DeleteIcon />
                </IconButton>
              </div>
            </div>
          ))
        ) : (
          <p>No events found.</p>
        )}
      </div>
    </div>
  );
};

export default MyEvents;
