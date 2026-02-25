import { useState, useCallback, useEffect } from 'react';
import MenuBar from './MenuBar';
import DesktopShortcut from './DesktopShortcut';
import Taskbar from './Taskbar';
import WindowFrame from './WindowFrame';
import ProfileWindow from './applications/ProfileWindow';
import ProjectsWindow from './applications/ProjectsWindow';
import SkillsWindow from './applications/SkillsWindow';
import ContactWindow from './applications/ContactWindow';
import BrowserWindow from './applications/BrowserWindow';
import './Desktop.css';

const APPLICATIONS = {
  profile: {
    key: 'profile',
    name: 'About Me',
    icon: '👤',
    component: ProfileWindow,
    width: 60,
  },
  projects: {
    key: 'projects',
    name: 'My Projects',
    icon: '💼',
    component: ProjectsWindow,
    width: 55,
  },
  skills: {
    key: 'skills',
    name: 'Skills',
    icon: '⚡',
    component: SkillsWindow,
    width: 50,
  },
  contact: {
    key: 'contact',
    name: 'Contact',
    icon: '📧',
    component: ContactWindow,
    width: 50,
  },
  safari: {
    key: 'safari',
    name: 'Safari',
    icon: '🧭',
    component: BrowserWindow,
    width: 70,
  },
};

export default function Desktop({ onExplore }) {
  const [windows, setWindows] = useState({});
  const [shortcuts] = useState(
    Object.keys(APPLICATIONS).map(key => ({
      ...APPLICATIONS[key],
      onOpen: () => addWindow(key),
    }))
  );

  useEffect(() => {
    // Auto-open profile window on mount
    const timer = setTimeout(() => {
      addWindow('profile');
    }, 500);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getHighestZIndex = useCallback(() => {
    let highest = 0;
    Object.values(windows).forEach(win => {
      if (win.zIndex > highest) highest = win.zIndex;
    });
    return highest;
  }, [windows]);

  const addWindow = useCallback((key) => {
    setWindows(prev => ({
      ...prev,
      [key]: {
        zIndex: getHighestZIndex() + 1,
        minimized: false,
        name: APPLICATIONS[key].name,
        icon: APPLICATIONS[key].icon,
      },
    }));
  }, [getHighestZIndex]);

  const removeWindow = useCallback((key) => {
    setWindows(prev => {
      const newWindows = { ...prev };
      delete newWindows[key];
      return newWindows;
    });
  }, []);

  const minimizeWindow = useCallback((key) => {
    setWindows(prev => ({
      ...prev,
      [key]: { ...prev[key], minimized: true },
    }));
  }, []);

  const toggleMinimize = useCallback((key) => {
    setWindows(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        minimized: !prev[key].minimized,
        zIndex: getHighestZIndex() + 1,
      },
    }));
  }, [getHighestZIndex]);

  const onWindowInteract = useCallback((key) => {
    setWindows(prev => ({
      ...prev,
      [key]: { ...prev[key], zIndex: getHighestZIndex() + 1 },
    }));
  }, [getHighestZIndex]);

  return (
    <div className="desktop">
      <MenuBar />
      
      <div className="desktop-shortcuts">
        {shortcuts.map((shortcut) => (
          <DesktopShortcut
            key={shortcut.key}
            icon={shortcut.icon}
            name={shortcut.name}
            onOpen={shortcut.onOpen}
          />
        ))}
        
        <DesktopShortcut
          icon="🚀"
          name="Explore 3D"
          onOpen={onExplore}
          highlight
        />
      </div>

      {Object.keys(windows).map(key => {
        const window = windows[key];
        const app = APPLICATIONS[key];
        const AppComponent = app.component;

        return (
          <WindowFrame
            key={key}
            title={window.name}
            icon={window.icon}
            zIndex={window.zIndex}
            minimized={window.minimized}
            width={app.width}
            onClose={() => removeWindow(key)}
            onMinimize={() => minimizeWindow(key)}
            onInteract={() => onWindowInteract(key)}
          >
            <AppComponent />
          </WindowFrame>
        );
      })}

      <Taskbar
        windows={windows}
        toggleMinimize={toggleMinimize}
        onExplore={onExplore}
        applications={APPLICATIONS}
        openWindow={addWindow}
      />
    </div>
  );
}
