import { useState } from 'react';

export default function DesktopShortcut({ icon: IconComponent, name, onOpen, highlight }) {
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
      className={`w-20 p-2.5 flex flex-col items-center gap-2 cursor-pointer rounded-xl transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] relative hover:scale-[1.08] active:scale-[1.02] active:duration-100 motion-reduce:transition-none ${clicks === 1 ? 'bg-white/30 backdrop-blur-[20px] shadow-[0_4px_16px_rgba(0,0,0,0.1)]' : ''}`}
      onClick={handleClick}
      style={{ padding: 10 }}
    >
      <div className="flex items-center justify-center w-16 h-16 text-white [filter:drop-shadow(0_2px_4px_rgba(0,0,0,0.2))_drop-shadow(0_4px_12px_rgba(0,0,0,0.15))] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] origin-center relative group-hover:-translate-y-1 group-active:-translate-y-0.5 group-active:scale-[0.98] motion-reduce:transition-none">
        {IconComponent && <IconComponent />}
      </div>
      <div className="text-white text-xs font-semibold text-center [text-shadow:0_1px_2px_rgba(0,0,0,0.4),0_2px_8px_rgba(0,0,0,0.3)] break-words leading-[1.3] tracking-tighter transition-all duration-200 hover:[text-shadow:0_1px_3px_rgba(0,0,0,0.5),0_2px_12px_rgba(0,0,0,0.4)] hover:-translate-y-0.5 motion-reduce:transition-none">{name}</div>
    </div>
  );
}
