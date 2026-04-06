import Phaser from 'phaser';

// velocityFromRotation() can be called like a plain function.
const VelocityFromRotation = Phaser.Physics.Arcade.ArcadePhysics.prototype.velocityFromRotation;

function createCarDataUrl() {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#facc15';
  ctx.beginPath();
  ctx.roundRect(10, 4, 44, 56, 10);
  ctx.fill();

  ctx.fillStyle = '#1f2937';
  ctx.beginPath();
  ctx.roundRect(18, 14, 28, 22, 6);
  ctx.fill();

  ctx.fillStyle = '#111827';
  ctx.beginPath();
  ctx.roundRect(6, 14, 6, 16, 2);
  ctx.roundRect(52, 14, 6, 16, 2);
  ctx.roundRect(6, 36, 6, 16, 2);
  ctx.roundRect(52, 36, 6, 16, 2);
  ctx.fill();

  return canvas.toDataURL('image/png');
}

function createSoilDataUrl() {
  const tileSize = 128;
  const canvas = document.createElement('canvas');
  canvas.width = tileSize;
  canvas.height = tileSize;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  ctx.fillStyle = '#2b2f36';
  ctx.fillRect(0, 0, tileSize, tileSize);
  ctx.fillStyle = '#20242b';
  for (let y = 0; y < tileSize; y += 16) {
    for (let x = 0; x < tileSize; x += 16) {
      if ((x + y) % 32 === 0) ctx.fillRect(x, y, 16, 16);
    }
  }
  ctx.setLineDash([10, 8]);
  ctx.strokeStyle = '#f8fafc';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(tileSize / 2, 0);
  ctx.lineTo(tileSize / 2, tileSize);
  ctx.stroke();
  ctx.setLineDash([]);

  return canvas.toDataURL('image/png');
}

class Racecar extends Phaser.Physics.Arcade.Image {
  throttle = 0;

  configure() {
    this.angle = -90;
    this.body.angularDrag = 120;
    this.body.maxSpeed = 1024;
    this.body.setSize(64, 64, true);
  }

  update(delta, cursorKeys) {
    const { left, right, up, down } = cursorKeys;

    if (up.isDown) {
      this.throttle += 0.5 * delta;
    } else if (down.isDown) {
      this.throttle -= 0.5 * delta;
    }

    this.throttle = Phaser.Math.Clamp(this.throttle, -64, 1024);

    if (left.isDown) {
      this.body.setAngularAcceleration(-360);
    } else if (right.isDown) {
      this.body.setAngularAcceleration(360);
    } else {
      this.body.setAngularAcceleration(0);
    }

    VelocityFromRotation(this.rotation, this.throttle, this.body.velocity);
    this.body.maxAngular = Phaser.Math.Clamp((90 * this.body.speed) / 1024, 0, 90);
  }
}

export default class MainScene extends Phaser.Scene {
  preload() {
    this.load.image('soil', createSoilDataUrl());
    this.load.image('car', createCarDataUrl());
  }

  create() {
    const { width, height } = this.scale;
    this.ground = this.add.tileSprite(width / 2, height / 2, width, height, 'soil').setScrollFactor(0, 0);

    this.car = new Racecar(this, width / 2, height * 0.9, 'car');
    this.add.existing(this.car);
    this.physics.add.existing(this.car);
    this.car.configure();

    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.cameras.main.startFollow(this.car);
  }

  update(_, delta) {
    const { scrollX, scrollY } = this.cameras.main;
    this.ground.setTilePosition(scrollX, scrollY);
    this.car.update(delta, this.cursorKeys);
  }
}