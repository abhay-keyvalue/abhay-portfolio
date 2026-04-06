import GameCanvas from './components/GameCanvas';
import { createElement } from 'react';

export function RacingGame({ width = 960, height = 540, className = '' }) {
  return createElement(GameCanvas, { width, height, className });
}

export { GameCanvas };

