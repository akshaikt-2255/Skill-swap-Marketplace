import SkillCategoriesSection from "./CategorySection";
import SkillEventsSection from "./EventSection";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="homepage">
      <h1 className="homepage-title">
        The skill exchange platform—Where learning becomes networking
      </h1>
      <p className="homepage-description">
        Whatever your skill, from coding and cooking to painting and public
        speaking, there are thousands of people who share it on SkillSwap. Swap
        skills and learn new ones every day—sign up to join the community.
      </p>
      <button className="join-button">Join SkillSwap</button>

      <SkillEventsSection />

      <SkillCategoriesSection />
    </div>
  );
};

export default HomePage;
