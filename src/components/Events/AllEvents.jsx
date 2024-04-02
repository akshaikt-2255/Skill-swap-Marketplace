import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { attendEvent, getAllEventsThunk } from "../../data/reducer/api/userThunk";
import { getImageUrl } from "../../utils";
import "../HomePage/EventSection.css";
import { format, parseISO } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";

const AllEvents = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, allEvents } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(getAllEventsThunk());
  }, [dispatch]);

  const handleAttend = (eventId) => {
    const userId = user?._id;
    if(!userId) {
      navigate('/login');
    }
    console.log(`Attending event with ID ${userId}: ${eventId}`);
    dispatch(attendEvent({ userId, eventId }));
  };

  const onNavigateEvent = (eventId) => {
    navigate(`/event-details/${eventId}`);
  };

  if (isLoading) return <p>Loading...</p>;
  const userEvents = user
    ? allEvents.filter((event) => event.host._id !== user._id)
    : allEvents;
  return (
    <>
      <nav className="skill-events-section">
        <Link to="/" className="breadcrumb-home">
          Home
        </Link>{" "}
        / <span>Events</span>
      </nav>
      <div className="skill-events-section">
        <h2 className="skill-events-title">All Events</h2>
        <div className="skill-events-grid">
          {userEvents && userEvents.length > 0 ? (
            userEvents.map((event, index) => (
              <div className="skill-event-card" key={index}>
                <img
                  onClick={() => onNavigateEvent(event._id)}
                  src={getImageUrl(event.eventImage) || "defaultImage.jpg"}
                  alt={event.title}
                  className="skill-event-image"
                />
                <div className="skill-event-info">
                  <h3 className="skill-event-title">{event.title}</h3>
                  <p className="skill-event-hosted-by">
                    Hosted by: {event.host.name}
                  </p>
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
                <div className="skill-event-info">
                {user && event.attendees.some(attendee => attendee._id === user._id) ? (
                <Typography sx={{ color: "green" }}>Attending</Typography>
              ) : (
                <Button
                  onClick={() => handleAttend(event._id)}
                  sx={{
                    flex: 1,
                    color: "#fff",
                    bgcolor: "#61dafb",
                    "&:hover": {
                      bgcolor: "#60d0ea",
                      color: "#fff",
                    },
                  }}
                >
                  Attend
                </Button>
              )}
                </div>
              </div>
            ))
          ) : (
            <p>No events found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default AllEvents;
