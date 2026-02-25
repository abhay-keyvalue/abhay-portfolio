import { useState, useEffect } from 'react';
import './MenuBar.css';

export default function MenuBar() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="menubar">
      <div className="menubar-left">
        <div className="menu-item" style={{ fontSize: '16px', fontWeight: 'bold' }}>
          A
        </div>
        <div className="menu-item menu-title">Portfolio</div>
        <div className="menu-item">File</div>
        <div className="menu-item">View</div>
        <div className="menu-item">Help</div>
      </div>

      <div className="menubar-right">
        <div className="menu-item">
          {time.toLocaleDateString('en-US', { 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric' 
          })}
        </div>
        <div className="menu-item">
          {time.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </div>
      </div>
    </div>
  );
}
