import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, Float, Environment } from '@react-three/drei';
import { Suspense, useState, useEffect, useRef, useMemo, memo } from 'react';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import LaptopScreen from './LaptopScreen';
import FloatingIcons from './FloatingIcons';
import CodeRain from './CodeRain';
import CameraKeyframes from './CameraKeyframes';

// ========== Constants ==========
const CAMERA_CONFIG = {
  INITIAL_POSITION: [2, 1, 5],
  FOV: 45,
  SCROLL_DIVISOR: 1000,
  VERTICAL_SPEED: 2,
  HORIZONTAL_SPEED: 0.5,
  LERP_FACTOR: 0.1,
  LOOK_AT_TARGET: [0, 0, 0],
};

const PARTICLE_CONFIG = {
  COUNT: 800,
  RADIUS: 15,
  HEIGHT_RANGE: 12,
  Z_OFFSET: -5,
  SIZE: 0.03,
  OPACITY: 0.6,
  ROTATION_SPEED: 0.03,
  WAVE_AMPLITUDE: 0.0008,
  ACCENT_COLOR_THRESHOLD: 0.7,
};

const FLOAT_CONFIG = {
  speed: 0.8,
  rotationIntensity: 0.15,
  floatIntensity: 0.4,
  floatingRange: [-0.15, 0.15],
};

const LIGHTING_CONFIG = {
  ambient: { intensity: 0.3, color: '#ffffff' },
  key: { position: [5, 8, 5], intensity: 1.5, color: '#ffffff' },
  fill: { position: [-5, 3, 2], intensity: 0.6, color: '#a8daff' },
  rim: { position: [-3, 1, -5], intensity: 0.8, color: '#00d4ff' },
  spotTop: { position: [0, 10, 0], angle: 0.3, intensity: 0.5 },
  spotAccent: { position: [5, 5, 8], angle: 0.4, intensity: 0.4, color: '#00f5ff' },
};

const BLOOM_CONFIG = {
  intensity: 0.3,
  luminanceThreshold: 0.6,
  luminanceSmoothing: 0.9,
  radius: 0.4,
};

const MODEL_CONFIG = {
  path: '/models/laptop.glb',
  scale: 0.7,
  position: [0, -0.5, 0],
  rotation: [0, Math.PI * 0.15, 0],
  fallbackGeometry: [2, 1.5, 0.1],
  fallbackColor: '#00f5ff',
  fallbackMetalness: 0.8,
  fallbackRoughness: 0.2,
  fallbackEmissiveIntensity: 0.2,
};

// ========== Hooks ==========
const useScrollPosition = () => {
  const [scrollY, setScrollY] = useState(0);
  const rafRef = useRef(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) return;

      rafRef.current = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        if (Math.abs(currentScrollY - lastScrollY.current) > 1) {
          setScrollY(currentScrollY);
          lastScrollY.current = currentScrollY;
        }
        rafRef.current = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return scrollY;
};

// ========== Scene Components ==========
const CameraController = memo(({ scrollY }) => {
  const { camera } = useThree();
  const initialPosition = useRef(CAMERA_CONFIG.INITIAL_POSITION);
  const lookAtTarget = useRef(new THREE.Vector3(...CAMERA_CONFIG.LOOK_AT_TARGET));

  useFrame(() => {
    const scrollProgress = scrollY / CAMERA_CONFIG.SCROLL_DIVISOR;
    const targetY = initialPosition.current[1] - scrollProgress * CAMERA_CONFIG.VERTICAL_SPEED;
    const targetX = initialPosition.current[0] + scrollProgress * CAMERA_CONFIG.HORIZONTAL_SPEED;

    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, CAMERA_CONFIG.LERP_FACTOR);
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, CAMERA_CONFIG.LERP_FACTOR);

    camera.lookAt(lookAtTarget.current);
  });

  return null;
});
CameraController.displayName = 'CameraController';

