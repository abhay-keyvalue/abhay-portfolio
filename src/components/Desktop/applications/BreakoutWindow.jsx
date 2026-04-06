import { useEffect, useRef, useState } from 'react';
import { Gamepad2, RotateCw, ExternalLink } from 'lucide-react';
import { prepareWithSegments, layoutWithLines } from '@chenglou/pretext';

const BREAKOUT_URL = 'https://pretextjs.dev/pretext-demo/showcase-breakout';
const CANVAS_WIDTH = 900;
const CANVAS_HEIGHT = 540;
const PADDLE_WIDTH = 140;
const PADDLE_HEIGHT = 14;
const BALL_RADIUS = 8;
const INITIAL_BALL_SPEED = 2.8;
const MAX_BALL_SPEED = 4.2;
const PADDLE_SPEED = 6;
const BRICK_COLS = 10;
const BRICK_ROWS = 6;
const BRICK_WIDTH = 78;
const BRICK_HEIGHT = 22;
const BRICK_GAP = 8;
const BRICK_START_X = 34;
const BRICK_START_Y = 42;

const LABELS = [
  'offset',
  'cache',
  'glyph',
  'segment',
  'stream',
  'inline',
  'reflow',
  'font',
  'layout',
  'measure',
];

function createBricks(level) {
  const bricks = [];
  for (let row = 0; row < BRICK_ROWS; row += 1) {
    const rowBricks = [];
    for (let col = 0; col < BRICK_COLS; col += 1) {
      rowBricks.push({
        x: BRICK_START_X + col * (BRICK_WIDTH + BRICK_GAP),
        y: BRICK_START_Y + row * (BRICK_HEIGHT + BRICK_GAP),
        width: BRICK_WIDTH,
        height: BRICK_HEIGHT,
        label: LABELS[(col + row + level) % LABELS.length],
        alive: true,
      });
    }
    bricks.push(rowBricks);
  }
  return bricks;
}

