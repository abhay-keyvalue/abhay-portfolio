import './ApplicationWindow.css';

export default function ProfileWindow() {
  return (
    <div className="application-window">
      <h2>👤 About Me</h2>
      <div className="app-content">
        <div className="profile-header">
          <h3>Abhay Balan</h3>
          <p className="profile-title">Senior Software Engineer</p>
          <p className="profile-location">📍 Ernakulam, India</p>
        </div>

        <div className="profile-section">
          <h4>Professional Summary</h4>
          <p>
            Highly skilled Senior Software Engineer with <strong>6 years of experience</strong> specializing in React Native, 
            React.js, JavaScript, and cross-platform mobile and web development. Proven expertise in building 
            high-performance applications, cross-platform SDKs, and leading front-end architecture across 
            healthcare, e-commerce, and social media domains.
          </p>
          <p>
            Adept at optimizing performance, implementing CI/CD pipelines, and collaborating across functional 
            teams. Experienced in open-source contributions and leveraging AI-powered coding tools like Cursor 
            for 10x productivity.
          </p>
        </div>

        <div className="profile-section">
          <h4>🎓 Education</h4>
          <p><strong>Bachelor of Technology</strong> in Computer Science and Engineering</p>
          <p>Mar Athanasius College of Engineering, Kothamangalam</p>
          <p>APJ Abdul Kalam Technological University • CGPA: 7.64 • 2019</p>
        </div>

        <div className="profile-section">
          <h4>🏆 Achievements</h4>
          <ul>
            <li>🥈 Runner Up in Vibecode 1.0 (vibe coding hackathon)</li>
            <li>🥈 Runner Up in keycode 2023 (hackathon hosted by keyvalue)</li>
            <li>🎯 Participated in Smart India Hackathon Grand Finale 2017</li>
            <li>💼 Completed internship at TCS in 2019</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
