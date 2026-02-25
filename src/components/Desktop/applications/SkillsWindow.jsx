import './ApplicationWindow.css';

export default function SkillsWindow() {
  const skills = {
    'Frontend Technologies': [
      'JavaScript (ES6+)',
      'TypeScript',
      'React Native',
      'React.js',
      'HTML5',
      'CSS3',
      'Flutter',
      'Next.js'
    ],
    'Mobile Development': [
      'Android Studio',
      'Xcode',
      'iOS Development',
      'SDK Development',
      'Play Store Release',
      'App Store Release'
    ],
    'State Management': [
      'Redux Toolkit',
      'Redux.js'
    ],
    'Version Control & CI/CD': [
      'Git',
      'GitHub',
      'Bitbucket',
      'GitHub Actions',
      'CI/CD Pipelines'
    ],
    'Backend & Integrations': [
      'Firebase',
      'Firestore',
      'Firebase Auth',
      'Cloud Messaging',
      'Crashlytics',
      'Sendbird',
      'REST APIs',
      'GraphQL',
      'AWS'
    ],
    'UI/UX & Performance': [
      'Performance Enhancement',
      'Responsive Design',
      'Progressive Web Apps'
    ],
    'Collaboration & PM': [
      'Agile Methodologies',
      'Jira',
      'Trello',
      'Cross-functional Teams'
    ]
  };

  return (
    <div className="application-window">
      <h2>⚡ Technical Skills</h2>
      <div className="app-content">
        {Object.entries(skills).map(([category, items]) => (
          <div key={category} className="skill-category">
            <h3>{category}</h3>
            <div className="skill-tags">
              {items.map(skill => (
                <span key={skill} className="skill-tag">{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