const Particles = memo(() => {
  const particlesRef = useRef();

  const particleData = useMemo(() => {
    const positions = new Float32Array(PARTICLE_CONFIG.COUNT * 3);
    const colors = new Float32Array(PARTICLE_CONFIG.COUNT * 3);

    for (let i = 0; i < PARTICLE_CONFIG.COUNT; i++) {
      const i3 = i * 3;

      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i3] = PARTICLE_CONFIG.RADIUS * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = (Math.random() - 0.5) * PARTICLE_CONFIG.HEIGHT_RANGE;
      positions[i3 + 2] = PARTICLE_CONFIG.RADIUS * Math.sin(phi) * Math.sin(theta) + PARTICLE_CONFIG.Z_OFFSET;

      const isAccentColor = Math.random() > PARTICLE_CONFIG.ACCENT_COLOR_THRESHOLD;
      colors[i3] = isAccentColor ? 0.0 : 0.8;
      colors[i3 + 1] = isAccentColor ? 0.96 : 0.9;
      colors[i3 + 2] = 1.0;
    }

    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (!particlesRef.current) return;

    particlesRef.current.rotation.y = state.clock.elapsedTime * PARTICLE_CONFIG.ROTATION_SPEED;

    const positions = particlesRef.current.geometry.attributes.position.array;
    for (let i = 0; i < PARTICLE_CONFIG.COUNT; i++) {
      const i3 = i * 3;
      positions[i3 + 1] += Math.sin(state.clock.elapsedTime + i) * PARTICLE_CONFIG.WAVE_AMPLITUDE;
    }
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_CONFIG.COUNT}
          array={particleData.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={PARTICLE_CONFIG.COUNT}
          array={particleData.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={PARTICLE_CONFIG.SIZE}
        vertexColors
        transparent
        opacity={PARTICLE_CONFIG.OPACITY}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
});
Particles.displayName = 'Particles';

const FallbackModel = memo(() => (
  <Float {...FLOAT_CONFIG}>
    <mesh>
      <boxGeometry args={MODEL_CONFIG.fallbackGeometry} />
      <meshStandardMaterial
        color={MODEL_CONFIG.fallbackColor}
        metalness={MODEL_CONFIG.fallbackMetalness}
        roughness={MODEL_CONFIG.fallbackRoughness}
        emissive={MODEL_CONFIG.fallbackColor}
        emissiveIntensity={MODEL_CONFIG.fallbackEmissiveIntensity}
      />
    </mesh>
  </Float>
));
FallbackModel.displayName = 'FallbackModel';

const Model = memo(() => {
  const { scene } = useGLTF(MODEL_CONFIG.path);

  return (
    <Float {...FLOAT_CONFIG}>
      <group>
        <primitive 
          object={scene} 
          scale={MODEL_CONFIG.scale} 
          position={MODEL_CONFIG.position}
          rotation={MODEL_CONFIG.rotation}
        />
        <LaptopScreen />
      </group>
    </Float>
  );
});
Model.displayName = 'Model';

const LaptopModel = memo(() => {
  const [modelExists, setModelExists] = useState(true);

  useEffect(() => {
    const checkModel = async () => {
      try {
        const response = await fetch(MODEL_CONFIG.path);
        if (!response.ok) {
          setModelExists(false);
        }
      } catch {
        setModelExists(false);
      }
    };

    checkModel();
  }, []);

  return modelExists ? <Model /> : <FallbackModel />;
});
LaptopModel.displayName = 'LaptopModel';

const SceneLighting = memo(() => (
  <>
    <ambientLight 
      intensity={LIGHTING_CONFIG.ambient.intensity} 
      color={LIGHTING_CONFIG.ambient.color} 
    />

    <directionalLight
      position={LIGHTING_CONFIG.key.position}
      intensity={LIGHTING_CONFIG.key.intensity}
      color={LIGHTING_CONFIG.key.color}
      castShadow
      shadow-mapSize={[2048, 2048]}
    />

    <directionalLight
      position={LIGHTING_CONFIG.fill.position}
      intensity={LIGHTING_CONFIG.fill.intensity}
      color={LIGHTING_CONFIG.fill.color}
    />

    <directionalLight
      position={LIGHTING_CONFIG.rim.position}
      intensity={LIGHTING_CONFIG.rim.intensity}
      color={LIGHTING_CONFIG.rim.color}
    />

    <spotLight
      position={LIGHTING_CONFIG.spotTop.position}
      angle={LIGHTING_CONFIG.spotTop.angle}
      penumbra={1}
      intensity={LIGHTING_CONFIG.spotTop.intensity}
      color="#ffffff"
      castShadow
    />

    <spotLight
      position={LIGHTING_CONFIG.spotAccent.position}
      angle={LIGHTING_CONFIG.spotAccent.angle}
      penumbra={1}
      intensity={LIGHTING_CONFIG.spotAccent.intensity}
      color={LIGHTING_CONFIG.spotAccent.color}
    />
  </>
));
SceneLighting.displayName = 'SceneLighting';

const PostProcessing = memo(() => (
  <EffectComposer multisampling={0}>
    <Bloom
      intensity={BLOOM_CONFIG.intensity}
      luminanceThreshold={BLOOM_CONFIG.luminanceThreshold}
      luminanceSmoothing={BLOOM_CONFIG.luminanceSmoothing}
      mipmapBlur
      radius={BLOOM_CONFIG.radius}
    />
  </EffectComposer>
));
PostProcessing.displayName = 'PostProcessing';

try {
  useGLTF.preload(MODEL_CONFIG.path);
} catch (error) {
  console.warn('Model preload skipped - will use fallback');
}

const Scene = memo(({ scrollY, cameraMode = 'scroll' }) => {
  return (
    <>
      {cameraMode === 'scroll' && <CameraController scrollY={scrollY} />}
      {cameraMode === 'keyframes' && <CameraKeyframes enabled />}
      
      <Particles />
      <CodeRain />
      <FloatingIcons />
      <SceneLighting />
      <LaptopModel />
      <Environment preset="studio" environmentIntensity={0.5} />
      {cameraMode === 'scroll' && (
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 4}
          autoRotate={false}
          enablePan={false}
        />
      )}
      <PostProcessing />
    </>
  );
});
Scene.displayName = 'Scene';

const KeyboardHints = memo(({ visible }) => {
  if (!visible) return null;
  
  return (
    <div style={{
      position: 'absolute',
      bottom: '30px',
      left: '30px',
      background: 'rgba(0, 0, 0, 0.7)',
      padding: '15px 20px',
      borderRadius: '8px',
      border: '1px solid rgba(0, 245, 255, 0.3)',
      fontFamily: 'monospace',
      fontSize: '12px',
      color: '#00f5ff',
      zIndex: 100,
      boxShadow: '0 0 20px rgba(0, 245, 255, 0.3)',
    }}>
      <div style={{ marginBottom: '8px', fontWeight: 'bold', fontSize: '14px' }}>
        Camera Controls (Press Keys):
      </div>
      <div>1 - Intro View</div>
      <div>2 - Overview</div>
      <div>3 - Close-up</div>
      <div>4 - Screen Focus</div>
    </div>
  );
});
KeyboardHints.displayName = 'KeyboardHints';

const HeroOverlay = memo(({ showHints, onToggleMode, cameraMode, onBackToDesktop }) => (
  <>
    <div className="hero-overlay">
      <h1 className="hero-title">Abhay Balan</h1>
      <p className="hero-subtitle">
        Senior Software Engineer | 6 Years Experience
      </p>
      <p className="hero-subtitle" style={{ fontSize: '0.9em', marginTop: '4px', opacity: 0.9 }}>
        React Native • React.js • Cross-Platform Development
      </p>
    </div>
    
    <div style={{ position: 'absolute', top: '30px', right: '30px', display: 'flex', gap: '10px', zIndex: 100 }}>
      {onBackToDesktop && (
        <button
          onClick={onBackToDesktop}
          style={{
            background: 'rgba(139, 92, 246, 0.1)',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            color: '#a78bfa',
            padding: '10px 20px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontFamily: 'monospace',
            fontSize: '12px',
            transition: 'all 0.3s ease',
            boxShadow: '0 0 15px rgba(139, 92, 246, 0.2)',
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(139, 92, 246, 0.2)';
            e.target.style.boxShadow = '0 0 25px rgba(139, 92, 246, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(139, 92, 246, 0.1)';
            e.target.style.boxShadow = '0 0 15px rgba(139, 92, 246, 0.2)';
          }}
        >
          ← Desktop
        </button>
      )}
      
      <button
        onClick={onToggleMode}
        style={{
          background: 'rgba(0, 245, 255, 0.1)',
          border: '1px solid rgba(0, 245, 255, 0.3)',
          color: '#00f5ff',
          padding: '10px 20px',
          borderRadius: '6px',
          cursor: 'pointer',
          fontFamily: 'monospace',
          fontSize: '12px',
          transition: 'all 0.3s ease',
          boxShadow: '0 0 15px rgba(0, 245, 255, 0.2)',
        }}
        onMouseEnter={(e) => {
          e.target.style.background = 'rgba(0, 245, 255, 0.2)';
          e.target.style.boxShadow = '0 0 25px rgba(0, 245, 255, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.target.style.background = 'rgba(0, 245, 255, 0.1)';
          e.target.style.boxShadow = '0 0 15px rgba(0, 245, 255, 0.2)';
        }}
      >
        Mode: {cameraMode === 'scroll' ? 'Scroll' : 'Cinematic'}
      </button>
    </div>
    
    <KeyboardHints visible={showHints && cameraMode === 'keyframes'} />
  </>
));
HeroOverlay.displayName = 'HeroOverlay';

export default function Hero3D({ onBackToDesktop }) {
  const scrollY = useScrollPosition();
  const [cameraMode, setCameraMode] = useState('scroll');
  const [showHints, setShowHints] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHints(false);
    }, 8000);

    return () => clearTimeout(timer);
  }, [cameraMode]);

  const toggleCameraMode = () => {
    setCameraMode(prev => prev === 'scroll' ? 'keyframes' : 'scroll');
    setShowHints(true);
  };

  const canvasConfig = useMemo(
    () => ({
      camera: { position: CAMERA_CONFIG.INITIAL_POSITION, fov: CAMERA_CONFIG.FOV },
      gl: {
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      },
      shadows: true,
      dpr: [1, 2],
      onCreated: ({ gl }) => {
        gl.shadowMap.type = THREE.PCFShadowMap;
      },
    }),
    []
  );

  return (
    <section className="hero-section">
      <Canvas {...canvasConfig} className="hero-canvas">
        <Suspense fallback={null}>
          <Scene scrollY={scrollY} cameraMode={cameraMode} />
        </Suspense>
      </Canvas>
      <HeroOverlay 
        showHints={showHints} 
        onToggleMode={toggleCameraMode}
        cameraMode={cameraMode}
        onBackToDesktop={onBackToDesktop}
      />
    </section>
  );
}
