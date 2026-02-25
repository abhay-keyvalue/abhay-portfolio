import { useState, useEffect, useCallback } from 'react';
import './LoadingScreen.css';

const RESOURCES = [
  'scene.geometry',
  'scene.materials',
  'laptop.model',
  'particle.system',
  'lighting.config',
  'bloom.effects',
  'shadow.maps',
  'environment.hdr',
  'animation.controllers',
  'camera.systems',
];

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [currentResource, setCurrentResource] = useState('');
  const [loadedResources, setLoadedResources] = useState([]);
  const [isComplete, setIsComplete] = useState(false);
  const [canProceed, setCanProceed] = useState(false);

  const handleProceed = useCallback(() => {
    if (canProceed && !isComplete) {
      setIsComplete(true);
      setTimeout(() => {
        onComplete?.();
      }, 500);
    }
  }, [canProceed, isComplete, onComplete]);

  useEffect(() => {
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex < RESOURCES.length) {
        setCurrentResource(RESOURCES[currentIndex]);
        setLoadedResources(prev => [...prev, RESOURCES[currentIndex]]);
        
        const finalProgress = ((currentIndex + 1) / RESOURCES.length) * 100;
        setProgress(Math.floor(finalProgress));
        
        currentIndex++;
      } else {
        // All resources loaded
        setProgress(100);
        setCanProceed(true);
        clearInterval(interval);
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!canProceed) return;

    const handleKeyPress = () => {
      handleProceed();
    };

    const handleClick = () => {
      handleProceed();
    };

    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('click', handleClick);

    const autoTimeout = setTimeout(() => {
      handleProceed();
    }, 1000);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('click', handleClick);
      clearTimeout(autoTimeout);
    };
  }, [canProceed, handleProceed]);

  return (
    <div className={`loading-screen ${isComplete ? 'fade-out' : ''}`}>
      <div className="loading-container">
        <div className="loading-header">
          <div className="bios-text">
            <div className="bios-line">ABHAY BALAN PORTFOLIO SYSTEM v2.0</div>
            <div className="bios-line">Copyright (C) 2026 Abhay Balan Inc.</div>
            <div className="bios-line">All Rights Reserved</div>
          </div>
          
          <div className="system-info">
            <div className="info-line">
              <span className="label">PROCESSOR:</span>
              <span className="value">React v19.2.0 @ 60Hz</span>
            </div>
            <div className="info-line">
              <span className="label">GRAPHICS:</span>
              <span className="value">Three.js WebGL Renderer</span>
            </div>
            <div className="info-line">
              <span className="label">MEMORY:</span>
              <span className="value">Checking... OK</span>
            </div>
          </div>
        </div>

        <div className="loading-body">
          <div className="loading-status">
            <div className="status-line">
              LOADING 3D SCENE RESOURCES ({loadedResources.length}/{RESOURCES.length})
            </div>
            <div className="status-line current-resource">
              {currentResource && `> Loading ${currentResource}...`}
            </div>
          </div>

          <div className="progress-section">
            <div className="progress-bar-container">
              <div 
                className="progress-bar-fill" 
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="progress-text">{progress}%</div>
          </div>

          <div className="resource-list">
            {loadedResources.map((resource, index) => (
              <div key={index} className="resource-item fade-in">
                <span className="resource-status">✓</span>
                <span className="resource-name">{resource}</span>
                <span className="resource-ok">OK</span>
              </div>
            ))}
          </div>
        </div>

        <div 
          className={`loading-footer ${canProceed ? 'interactive' : ''}`}
          onClick={canProceed ? handleProceed : undefined}
          style={{ cursor: canProceed ? 'pointer' : 'default' }}
        >
          <div className="footer-text">
            {progress < 100 
              ? 'Initializing portfolio experience...'
              : 'Press any key or click to continue'
            }
          </div>
          <div className="cursor-blink">{progress === 100 ? '_' : ''}</div>
        </div>
      </div>
    </div>
  );
}
