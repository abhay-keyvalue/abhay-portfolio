import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const ICONS_DATA = [
  { text: 'React', position: [-3, 2, -2], color: '#61DAFB', size: 0.3 },
  { text: 'Three.js', position: [3, 1.5, -1], color: '#000000', size: 0.25 },
  { text: 'Node.js', position: [-2.5, -1, 1], color: '#339933', size: 0.3 },
  { text: 'TypeScript', position: [2.5, -0.5, 0.5], color: '#3178C6', size: 0.25 },
  { text: 'Next.js', position: [0, 2.5, -3], color: '#000000', size: 0.28 },
  { text: 'WebGL', position: [-3.5, 0.5, 0], color: '#990000', size: 0.27 },
];

function FloatingIcon({ text, position, color, size, index }) {
  const meshRef = useRef();
  const textRef = useRef();
  
  const speed = useMemo(() => 0.5 + Math.random() * 0.5, []);
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(time * speed + offset) * 0.3;
      meshRef.current.rotation.y = time * 0.3;
      meshRef.current.rotation.x = Math.sin(time * 0.5 + offset) * 0.2;
    }
    
    if (textRef.current) {
      textRef.current.position.y = position[1] + Math.sin(time * speed + offset) * 0.3;
      textRef.current.lookAt(state.camera.position);
    }
  });

  return (
    <group position={position}>
      {/* Glowing sphere behind text */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[size * 0.8, 32, 32]} />
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          emissive={color}
          emissiveIntensity={0.5}
          transparent
          opacity={0.6}
        />
      </mesh>
      
      {/* 3D Text */}
      <Text
        ref={textRef}
        fontSize={size}
        color={color}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff"
      >
        {text}
      </Text>
      
      {/* Outer glow ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[size * 1.2, size * 1.4, 32]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

export default function FloatingIcons() {
  return (
    <group>
      {ICONS_DATA.map((icon, index) => (
        <FloatingIcon key={icon.text} {...icon} index={index} />
      ))}
    </group>
  );
}
