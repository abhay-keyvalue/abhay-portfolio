import { memo, useRef } from 'react';
import { usePhaserGame } from '../hooks/usePhaserGame';

function GameCanvas({ width = 960, height = 540, className = '' }) {
  const mountRef = useRef(null);
  usePhaserGame(mountRef, { width, height });

  return <div ref={mountRef} className={`racing-game-canvas ${className}`.trim()} />;
}

export default memo(GameCanvas);

