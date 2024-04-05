import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllEventsThunk } from '../../data/reducer/api/userThunk';
import './EventSection.css';
import { getImageUrl } from '../../utils';

const SkillEventsSection = () => {
  const dispatch = useDispatch();
  const { user, allEvents } = useSelector(state => state.user);
  const [displayedEvents, setDisplayedEvents] = useState([]);

  useEffect(() => {
    dispatch(getAllEventsThunk());
  }, [dispatch]);

  useEffect(() => {
    if (allEvents?.length > 0) {
      const filteredEvents = user ? allEvents.filter(event => event?.host._id !== user?._id) : [...allEvents];
      const randomEvents = filteredEvents.sort(() => 0.5 - Math.random()).slice(0, 3);
      setDisplayedEvents(randomEvents);
    }
  }, [allEvents, user]);

  return (
    <div className="skill-events-section">
      <h2 className="skill-events-title">Skill Events Near You</h2>
      <div className="skill-events-grid">
        {displayedEvents?.map((event, index) => (
          <div className="skill-event-card" key={index}>
            <img src={getImageUrl(event.eventImage) || "defaultImage.jpg"} alt={event.title} className="skill-event-image" />
            <div className="skill-event-info">
              <h3 className="skill-event-title">{event.title}</h3>
              <p className="skill-event-hosted-by">Hosted by: {event.host.name}</p>
              <p className="skill-event-date">{new Date(event.datetime).toLocaleString()}</p>
              <p className="skill-event-attendees">{event.attendees.length} going</p>
              <p className="skill-event-price">{event.price || 'Free'}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="see-all-skill-events">See all events</button>
    </div>
  );
};

export default SkillEventsSection;
