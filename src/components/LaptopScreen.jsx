import { Html } from '@react-three/drei';
import './LaptopScreen.css';

export default function LaptopScreen() {
  return (
    <Html
      transform
      distanceFactor={0.5}
      position={[0, 0.05, 0.08]}
      rotation={[-0.3, 0, 0]}
      scale={0.13}
    >
      <div className="laptop-screen-content">
        <div className="screen-header">
          <div className="window-controls">
            <span className="control close"></span>
            <span className="control minimize"></span>
            <span className="control maximize"></span>
          </div>
          <div className="screen-title">abhay@portfolio:~$</div>
        </div>
        
        <div className="screen-body">
          <div className="terminal-line">
            <span className="prompt">$</span>
            <span className="command">cat profile.json</span>
          </div>
          <div className="terminal-output">
            <pre>{`{
  "name": "Abhay Balan",
  "role": "Senior Software Engineer",
  "specialization": [
    "React Native",
    "Frontend Architecture",
    "3D Web Experiences"
  ],
  "status": "Available for projects",
  "passion": "Building amazing digital experiences"
}`}</pre>
          </div>
          <div className="terminal-line">
            <span className="prompt">$</span>
            <span className="cursor-blink">_</span>
          </div>
        </div>
      </div>
    </Html>
  );
}
