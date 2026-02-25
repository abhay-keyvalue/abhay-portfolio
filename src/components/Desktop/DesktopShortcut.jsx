import { useState } from 'react';
import './DesktopShortcut.css';

export default function DesktopShortcut({ icon, name, onOpen, highlight }) {
  const [clicks, setClicks] = useState(0);

  const handleClick = () => {
    const newClicks = clicks + 1;
    setClicks(newClicks);

    if (newClicks === 2) {
      onOpen();
      setClicks(0);
    }

    setTimeout(() => setClicks(0), 500);
  };

  return (
    <div
      className={`desktop-shortcut ${clicks === 1 ? 'selected' : ''} ${highlight ? 'highlight' : ''}`}
      onClick={handleClick}
    >
      <div className="shortcut-icon">{icon}</div>
      <div className="shortcut-name">{name}</div>
    </div>
  );
}
