import Phaser from 'phaser';
import MainScene from './scenes/MainScene';

export function createGameConfig({ parent, width = 960, height = 540 } = {}) {
  return {
    type: Phaser.AUTO,
    parent,
    width,
    height,
    backgroundColor: '#0b1020',
    physics: {
      default: 'arcade',
      arcade: {
        debug: false,
      },
    },
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width,
      height,
    },
    scene: [MainScene],
  };
}

