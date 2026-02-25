import { Briefcase, Calendar, Building2 } from 'lucide-react';
import { experienceData } from '../../../constants/portfolioData';
import './ApplicationWindow.css';

export default function ProjectsWindow() {
  return (
    <div className="application-window">
      <div className="window-header-section">
        <div className="window-header-icon">
          <Briefcase size={24} strokeWidth={2} />
        </div>
        <p>Experience</p>
      </div>
      
      <div className="app-content">
        {experienceData.map((experience) => (
          <div key={experience.id} className="experience-card">
            <div className="experience-header">
              <div>
                <h3>{experience.position}</h3>
                <div className="company-badge">
                  <Building2 size={14} strokeWidth={2} />
                  <span>{experience.company}</span>
                </div>
              </div>
              <div className="duration-badge">
                <Calendar size={14} strokeWidth={2} />
                <span>{experience.duration}</span>
              </div>
            </div>
            
            <div className="experience-content">
              <ul>
                {experience.responsibilities.map((responsibility, index) => (
                  <li key={index} dangerouslySetInnerHTML={{ __html: responsibility }} />
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
