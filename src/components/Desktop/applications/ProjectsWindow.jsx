import './ApplicationWindow.css';

export default function ProjectsWindow() {
  return (
    <div className="application-window">
      <h2>💼 Experience</h2>
      <div className="app-content">
        <div className="experience-card">
          <div className="experience-header">
            <div>
              <h3>Senior Software Engineer</h3>
              <p className="company">Keyvalue Software Systems, Kochi</p>
            </div>
            <p className="duration">July 2019 - Present</p>
          </div>
          
          <div className="experience-content">
            <ul>
              <li>Played a pivotal role in the development of <strong>healthcare, e-commerce, and social media projects</strong> using React Native from inception to implementation.</li>
              <li>Built <strong>React-Native SDKs</strong> for internal and outsourced projects, assuring seamless integration and excellent performance.</li>
              <li>Led a comprehensive <strong>UI performance optimization initiative</strong> and significantly boosted the overall performance of the application.</li>
              <li>Developed and maintained <strong>CI/CD build pipelines</strong> for React Native applications (iOS & Android) using GitHub Actions, automating testing and deployment processes.</li>
              <li>Expertise in <strong>App Store and Play Store app release procedures</strong>, ensuring timely and successful app launches.</li>
              <li>Proficient in working with various <strong>Firebase products</strong> like Firestore, Authentication, Cloud Messaging, Crashlytics and Realtime Database.</li>
              <li>Worked on a complex <strong>real-time chat project</strong> built using Sendbird, ensuring efficient communication and collaboration functionalities.</li>
              <li>Collaborated closely with <strong>Android (Kotlin) and iOS (Swift) teams</strong> to streamline SDK development processes and enhance cross-platform compatibility.</li>
              <li>Contributed to internal projects built in <strong>React JS and Next JS</strong>.</li>
              <li>Actively worked on <strong>open-source projects</strong> and adopted Cursor AI for significantly improved development speed.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
