// In EventDetails.js
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; // If you store event details in Redux
import { format, parseISO } from "date-fns";
import { getImageUrl } from "../../utils";
import "./EventDetails.css";
import { Link } from "react-router-dom";
import { getAllEventsThunk } from "../../data/reducer/api/userThunk";
import { Button } from "@mui/material";

const EventDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { eventId } = useParams();
  const event = useSelector((state) =>
    state.user.allEvents.find((event) => event._id === eventId)
  );
  const { user } = useSelector((state) => state.user);
  const isUserEvent = user?._id === event?.host?._id;
  useEffect(() => {
    dispatch(getAllEventsThunk());
  }, []);

  if (!event) {
    return <p>Event not found.</p>;
  }

  const handleDeleteEvent = (eventId) => {
      dispatch(deleteEvent(eventId))
      navigate('/myEvents');
  }

  const handleEditEvent = (eventId) => {
    navigate(`/events/edit/${eventId}`);
  }

  return (
    <>
      <nav className="event-details-breadcrumb">
        <Link to="/" className="breadcrumb-home">
          Home
        </Link>{" "}
        /{" "}
        <Link to="/allEvents" className="breadcrumb-home">
          Events
        </Link>{" "}
        / <span>{event.title}</span>
      </nav>
      <div className="event-details-container">
        <div className="event-image-container">
          <img
            src={getImageUrl(event.eventImage)}
            alt={event.title}
            className="event-details-image"
          />
        </div>
        <div className="event-info-container">
          <h2>{event.title}</h2>
          <p>{format(parseISO(event?.datetime), "MMM d, yyyy")}</p>
          <p>{event.description}</p>
          <p>Hosted by: {event.host.name}</p>
          {event.online ? (
            <p>
              Online Event:{" "}
              <a href={event.link} target="_blank" rel="noopener noreferrer">
                Click here for link
              </a>
            </p>
          ) : (
            <p>Location: {event.location}</p>
          )}
          <p>Available Slots: {event.availableSlots}</p>
          {isUserEvent && (
            <div>
              <Button
                size="small"
                sx={{
                  flex: 1,
                  bgcolor: "#61dafb",
                  "&:hover": {
                    bgcolor: "#60d0ea",
                  },
                  color: "#fff",
                  ":disabled": {
                    bgcolor: "grey",
                    color: "white",
                  },
                  mr: 0.5,
                }}
                onClick={() => handleEditEvent(event._id)}
              >
                Edit
              </Button>

              <Button
                size="small"
                sx={{
                  flex: 1,
                  color: "#fff",
                  bgcolor: "#61dafb",
                  "&:hover": {
                    bgcolor: "#60d0ea",
                    color: "#fff",
                  },
                }}
                onClick={() => handleDeleteEvent(event._id)}
              >
                Delete
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EventDetails;
