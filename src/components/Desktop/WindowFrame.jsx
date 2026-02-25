import { useState, useRef, useEffect } from 'react';
import './WindowFrame.css';

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
      className={`window-frame ${minimized ? 'minimized' : ''} ${isDragging ? 'dragging' : ''} ${isBrowser ? 'browser-frame' : ''} ${isMusic ? 'music-frame' : ''}`}
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
      <div className="window-titlebar" onMouseDown={handleMouseDown}>
        <div className="window-title">
          <span className="window-icon">
            {IconComponent && <IconComponent size={16} strokeWidth={2} />}
          </span>
          {title}
        </div>
        <div className="window-controls">
          <button className="window-btn close" onClick={onClose} title="Close"></button>
          <button className="window-btn minimize" onClick={onMinimize} title="Minimize"></button>
          <button className="window-btn maximize" title="Zoom"></button>
        </div>
      </div>
      <div className={`window-content ${title === 'Safari' ? 'no-padding' : ''}`}>{children}</div>
    </div>
  );
}
