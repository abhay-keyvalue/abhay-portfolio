import { useState, useRef, useEffect } from 'react';

export default function WindowFrame({
  title,
  icon: IconComponent,
  children,
  zIndex,
  minimized,
  onClose,
  onMinimize,
  onInteract,
  width,
  initialPosition,
}) {
  const [position, setPosition] = useState(() => {
    if (initialPosition) {
      return initialPosition;
    }
    const defaultWidth = width ? (window.innerWidth * parseFloat(width) / 100) : 500;
    return {
      x: (window.innerWidth - defaultWidth) / 2,
      y: 50 + Math.random() * 50,
    };
  });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const windowRef = useRef(null);

  useEffect(() => {
    if (isDragging) {
      const handleMouseMove = (e) => {
        const newX = e.clientX - dragStart.x;
        const newY = e.clientY - dragStart.y;
        
        const rect = windowRef.current?.getBoundingClientRect();
        const windowWidth = rect ? rect.width : 500;
        const windowHeight = rect ? rect.height : 350;
        
        const maxX = window.innerWidth - windowWidth;
        const maxY = window.innerHeight - windowHeight;
        
        setPosition({
          x: Math.max(0, Math.min(newX, maxX)),
          y: Math.max(0, Math.min(newY, maxY)),
        });
      };

      const handleMouseUp = () => {
        setIsDragging(false);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragStart]);

  const handleMouseDown = (e) => {
    const isButton = e.target.closest('.window-btn');
    if (isButton) return;
    
    const titlebar = e.target.closest('.window-titlebar');
    if (titlebar) {
      e.preventDefault();
      const rect = windowRef.current.getBoundingClientRect();
      setDragStart({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setIsDragging(true);
      onInteract();
    }
  };

  const isBrowser = title === 'Safari';
  const isMusic = title === 'Music';
  
  return (
    <div
      ref={windowRef}
      className={`absolute w-[500px] min-h-[350px] bg-[rgba(242,242,247,0.8)] backdrop-blur-[40px] backdrop-saturate-[180%] rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.3),0_0_0_0.5px_rgba(255,255,255,0.2)_inset] overflow-hidden transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] max-md:!w-[90vw] max-md:!left-[5vw] max-md:!top-[50px] ${minimized ? 'opacity-0 scale-[0.2] translate-y-[500px] pointer-events-none' : ''} ${isDragging ? 'cursor-grabbing !transition-none shadow-[0_30px_80px_rgba(0,0,0,0.4),0_0_0_0.5px_rgba(255,255,255,0.2)_inset] [&_*]:!cursor-grabbing' : ''} ${isBrowser ? 'min-h-[500px]' : ''} ${isMusic ? 'min-h-[400px]' : ''}`}
      style={{
        left: position.x,
        top: position.y,
        zIndex,
        width: width ? `${width}%` : undefined,
        height: isBrowser ? '70vh' : isMusic ? 'auto' : undefined,
        maxHeight: isMusic ? '85vh' : undefined,
      }}
      onMouseDown={onInteract}
    >
      <div className="window-titlebar bg-gradient-to-b from-white/80 to-[rgba(242,242,247,0.8)] backdrop-blur-[20px] py-3 px-4 flex justify-between items-center cursor-move select-none border-b-[0.5px] border-black/8 [&_*]:cursor-move [&_*]:select-none max-md:py-2.5 max-md:px-3" onMouseDown={handleMouseDown}>
        <div className="text-[#1d1d1f] text-[13px] font-semibold flex items-center gap-2 flex-1 justify-center tracking-tight" style={{ paddingTop: 4, paddingBottom: 4 }}>
          {title}
        </div>
        <div className="flex gap-2 absolute left-3 max-md:gap-1.5">
          <button className="window-btn w-3 h-3 border-none rounded-full !cursor-pointer hover:!cursor-pointer flex items-center justify-center transition-all duration-200 text-[8px] p-0 text-black/60 bg-[#ff5f57] hover:bg-[#ff4136] before:content-[''] before:opacity-0 before:transition-opacity before:duration-200 hover:before:content-['×'] hover:before:opacity-100 hover:before:text-xs hover:before:font-bold max-md:w-2.5 max-md:h-2.5" onClick={onClose} title="Close"></button>
          <button className="window-btn w-3 h-3 border-none rounded-full !cursor-pointer hover:!cursor-pointer flex items-center justify-center transition-all duration-200 text-[8px] p-0 text-black/60 bg-[#ffbd2e] hover:bg-[#ffaa00] before:content-[''] before:opacity-0 before:transition-opacity before:duration-200 hover:before:content-['−'] hover:before:opacity-100 hover:before:text-[10px] hover:before:font-bold max-md:w-2.5 max-md:h-2.5" onClick={onMinimize} title="Minimize"></button>
          <button className="window-btn w-3 h-3 border-none rounded-full !cursor-pointer hover:!cursor-pointer flex items-center justify-center transition-all duration-200 text-[8px] p-0 text-black/60 bg-[#28c840] hover:bg-[#1fa033] max-md:w-2.5 max-md:h-2.5" title="Zoom"></button>
        </div>
      </div>
      <div className={`p-6 max-h-[calc(80vh-60px)] overflow-y-auto bg-white/60 [&::-webkit-scrollbar]:w-3 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-black/20 [&::-webkit-scrollbar-thumb]:rounded-[10px] [&::-webkit-scrollbar-thumb]:border-[3px] [&::-webkit-scrollbar-thumb]:border-transparent [&::-webkit-scrollbar-thumb]:bg-clip-padding [&::-webkit-scrollbar-thumb:hover]:bg-black/30 ${title === 'Safari' ? 'p-0 max-h-none overflow-hidden flex flex-col h-[calc(100%-49px)]' : ''} ${isMusic ? 'max-h-none overflow-y-auto' : ''}`}>{children}</div>
    </div>
  );
}
