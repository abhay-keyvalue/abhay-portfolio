import { useState, useEffect } from 'react';
import { PowerOff, AlertCircle } from 'lucide-react';

export default function MenuBar({ onShutdown }) {
  const [time, setTime] = useState(new Date());
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handlePowerClick = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    if (onShutdown) {
      onShutdown();
    }
    window.close();
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };

  return (
    <>
      <div style={{ padding: 10 }} className="absolute top-0 left-0 right-0 h-7 bg-white/30 backdrop-blur-[40px] backdrop-saturate-[180%] flex justify-between items-center px-4 z-[10001] border-b-[0.5px] border-white/20 text-[13px] font-medium text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
        <div className="flex items-center gap-5">
          <div 
            className="flex items-center justify-center cursor-pointer py-0.5 px-2 rounded transition-all duration-200 text-base font-bold active:scale-95" 
            onClick={handlePowerClick}
            title="Power Options"
          >
            <PowerOff size={16} strokeWidth={2} />
          </div>
          <div className="cursor-pointer py-0.5 px-2 rounded transition-colors duration-200 tracking-tight font-semibold">Portfolio</div>
          <div className="cursor-pointer py-0.5 px-2 rounded transition-colors duration-200 tracking-tight max-md:hidden">File</div>
          <div className="cursor-pointer py-0.5 px-2 rounded transition-colors duration-200 tracking-tight max-md:hidden">View</div>
          <div className="cursor-pointer py-0.5 px-2 rounded transition-colors duration-200 tracking-tight max-md:hidden">Help</div>
        </div>

        <div className="flex items-center gap-5">
          <div className="cursor-pointer py-0.5 px-2 rounded transition-colors duration-200 tracking-tight">
            {time.toLocaleDateString('en-US', { 
              weekday: 'short', 
              month: 'short', 
              day: 'numeric' 
            })}
          </div>
          <div className="cursor-pointer py-0.5 px-2 rounded transition-colors duration-200 tracking-tight">
            {time.toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
        </div>
      </div>

      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-[8px] flex items-center justify-center z-[100000] animate-fade-in"  onClick={handleCancelLogout}>
          <div style={{ padding: 20 }} className="bg-[rgba(242,242,247,0.95)] backdrop-blur-[40px] backdrop-saturate-[180%] rounded-2xl p-8 max-w-[420px] w-[90%] shadow-[0_20px_60px_rgba(0,0,0,0.4),0_0_0_0.5px_rgba(255,255,255,0.3)_inset] animate-modal-slide-in border border-white/20 max-md:max-w-[90%] max-md:p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex flex-col items-center gap-4 mb-5">
              <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-[#ff9500] to-[#ff5f57] rounded-full text-white shadow-[0_8px_24px_rgba(255,95,87,0.4)]">
                <AlertCircle size={32} strokeWidth={2} />
              </div>
              <h3 className="m-0 text-xl font-bold text-[#1d1d1f] text-center tracking-tight">Are you sure you want to shut down?</h3>
            </div>
            
            <p className="text-center text-[#3d3d3d] text-sm leading-relaxed m-0 mb-6">
              This will close the portfolio application.
            </p>

            <div className="flex gap-3 justify-center max-md:flex-col" style={{ marginTop: 20 }}>
              <button 
                className="py-3 h-10 px-6 border-none rounded-[10px] text-sm font-semibold cursor-pointer transition-all duration-200 flex items-center gap-2 justify-center min-w-[120px] bg-black/5 text-[#1d1d1f] border border-black/10 hover:bg-black/10 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] active:scale-[0.98] max-md:w-full"
                onClick={handleCancelLogout}
              >
                Cancel
              </button>
              <button 
                className="py-3 px-6 border-none rounded-[10px] text-sm font-semibold cursor-pointer transition-all duration-200 flex items-center gap-2 justify-center min-w-[120px] bg-gradient-to-br from-[#ff9500] to-[#ff5f57] text-white shadow-[0_4px_12px_rgba(255,95,87,0.3)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(255,95,87,0.4)] active:scale-[0.98] max-md:w-full"
                onClick={handleConfirmLogout}
              >
                <PowerOff size={16} strokeWidth={2} />
                <span>Shut Down</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
