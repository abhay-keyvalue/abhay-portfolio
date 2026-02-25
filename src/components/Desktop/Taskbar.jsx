import './Taskbar.css';

export default function Taskbar({ windows, toggleMinimize, onExplore, applications, openWindow }) {
  const dockApps = [
    { key: 'finder', icon: '📁', name: 'Finder', disabled: true },
    { key: 'safari', icon: '🧭', name: 'Safari' },
    { key: 'divider1', isDivider: true },
    { key: 'profile', icon: '👤', name: 'About Me' },
    { key: 'projects', icon: '💼', name: 'Experience' },
    { key: 'skills', icon: '⚡', name: 'Skills' },
    { key: 'contact', icon: '📧', name: 'Contact' },
    { key: 'divider2', isDivider: true },
    { key: 'explore', icon: '🚀', name: 'Explore 3D', isSpecial: true },
  ];

  const handleAppClick = (app) => {
    if (app.disabled) return;
    if (app.isSpecial) {
      onExplore();
      return;
    }
    if (app.isDivider) return;
    
    if (windows[app.key]) {
      toggleMinimize(app.key);
    } else {
      openWindow(app.key);
    }
  };

  return (
    <div className="taskbar">
      <div className="taskbar-apps">
        {dockApps.map(app => {
          if (app.isDivider) {
            return <div key={app.key} className="taskbar-divider"></div>;
          }
          
          const isOpen = windows[app.key];
          const isActive = isOpen && !windows[app.key].minimized;
          
          return (
            <button
              key={app.key}
              className={`taskbar-app ${isActive ? 'active' : ''} ${isOpen ? 'running' : ''} ${app.disabled ? 'disabled' : ''}`}
              onClick={() => handleAppClick(app)}
              title={app.name}
              disabled={app.disabled}
            >
              <span className="taskbar-app-icon">{app.icon}</span>
              {isOpen && <div className="taskbar-indicator"></div>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
