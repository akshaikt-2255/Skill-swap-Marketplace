import './EventSection.css'; 
import EventImage1 from '../../assets/photography.jpg';
import EventImage2 from '../../assets/bread_making.jpg';
import EventImage3 from '../../assets/coding.jpg';

const skillEventsData = [
  {
    title: "Photography Basics: Capture the Moment",
    hostedBy: "Photo Enthusiasts Group",
    date: "SAT, MAR 15 - 10:00 AM EST",
    attendees: 24,
    price: "Free",
    image: EventImage1
  },
  {
    title: "Mastering Sourdough Bread Making",
    hostedBy: "Baking Buddies Collective",
    date: "SUN, MAR 20 - 2:00 PM EST",
    attendees: 35,
    price: "Free",
    image: EventImage2
  },
  {
    title: "Introduction to Python Programming",
    hostedBy: "Code Warriors Community",
    date: "FRI, MAR 25 - 6:00 PM EST",
    attendees: 48,
    price: "Free",
    image: EventImage3
  },
];

const SkillEventsSection = () => {
  return (
    <div className="skill-events-section">
      <h2 className="skill-events-title">Skill Events Near You</h2>
      <div className="skill-events-grid">
        {skillEventsData.map((event, index) => (
          <div className="skill-event-card" key={index}>
            <img src={event.image} alt={event.title} className="skill-event-image" />
            <div className="skill-event-info">
              <h3 className="skill-event-title">{event.title}</h3>
              <p className="skill-event-hosted-by">{event.hostedBy}</p>
              <p className="skill-event-date">{event.date}</p>
              <p className="skill-event-attendees">{event.attendees} going</p>
              <p className="skill-event-price">{event.price}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="see-all-skill-events">See all events</button>
    </div>
  );
};

export default SkillEventsSection;
