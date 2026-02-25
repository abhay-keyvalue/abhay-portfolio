import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const CODE_CHARS = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';

function CodeRain() {
  const pointsRef = useRef();
  const streams = 30;
  const particlesPerStream = 20;
  const totalParticles = streams * particlesPerStream;

  const { positions, colors, speeds, offsets } = useMemo(() => {
    const positions = new Float32Array(totalParticles * 3);
    const colors = new Float32Array(totalParticles * 3);
    const speeds = new Float32Array(totalParticles);
    const offsets = new Float32Array(totalParticles);

    for (let i = 0; i < streams; i++) {
      const angle = (i / streams) * Math.PI * 2;
      const radius = 5 + Math.random() * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;

      for (let j = 0; j < particlesPerStream; j++) {
        const idx = (i * particlesPerStream + j) * 3;
        const particleIdx = i * particlesPerStream + j;

        positions[idx] = x;
        positions[idx + 1] = (j / particlesPerStream) * 6 - 3;
        positions[idx + 2] = z;

        const brightness = 1 - j / particlesPerStream;
        colors[idx] = 0.0;
        colors[idx + 1] = brightness * 0.96;
        colors[idx + 2] = brightness * 1.0;

        speeds[particleIdx] = 0.02 + Math.random() * 0.02;
        offsets[particleIdx] = Math.random() * 100;
      }
    }

    return { positions, colors, speeds, offsets };
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const positions = pointsRef.current.geometry.attributes.position.array;
    const time = state.clock.elapsedTime;

    for (let i = 0; i < streams; i++) {
      for (let j = 0; j < particlesPerStream; j++) {
        const particleIdx = i * particlesPerStream + j;
        const idx = particleIdx * 3;

        positions[idx + 1] -= speeds[particleIdx];

        if (positions[idx + 1] < -3) {
          positions[idx + 1] = 3;
        }
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.rotation.y = time * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={totalParticles}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={totalParticles}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default CodeRain;
