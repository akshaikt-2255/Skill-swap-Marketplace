import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllEventsThunk } from "../../data/reducer/api/userThunk";
import { getImageUrl } from "../../utils";
import "../HomePage/EventSection.css";
import { format, parseISO } from "date-fns";
import { Link } from "react-router-dom";

const AllEvents = () => {
  const dispatch = useDispatch();
  const { user, allEvents } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(getAllEventsThunk());
  }, [dispatch]);

  if (isLoading) return <p>Loading...</p>;
  const userEvents = user ? allEvents.filter((event) => event.host._id !== user._id) : allEvents;
  return (
    <div className="skill-events-section">
      <h2 className="skill-events-title">My Events</h2>
      <div className="skill-events-grid">
        {userEvents && userEvents.length > 0 ? (
          userEvents.map((event, index) => (
            <Link
              to={`/event-details/${event._id}`}
              key={index}
              style={{ textDecoration: "none" }}
            >
              <div className="skill-event-card" key={index}>
                <img
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
              </div>
            </Link>
          ))
        ) : (
          <p>No events found.</p>
        )}
      </div>
    </div>
  );
};

export default AllEvents;
