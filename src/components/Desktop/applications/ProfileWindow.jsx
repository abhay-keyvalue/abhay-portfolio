import { User, MapPin, Briefcase, GraduationCap, Trophy, Award, Target } from 'lucide-react';
import { profileData, educationData, achievementsData } from '../../../constants/portfolioData';
import './ApplicationWindow.css';

const getAchievementIcon = (type) => {
  switch (type) {
    case 'award':
      return Award;
    case 'participation':
      return Target;
    case 'internship':
      return Briefcase;
    default:
      return Award;
  }
};

export default function ProfileWindow() {
  return (
    <div className="application-window">
      <div className="window-header-section">
        <div className="window-header-icon">
          <User size={24} strokeWidth={2} />
        </div>
        <p>About Me</p>
      </div>
      
      <div className="app-content">
        <div className="profile-header-card">
          <div className="profile-avatar">
            <User size={48} strokeWidth={1.5} />
          </div>
          <h3>{profileData.name}</h3>
          <div className="profile-title-badge">
            <Briefcase size={14} strokeWidth={2} />
            <span>{profileData.title}</span>
          </div>
          <div className="profile-location-badge">
            <MapPin size={14} strokeWidth={2} />
            <span>{profileData.location}</span>
          </div>
        </div>

        <div className="info-card">
          <div className="info-card-header">
            <div className="info-card-icon">
              <Briefcase size={18} strokeWidth={2} />
            </div>
            <h4>Professional Summary</h4>
          </div>
          <div className="info-card-content">
            {profileData.summary.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="info-card">
          <div className="info-card-header">
            <div className="info-card-icon">
              <GraduationCap size={18} strokeWidth={2} />
            </div>
            <h4>Education</h4>
          </div>
          <div className="info-card-content">
            <p className="education-degree">
              <strong>{educationData.degree}</strong> in {educationData.field}
            </p>
            <p className="education-college">{educationData.college}</p>
            <p className="education-details">
              {educationData.university} • CGPA: {educationData.cgpa} • {educationData.year}
            </p>
          </div>
        </div>

        <div className="info-card">
          <div className="info-card-header">
            <div className="info-card-icon">
              <Trophy size={18} strokeWidth={2} />
            </div>
            <h4>Achievements</h4>
          </div>
          <div className="info-card-content">
            <ul className="achievements-list">
              {achievementsData.map((achievement) => {
                const IconComponent = getAchievementIcon(achievement.type);
                return (
                  <li key={achievement.id}>
                    <IconComponent size={16} strokeWidth={2} />
                    <span>{achievement.title}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
