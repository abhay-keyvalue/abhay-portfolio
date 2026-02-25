import { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const CAMERA_POSITIONS = {
  intro: {
    position: new THREE.Vector3(-5, 3, 8),
    lookAt: new THREE.Vector3(0, 0, 0),
    duration: 3000,
  },
  overview: {
    position: new THREE.Vector3(2, 1, 5),
    lookAt: new THREE.Vector3(0, 0, 0),
    duration: 2000,
  },
  closeup: {
    position: new THREE.Vector3(0, 0.5, 2),
    lookAt: new THREE.Vector3(0, 0, 0),
    duration: 2000,
  },
  screen: {
    position: new THREE.Vector3(0, 0.3, 1.5),
    lookAt: new THREE.Vector3(0, 0.1, 0),
    duration: 2000,
  },
};

export default function CameraKeyframes({ enabled = true }) {
  const { camera } = useThree();
  const animatingRef = useRef(false);
  const startTimeRef = useRef(0);
  const startPosRef = useRef(new THREE.Vector3());
  const startLookAtRef = useRef(new THREE.Vector3());
  const targetPosRef = useRef(new THREE.Vector3());
  const targetLookAtRef = useRef(new THREE.Vector3());
  const currentKeyframeRef = useRef('intro');
  const durationRef = useRef(3000);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    if (!enabled) return;

    const handleKeyPress = (event) => {
      const key = event.key.toLowerCase();
      let targetKeyframe = null;

      switch (key) {
        case '1':
          targetKeyframe = 'intro';
          break;
        case '2':
          targetKeyframe = 'overview';
          break;
        case '3':
          targetKeyframe = 'closeup';
          break;
        case '4':
          targetKeyframe = 'screen';
          break;
        default:
          return;
      }

      if (targetKeyframe && CAMERA_POSITIONS[targetKeyframe]) {
        startCameraTransition(targetKeyframe);
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [enabled]);

  const startCameraTransition = (keyframeName) => {
    const keyframe = CAMERA_POSITIONS[keyframeName];
    if (!keyframe) return;

    startPosRef.current.copy(camera.position);
    
    const lookAtVector = new THREE.Vector3();
    camera.getWorldDirection(lookAtVector);
    lookAtVector.multiplyScalar(5).add(camera.position);
    startLookAtRef.current.copy(lookAtVector);

    targetPosRef.current.copy(keyframe.position);
    targetLookAtRef.current.copy(keyframe.lookAt);
    
    durationRef.current = keyframe.duration;
    startTimeRef.current = Date.now();
    animatingRef.current = true;
    currentKeyframeRef.current = keyframeName;
  };

  useFrame(() => {
    if (!enabled) return;

    if (!hasStartedRef.current && camera.position) {
      setTimeout(() => {
        startCameraTransition('intro');
      }, 100);
      hasStartedRef.current = true;
    }

    if (!animatingRef.current) return;

    const elapsed = Date.now() - startTimeRef.current;
    const progress = Math.min(elapsed / durationRef.current, 1);

    const easeProgress = progress < 0.5
      ? 4 * progress * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 3) / 2;

    camera.position.lerpVectors(
      startPosRef.current,
      targetPosRef.current,
      easeProgress
    );

    const currentLookAt = new THREE.Vector3().lerpVectors(
      startLookAtRef.current,
      targetLookAtRef.current,
      easeProgress
    );
    camera.lookAt(currentLookAt);

    if (progress >= 1) {
      animatingRef.current = false;
    }
  });

  return null;
}
