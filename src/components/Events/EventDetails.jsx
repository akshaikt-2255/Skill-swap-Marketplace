// In EventDetails.js
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; // If you store event details in Redux
import { format, parseISO } from "date-fns";
import { getImageUrl } from "../../utils";
import "./EventDetails.css";
import { Link } from "react-router-dom";
import { getAllEventsThunk } from "../../data/reducer/api/userThunk";

const EventDetails = () => {
  const dispatch = useDispatch();
  const { eventId } = useParams();
  const event = useSelector((state) =>
    state.user.allEvents.find((event) => event._id === eventId)
  );

  useEffect(() => {
    dispatch(getAllEventsThunk());
  }, [dispatch]);


  if (!event) {
    return <p>Event not found.</p>;
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
        </div>
      </div>
    </>
  );
};

export default EventDetails;
