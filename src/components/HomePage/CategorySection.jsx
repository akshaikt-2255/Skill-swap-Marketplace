
import './CategorySection.css';
import CookingIcon from '../../assets/cooking.png';
import MusicIcon from '../../assets/music.png';
import LanguageIcon from '../../assets/languages.png';
import TechIcon from '../../assets/technology.png';
import ArtIcon from '../../assets/art.png';
import FitnessIcon from '../../assets/fitness.png';

const skillCategories = [
  { name: 'Cooking', Icon: CookingIcon },
  { name: 'Music', Icon: MusicIcon },
  { name: 'Languages', Icon: LanguageIcon },
  { name: 'Technology', Icon: TechIcon },
  { name: 'Art', Icon: ArtIcon },
  { name: 'Fitness', Icon: FitnessIcon },
];

const SkillCategoriesSection = () => {
  return (
    <div className="skill-categories-section">
      <h2 className="skill-categories-title">Explore Top Categories</h2>
      <div className="skill-categories-list">
        {skillCategories.map((category, index) => (
          <div key={index} className="skill-category-card">
            <img src={category.Icon} alt={category.name} className="skill-category-icon" />
            <h3 className="skill-category-name">{category.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillCategoriesSection;
