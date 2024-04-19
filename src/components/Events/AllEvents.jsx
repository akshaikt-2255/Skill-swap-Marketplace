import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { attendEvent, getAllEventsThunk } from "../../data/reducer/api/userThunk";
import { getImageUrl } from "../../utils";
import "../HomePage/EventSection.css";
import { format, parseISO ,isPast} from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import { Button, IconButton, Snackbar, SnackbarContent,Typography } from "@mui/material";
import { Close } from "@mui/icons-material";

const AllEvents = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, allEvents } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    dispatch(getAllEventsThunk());
  }, [dispatch]);

  const handleAttend = async (eventId) => {
    const userId = user?._id;
    if(!userId) {
      navigate('/login');
    }
    console.log(`Attending event with ID ${userId}: ${eventId}`);
    const result = await dispatch(attendEvent({ userId, eventId }));
    handleSnackbarOpen(result?.payload?.message);
    if(result?.payload?.event) {
      dispatch(getAllEventsThunk());
    }
  };

  const onNavigateEvent = (eventId) => {
    navigate(`/event-details/${eventId}`);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSnackbarOpen = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  if (isLoading) return <p>Loading...</p>;
  const userEvents = user
    ? allEvents.filter((event) => event?.host?._id !== user?._id)
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
                  onClick={() => onNavigateEvent(event?._id)}
                  src={getImageUrl(event.eventImage) || "defaultImage.jpg"}
                  alt={event?.title}
                  className="skill-event-image"
                />
                <div className="skill-event-info">
                  <h3 className="skill-event-title">{event?.title}</h3>
                  <p className="skill-event-hosted-by">
                    Hosted by: {event?.host?.name}
                  </p>
                  <p className="skill-event-date">
                    {format(parseISO(event?.datetime), "MMM d, yyyy")}
                  </p>
                  {event.online ? (
                    <a
                      href={event?.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="skill-event-link"
                    >
                      Click here for link
                    </a>
                  ) : (
                    <p className="skill-event-attendees">{event?.location}</p>
                  )}
                  <p className="skill-event-price">Free</p>
                </div>
                <div className="skill-event-info">
                {isPast(new Date(event?.datetime)) ? (
                    <Typography sx={{ color: "grey" }}>Completed</Typography>
                  ) : (
                    <div className="skill-event-info">
                      {user && event?.attendees.some(attendee => attendee?._id === user?._id) ? (
                        <Typography sx={{ color: "green" }}>Attending</Typography>
                      ) : (
                        <Button
                          onClick={() => handleAttend(event?._id)}
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
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>No events found.</p>
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

export default AllEvents;
