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
import MusicPlayerWindow from './applications/MusicPlayerWindow';
import BreakoutWindow from './applications/BreakoutWindow';
import RacingGameWindow from './applications/RacingGameWindow';

// macOS-style icon components
const MacIcon = ({ emoji, gradient }) => (
  <div style={{
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '42px',
    background: gradient,
    borderRadius: '20%',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
    position: 'relative',
  }}>
    <div style={{
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 50%, rgba(0,0,0,0.1) 100%)',
      borderRadius: '20%',
    }} />
    <span style={{ position: 'relative', zIndex: 1, filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))' }}>{emoji}</span>
  </div>
);

const ProfileIcon = () => <MacIcon emoji="👤" gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)" />;
const ProjectsIcon = () => <MacIcon emoji="💼" gradient="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" />;
const SkillsIcon = () => <MacIcon emoji="⚡" gradient="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" />;
const ContactIcon = () => <MacIcon emoji="✉️" gradient="linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)" />;
const SafariIcon = () => <MacIcon emoji="🧭" gradient="linear-gradient(135deg, #667eea 0%, #667eea 100%)" />;
const MusicIcon = () => <MacIcon emoji="🎵" gradient="linear-gradient(135deg, #fa709a 0%, #fee140 100%)" />;
const BreakoutIcon = () => <MacIcon emoji="🕹️" gradient="linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)" />;
const RacingIcon = () => <MacIcon emoji="🏎️" gradient="linear-gradient(135deg, #f43f5e 0%, #ffffff 100%)" />;
const RocketIcon = () => <MacIcon emoji="🚀" gradient="linear-gradient(135deg, #30cfd0 0%, #330867 100%)" />;

const APPLICATIONS = {
  profile: {
    key: 'profile',
    name: 'About Me',
    icon: ProfileIcon,
    component: ProfileWindow,
    width: 60,
  },
  projects: {
    key: 'projects',
    name: 'My Projects',
    icon: ProjectsIcon,
    component: ProjectsWindow,
    width: 55,
  },
  skills: {
    key: 'skills',
    name: 'Skills',
    icon: SkillsIcon,
    component: SkillsWindow,
    width: 50,
  },
  contact: {
    key: 'contact',
    name: 'Contact',
    icon: ContactIcon,
    component: ContactWindow,
    width: 50,
  },
  safari: {
    key: 'safari',
    name: 'Safari',
    icon: SafariIcon,
    component: BrowserWindow,
    width: 70,
  },
  music: {
    key: 'music',
    name: 'Music',
    icon: MusicIcon,
    component: MusicPlayerWindow,
    width: 45,
  },
  breakout: {
    key: 'breakout',
    name: 'Breakout',
    icon: BreakoutIcon,
    component: BreakoutWindow,
    width: 70,
  },
  racing: {
    key: 'racing',
    name: 'Racing',
    icon: RacingIcon,
    component: RacingGameWindow,
    width: 75,
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
    <div className="w-screen h-screen bg-gradient-to-br from-[#667eea] via-[#764ba2] to-[#f093fb] relative overflow-hidden font-[-apple-system,BlinkMacSystemFont,'SF_Pro_Display','Segoe_UI',sans-serif] before:content-[''] before:absolute before:inset-0 before:[background-image:radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.1)_0%,transparent_60%),radial-gradient(circle_at_70%_70%,rgba(0,0,0,0.05)_0%,transparent_50%)] before:pointer-events-none">
      <MenuBar onShutdown={handleShutdown} />
      
      <div className="absolute top-[50px] left-5 h-[calc(100vh-60px)] flex flex-col flex-wrap content-start items-end gap-2.5 z-[1]">
        {shortcuts.map((shortcut) => (
          <DesktopShortcut
            key={shortcut.key}
            icon={shortcut.icon}
            name={shortcut.name}
            onOpen={shortcut.onOpen}
          />
        ))}
        
        <DesktopShortcut
          icon={RocketIcon}
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
