import { Zap, Code2, Smartphone, Database, GitBranch, Palette, Users } from 'lucide-react';
import { skillsData } from '../../../constants/portfolioData';
import './ApplicationWindow.css';

const getCategoryIcon = (category) => {
  const iconMap = {
    'Frontend Technologies': Code2,
    'Mobile Development': Smartphone,
    'State Management': Database,
    'Version Control & CI/CD': GitBranch,
    'Backend & Integrations': Database,
    'UI/UX & Performance': Palette,
    'Collaboration & PM': Users
  };
  return iconMap[category] || Code2;
};

export default function SkillsWindow() {
  return (
    <div className="application-window">
      <div className="window-header-section">
        <div className="window-header-icon">
          <Zap size={24} strokeWidth={2} />
        </div>
        <p>Technical Skills</p>
      </div>
      
      <div className="app-content">
        {Object.entries(skillsData).map(([category, items]) => {
          const IconComponent = getCategoryIcon(category);
          return (
            <div key={category} className="skill-category-card">
              <div className="skill-category-header">
                <div className="skill-category-icon">
                  <IconComponent size={16} strokeWidth={2} />
                </div>
                <h3>{category}</h3>
              </div>
              <div className="skill-tags">
                {items.map(skill => (
                  <span key={skill} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
