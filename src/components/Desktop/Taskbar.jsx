
// macOS-style icon components for taskbar
const TaskbarIcon = ({ emoji, gradient, size = 32 }) => (
  <div style={{
    width: size,
    height: size,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: size * 0.65,
    background: gradient,
    borderRadius: '20%',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
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

const FinderIcon = () => <TaskbarIcon emoji="📁" gradient="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" />;
const SafariIcon = () => <TaskbarIcon emoji="🧭" gradient="linear-gradient(135deg, #667eea 0%, #667eea 100%)" />;
const MusicIcon = () => <TaskbarIcon emoji="🎵" gradient="linear-gradient(135deg, #fa709a 0%, #fee140 100%)" />;
const ProfileIcon = () => <TaskbarIcon emoji="👤" gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)" />;
const ProjectsIcon = () => <TaskbarIcon emoji="💼" gradient="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" />;
const SkillsIcon = () => <TaskbarIcon emoji="⚡" gradient="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" />;
const ContactIcon = () => <TaskbarIcon emoji="✉️" gradient="linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)" />;
const RocketIcon = () => <TaskbarIcon emoji="🚀" gradient="linear-gradient(135deg, #30cfd0 0%, #330867 100%)" />;

export default function Taskbar({ windows, toggleMinimize, onExplore, applications, openWindow }) {
  const dockApps = [
    { key: 'finder', icon: FinderIcon, name: 'Finder', disabled: true },
    { key: 'safari', icon: SafariIcon, name: 'Safari' },
    { key: 'music', icon: MusicIcon, name: 'Music' },
    { key: 'divider1', isDivider: true },
    { key: 'profile', icon: ProfileIcon, name: 'About Me' },
    { key: 'projects', icon: ProjectsIcon, name: 'Experience' },
    { key: 'skills', icon: SkillsIcon, name: 'Skills' },
    { key: 'contact', icon: ContactIcon, name: 'Contact' },
    { key: 'divider2', isDivider: true },
    { key: 'explore', icon: RocketIcon, name: 'Explore 3D', isSpecial: true },
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
    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 h-[56px] bg-white/25 backdrop-blur-[40px] backdrop-saturate-[180%] flex items-center px-2 gap-1 z-[10000] rounded-[10px] border-[0.5px] border-white/30 shadow-[0_10px_40px_rgba(0,0,0,0.2),0_0_0_0.5px_rgba(255,255,255,0.2)_inset]">
      <div className="flex gap-1 px-1 items-center">
        {dockApps.map(app => {
          if (app.isDivider) {
            return <div key={app.key} className="w-px h-10 bg-white/20 mx-1"></div>;
          }
          
          const isOpen = windows[app.key];
          const isActive = isOpen && !windows[app.key].minimized;
          
          const IconComponent = app.icon;
          
          return (
            <button
              key={app.key}
              className={`w-[60px] h-[60px] p-0 bg-transparent border-none rounded-xl text-[28px] cursor-pointer flex items-center justify-center transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] relative ${app.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:-translate-y-2 hover:scale-170 active:-translate-y-1 active:scale-95'} ${isOpen ? 'after:content-[""] after:absolute after:bottom-[-8px] after:w-1 after:h-1 after:bg-white/60 after:rounded-full' : ''} ${isActive ? 'after:bg-white/90 after:shadow-[0_0_8px_rgba(255,255,255,0.6)]' : ''}`}
              onClick={() => handleAppClick(app)}
              title={app.name}
              disabled={app.disabled}
            >
              <span className="flex items-center justify-center text-white [filter:drop-shadow(0_2px_4px_rgba(0,0,0,0.2))] transition-[filter] duration-200 hover:[filter:drop-shadow(0_4px_8px_rgba(0,0,0,0.3))]">
                <IconComponent />
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