export default function BreakoutWindow() {
  const canvasRef = useRef(null);
  const frameRef = useRef(0);
  const pressedRef = useRef({ left: false, right: false });
  const stateRef = useRef(null);
  const pretextCacheRef = useRef(new Map());

  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1);
  const [status, setStatus] = useState('Press Space to Start');

  const movePaddleTo = (clientX) => {
    const canvas = canvasRef.current;
    const s = stateRef.current;
    if (!canvas || !s) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = CANVAS_WIDTH / rect.width;
    const xInCanvas = (clientX - rect.left) * scaleX;
    s.paddleX = Math.max(0, Math.min(CANVAS_WIDTH - PADDLE_WIDTH, xInCanvas - PADDLE_WIDTH / 2));
  };

  useEffect(() => {
    stateRef.current = {
      paddleX: (CANVAS_WIDTH - PADDLE_WIDTH) / 2,
      ballX: CANVAS_WIDTH / 2,
      ballY: CANVAS_HEIGHT - 70,
      ballDx: INITIAL_BALL_SPEED,
      ballDy: -INITIAL_BALL_SPEED,
      running: false,
      gameOver: false,
      level,
      score,
      lives,
      bricks: createBricks(level),
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'ArrowLeft') pressedRef.current.left = true;
      if (e.key === 'ArrowRight') pressedRef.current.right = true;
      if (e.key === ' ') {
        e.preventDefault();
        const s = stateRef.current;
        if (!s) return;
        if (s.gameOver) {
          resetGame();
          return;
        }
        s.running = !s.running;
        setStatus(s.running ? 'Playing' : 'Paused');
      }
    };
    const onKeyUp = (e) => {
      if (e.key === 'ArrowLeft') pressedRef.current.left = false;
      if (e.key === 'ArrowRight') pressedRef.current.right = false;
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    const draw = () => {
      const s = stateRef.current;
      if (!s) return;

      const drawPretext = (text, x, y, options = {}) => {
        const {
          maxWidth = 240,
          lineHeight = 14,
          font = '13px monospace',
          color = '#0a1a2f',
        } = options;
        const cacheKey = `${font}|${text}`;
        let prepared = pretextCacheRef.current.get(cacheKey);
        if (!prepared) {
          prepared = prepareWithSegments(text, font);
          pretextCacheRef.current.set(cacheKey, prepared);
        }
        const result = layoutWithLines(prepared, maxWidth, lineHeight);
        ctx.fillStyle = color;
        ctx.font = font;
        for (let i = 0; i < result.lines.length; i += 1) {
          ctx.fillText(result.lines[i].text, x, y + i * lineHeight);
        }
      };

      // Update
      if (s.running && !s.gameOver) {
        if (pressedRef.current.left) s.paddleX -= PADDLE_SPEED;
        if (pressedRef.current.right) s.paddleX += PADDLE_SPEED;
        s.paddleX = Math.max(0, Math.min(CANVAS_WIDTH - PADDLE_WIDTH, s.paddleX));

        s.ballX += s.ballDx;
        s.ballY += s.ballDy;

        if (s.ballX <= BALL_RADIUS || s.ballX >= CANVAS_WIDTH - BALL_RADIUS) s.ballDx *= -1;
        if (s.ballY <= BALL_RADIUS) s.ballDy *= -1;

        // Paddle collision
        const paddleY = CANVAS_HEIGHT - 34;
        if (
          s.ballY + BALL_RADIUS >= paddleY &&
          s.ballY + BALL_RADIUS <= paddleY + PADDLE_HEIGHT &&
          s.ballX >= s.paddleX &&
          s.ballX <= s.paddleX + PADDLE_WIDTH
        ) {
          s.ballDy = -Math.abs(s.ballDy);
          const hit = (s.ballX - (s.paddleX + PADDLE_WIDTH / 2)) / (PADDLE_WIDTH / 2);
          s.ballDx = 4.2 * hit;
        }

        // Brick collisions
        let aliveCount = 0;
        for (let r = 0; r < BRICK_ROWS; r += 1) {
          for (let c = 0; c < BRICK_COLS; c += 1) {
            const b = s.bricks[r][c];
            if (!b.alive) continue;
            aliveCount += 1;
            if (
              s.ballX + BALL_RADIUS > b.x &&
              s.ballX - BALL_RADIUS < b.x + b.width &&
              s.ballY + BALL_RADIUS > b.y &&
              s.ballY - BALL_RADIUS < b.y + b.height
            ) {
              b.alive = false;
              s.ballDy *= -1;
              s.score += 10;
              setScore(s.score);
            }
          }
        }

        if (aliveCount === 0) {
          s.level += 1;
          s.bricks = createBricks(s.level);
          s.ballX = CANVAS_WIDTH / 2;
          s.ballY = CANVAS_HEIGHT - 70;
          const nextSpeed = Math.min(MAX_BALL_SPEED, INITIAL_BALL_SPEED + s.level * 0.2);
          s.ballDx = Math.sign(s.ballDx || 1) * nextSpeed;
          s.ballDy = -nextSpeed;
          s.running = false;
          setLevel(s.level);
          setStatus(`Level ${s.level} - Press Space`);
        }

        // Miss
        if (s.ballY > CANVAS_HEIGHT + BALL_RADIUS) {
          s.lives -= 1;
          setLives(s.lives);
          if (s.lives <= 0) {
            s.running = false;
            s.gameOver = true;
            setStatus('Game Over - Press Space');
          } else {
            s.running = false;
            s.ballX = CANVAS_WIDTH / 2;
            s.ballY = CANVAS_HEIGHT - 70;
            s.ballDx = INITIAL_BALL_SPEED;
            s.ballDy = -INITIAL_BALL_SPEED;
            setStatus('Life Lost - Press Space');
          }
        }
      }

      // Draw
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      const bg = ctx.createLinearGradient(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      bg.addColorStop(0, '#071120');
      bg.addColorStop(1, '#0f2037');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      for (let r = 0; r < BRICK_ROWS; r += 1) {
        for (let c = 0; c < BRICK_COLS; c += 1) {
          const b = s.bricks[r][c];
          if (!b.alive) continue;
          ctx.fillStyle = `hsl(${(c * 22 + r * 18) % 360}, 80%, 70%)`;
          ctx.fillRect(b.x, b.y, b.width, b.height);
          drawPretext(b.label, b.x + 8, b.y + 15, {
            maxWidth: b.width - 12,
            lineHeight: 13,
            font: '12px monospace',
            color: '#0a1a2f',
          });
        }
      }

      ctx.fillStyle = '#9fd0ff';
      ctx.fillRect(s.paddleX, CANVAS_HEIGHT - 34, PADDLE_WIDTH, PADDLE_HEIGHT);

      ctx.beginPath();
      ctx.arc(s.ballX, s.ballY, BALL_RADIUS, 0, Math.PI * 2);
      ctx.fillStyle = '#fff6a9';
      ctx.shadowColor = '#fff6a9';
      ctx.shadowBlur = 14;
      ctx.fill();
      ctx.shadowBlur = 0;

      drawPretext('pretext layout engine', 16, CANVAS_HEIGHT - 14, {
        maxWidth: 260,
        lineHeight: 12,
        font: '11px monospace',
        color: '#8ab4e6',
      });

      frameRef.current = requestAnimationFrame(draw);
    };

    frameRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  const resetGame = () => {
    const fresh = {
      paddleX: (CANVAS_WIDTH - PADDLE_WIDTH) / 2,
      ballX: CANVAS_WIDTH / 2,
      ballY: CANVAS_HEIGHT - 70,
      ballDx: INITIAL_BALL_SPEED,
      ballDy: -INITIAL_BALL_SPEED,
      running: false,
      gameOver: false,
      level: 1,
      score: 0,
      lives: 3,
      bricks: createBricks(1),
    };
    stateRef.current = fresh;
    setScore(0);
    setLives(3);
    setLevel(1);
    setStatus('Press Space to Start');
  };

  return (
    <div className="h-full flex flex-col bg-white/70 backdrop-blur-[10px]" style={{ padding: 10 }}>
      <div className="flex items-center justify-between gap-3 p-3 border-b border-black/10 bg-white/70" style={{ marginBottom: 8, paddingBottom: 6 }}>
        <div className="flex items-center gap-2 text-[#1d1d1f]">
          <Gamepad2 size={16} strokeWidth={2} />
          <span className="text-sm font-semibold">Breakout</span>
          <span className="text-xs text-[#4b5563]">Score: {score}</span>
          <span className="text-xs text-[#4b5563]">Lives: {lives}</span>
          <span className="text-xs text-[#4b5563]">Level: {level}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="px-2.5 py-1.5 text-xs rounded-md bg-white/90 border border-black/10 text-[#1d1d1f] hover:bg-white inline-flex items-center gap-1"
            onClick={resetGame}
            title="Restart game"
            style={{ padding: 3 }}
          >
            <RotateCw size={12} strokeWidth={2} />
            Restart
          </button>
          <a
            href={BREAKOUT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1.5 text-xs rounded-md bg-[#667eea] text-white hover:opacity-90 inline-flex items-center gap-1"
            title="Pretext showcase"
            style={{ padding: 3 }}
          >
            <ExternalLink size={12} strokeWidth={2} />
            Showcase
          </a>
        </div>
      </div>

      <div className="flex-1 min-h-0 bg-black/5 p-3">
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="w-full h-full rounded-md border border-black/10 bg-[#071120]"
          onMouseMove={(e) => movePaddleTo(e.clientX)}
          onTouchMove={(e) => {
            if (e.touches[0]) movePaddleTo(e.touches[0].clientX);
          }}
        />
      </div>

      <div className="px-3 pb-2 text-xs text-[#4b5563]" style={{ paddingTop: 6 }}>
        {status} - Controls: Left/Right arrows, Space to pause/resume.
      </div>
    </div>
  );
}
