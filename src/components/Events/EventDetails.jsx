import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { format, parseISO, isPast } from "date-fns";
import { getImageUrl } from "../../utils";
import "./EventDetails.css";
import { Link } from "react-router-dom";
import {
  getAllEventsThunk,
  unAttendEvent,
  saveRating
} from "../../data/reducer/api/userThunk";
import { Button, IconButton, Snackbar, SnackbarContent, Typography, Rating } from "@mui/material";
import { Close } from "@mui/icons-material";

const EventDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { eventId } = useParams();
  const event = useSelector((state) =>
    state.user.allEvents.find((event) => event._id === eventId)
  );
  const { user } = useSelector((state) => state.user);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const userRating = event?.ratings?.find(r => r.user === user?._id)?.rating || 0;
  const [rating, setRating] = useState(userRating);
  const isUserEvent = user?._id === event?.host?._id;
  const isAttending =
    user && event.attendees.some((attendee) => attendee._id === user._id);
  const eventDate = parseISO(event?.datetime);

  useEffect(() => {
    dispatch(getAllEventsThunk());
  }, [dispatch]);

  if (!event) {
    return <p>Event not found.</p>;
  }

  const handleUnAttend = async (eventId) => {
    console.log("here")
    const userId = user?._id;
    if (!userId) {
      navigate("/login");
    }
    const result = await dispatch(unAttendEvent({ userId, eventId }));
    handleSnackbarOpen(result?.payload?.message);
    if(result?.payload?.event) {
      dispatch(getAllEventsThunk());
    }
  };


  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
    // Dispatch the thunk to save the rating
    dispatch(saveRating({
      eventId: eventId,
      userId: user._id,
      rating: newValue
    })).then(() => {
      handleSnackbarOpen('Rating submitted successfully!');
    }).catch((error) => {
      handleSnackbarOpen('Failed to submit rating.');
      setIsError(true);
    });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSnackbarOpen = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  return (
    <>
      <nav className="event-details-breadcrumb">
        <Link to="/" className="breadcrumb-home">Home</Link> / 
        <Link to="/allEvents" className="breadcrumb-home">Events</Link> / 
        <span>{event.title}</span>
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
          <p>{format(eventDate, "MMM d, yyyy")}</p>
          <p>{event.description}</p>
          <p>Hosted by: {event.host.name}</p>
          {!isPast(eventDate) && (event.online ? 
            <p>Online Event: <a href={event.link} target="_blank" rel="noopener noreferrer">Click here for link</a></p> : 
            <p>Location: {event.location}</p>)}
          {!isPast(eventDate) && <p>Available Slots: {event.availableSlots}</p>}
          {isPast(eventDate) && isAttending && (
            <>
              <Typography component="legend">Rate this event:</Typography>
              <Rating
                name="simple-controlled"
                value={rating}
                onChange={handleRatingChange}
              />
            </>
          )}
          {!isPast(eventDate) && isAttending && (
            <Button
              onClick={() => handleUnAttend(event._id)}
              sx={{
                flex: 1,
                color: "#fff",
                width: "100px",
                bgcolor: "#61dafb",
                "&:hover": {
                  bgcolor: "#60d0ea",
                  color: "#fff",
                },
              }}
            >
              Unattend
            </Button>
          )}
          {isUserEvent && (
            <div>
              <Button
                onClick={() => navigate(`/events/edit/${eventId}`)}
                sx={{ mr: 0.5, bgcolor: "primary.main", '&:hover': { bgcolor: "primary.dark" } }}
              >
                Edit
              </Button>
              <Button
                onClick={() => dispatch(deleteEvent(eventId))}
                sx={{ bgcolor: "error.main", '&:hover': { bgcolor: "error.dark" } }}
              >
                Delete
              </Button>
            </div>
          )}
        </div>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <SnackbarContent
            message={snackbarMessage}
            className={!isError ? "snack-positive" : "snack-negative"}
            action={
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleSnackbarClose}
              >
                <Close fontSize="small" />
              </IconButton>
            }
          />
        </Snackbar>
      </div>
    </>
  );
};

export default EventDetails;
