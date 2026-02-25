import { useState, useCallback, useEffect } from 'react';
import { User, Briefcase, Zap, Mail, Globe, Music, Rocket } from 'lucide-react';
import MenuBar from './MenuBar';
import DesktopShortcut from './DesktopShortcut';
import Taskbar from './Taskbar';
import WindowFrame from './WindowFrame';
import ProfileWindow from './applications/ProfileWindow';
import ProjectsWindow from './applications/ProjectsWindow';
import SkillsWindow from './applications/SkillsWindow';
import ContactWindow from './applications/ContactWindow';
import BrowserWindow from './applications/BrowserWindow';
import MusicPlayerWindow from './applications/MusicPlayerWindow';
import './Desktop.css';

const APPLICATIONS = {
  profile: {
    key: 'profile',
    name: 'About Me',
    icon: User,
    component: ProfileWindow,
    width: 60,
  },
  projects: {
    key: 'projects',
    name: 'My Projects',
    icon: Briefcase,
    component: ProjectsWindow,
    width: 55,
  },
  skills: {
    key: 'skills',
    name: 'Skills',
    icon: Zap,
    component: SkillsWindow,
    width: 50,
  },
  contact: {
    key: 'contact',
    name: 'Contact',
    icon: Mail,
    component: ContactWindow,
    width: 50,
  },
  safari: {
    key: 'safari',
    name: 'Safari',
    icon: Globe,
    component: BrowserWindow,
    width: 70,
  },
  music: {
    key: 'music',
    name: 'Music',
    icon: Music,
    component: MusicPlayerWindow,
    width: 45,
  },
};

export default function Desktop({ onExplore }) {
  const [windows, setWindows] = useState({});
  const [shortcuts] = useState(
    Object.keys(APPLICATIONS).map(key => {
      const app = APPLICATIONS[key];
      return {
        key: app.key,
        name: app.name,
        icon: app.icon,
        onOpen: () => addWindow(key),
      };
    })
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
        appKey: key,
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

  const handleShutdown = useCallback(() => {
    setWindows({});
  }, []);

  return (
    <div className="desktop">
      <MenuBar onShutdown={handleShutdown} />
      
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
          icon={Rocket}
          name="Explore 3D"
          onOpen={onExplore}
          highlight
        />
      </div>

      {Object.keys(windows).map(key => {
        const window = windows[key];
        const app = APPLICATIONS[key];
        const AppComponent = app.component;
        const IconComponent = app.icon;

        return (
          <WindowFrame
            key={key}
            title={window.name}
            icon={IconComponent}
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
