import { useState, useEffect, useCallback } from 'react';

const RESOURCES = [
  'system.kernel',
  'window.manager',
  'desktop.environment',
  'application.framework',
  'menubar.service',
  'dock.interface',
  'file.system',
  'network.stack',
  'graphics.compositor',
  'user.preferences',
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


    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('click', handleClick);
    };
  }, [canProceed, handleProceed]);

  return (
    <div className={`fixed inset-0 w-screen h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#16213e] flex items-center justify-center z-[9999] font-mono text-[#00f5ff] transition-opacity duration-500 ${isComplete ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <div
        className="max-w-[800px] w-[90%] bg-black/80 border-2 border-[#00f5ff] rounded shadow-[0_0_20px_rgba(0,245,255,0.3),inset_0_0_30px_rgba(0,245,255,0.05)]"
        style={{ padding: '12px' }}
      >
        <div className="border border-[#00f5ff]/20 rounded-sm overflow-hidden">
          <div style={{ padding: '20px' }}>
            <div className="mb-4 pb-4 border-b border-[#00f5ff]/30">
              <div className="mb-4">
                <div className="text-sm leading-relaxed text-[#00f5ff] [text-shadow:0_0_5px_rgba(0,245,255,0.5)] md:text-xs">ABHAY BALAN PORTFOLIO SYSTEM v2.0</div>
                <div className="text-sm leading-relaxed text-[#00f5ff] [text-shadow:0_0_5px_rgba(0,245,255,0.5)] md:text-xs">Copyright (C) 2026 Abhay Balan Inc.</div>
                <div className="text-sm leading-relaxed text-[#00f5ff] [text-shadow:0_0_5px_rgba(0,245,255,0.5)] md:text-xs">All Rights Reserved</div>
              </div>

              <div className="flex flex-col gap-1.5 text-[0.85rem] md:text-xs" style={{ marginBottom: '12px' }}>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 min-w-[120px]">PROCESSOR:</span>
                  <span className="text-[#00f5ff] text-right">React v19.2.0 @ 60Hz</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 min-w-[120px]">GRAPHICS:</span>
                  <span className="text-[#00f5ff] text-right">WebGL Renderer</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 min-w-[120px]">MEMORY:</span>
                  <span className="text-[#00f5ff] text-right">Checking... OK</span>
                </div>
              </div>
            </div>

            <div>
              <div className="my-3" style={{ marginTop: '12px', marginBottom: '12px' }}>
                <div className="text-sm mb-1.5 text-[#00f5ff] md:text-[0.8rem]">
                  LOADING SYSTEM RESOURCES ({loadedResources.length}/{RESOURCES.length})
                </div>
                <div className="text-sm mb-1.5 text-[#4af] animate-pulse md:text-[0.8rem]">
                  {currentResource && `> Loading ${currentResource}...`}
                </div>
              </div>

              <div className="mb-3">
                <div className="w-full h-6 bg-[#00f5ff]/10 border border-[#00f5ff] relative overflow-hidden mb-2">
                  <div
                    className="h-full bg-gradient-to-r from-[#00f5ff] via-[#0088ff] to-[#00f5ff] transition-[width] duration-300 ease-out shadow-[0_0_20px_rgba(0,245,255,0.6)] relative after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/30 after:to-transparent after:animate-shimmer"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="text-right text-xl font-bold text-[#00f5ff] [text-shadow:0_0_10px_rgba(0,245,255,0.8)]">{progress}%</div>
              </div>

              <div className="max-h-[240px] overflow-y-auto p-3 bg-black/30 border border-[#00f5ff]/20 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-black/50 [&::-webkit-scrollbar-thumb]:bg-[#00f5ff] [&::-webkit-scrollbar-thumb]:rounded md:h-[190px]" style={{ padding: '12px', marginTop: '6px', marginBottom: '12px' }}>
                {loadedResources.map((resource, index) => (
                  <div key={index} className="flex items-center gap-3 py-1 text-[0.85rem] text-gray-400 md:text-xs">
                    <span className="text-[#0f0] font-bold min-w-[20px]">✓</span>
                    <span className="flex-1 text-[#00f5ff]">{resource}</span>
                    <span className="text-[#0f0] font-bold">OK</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            className={`px-5 py-4 border-t border-[#00f5ff]/30 flex items-center gap-2 transition-all duration-300 md:px-4 md:py-3 ${canProceed ? 'hover:bg-[#00f5ff]/5 hover:border-t-[#00f5ff]/50 cursor-pointer' : 'cursor-default'}`}
            onClick={canProceed ? handleProceed : undefined}
          >
            <div className={`text-sm transition-colors duration-300 ${canProceed ? 'hover:text-[#00f5ff]' : ''} text-gray-500`} style={{ margin: '6px' , padding: '12px'}}>
              {progress < 100
                ? 'Initializing desktop environment...'
                : 'Press any key or click to continue'
              }
            </div>
            <div className="text-[#00f5ff] text-xl animate-blink">{progress === 100 ? '_' : ''}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
