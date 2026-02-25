import { useState, useEffect } from 'react';
import './MenuBar.css';
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
      <div className="menubar">
        <div className="menubar-left">
          <div 
            className="menu-item power-button" 
            style={{ fontSize: '16px', fontWeight: 'bold' }}
            onClick={handlePowerClick}
            title="Power Options"
          >
            <PowerOff size={16} strokeWidth={2} />
          </div>
          <div className="menu-item menu-title">Portfolio</div>
          <div className="menu-item">File</div>
          <div className="menu-item">View</div>
          <div className="menu-item">Help</div>
        </div>

        <div className="menubar-right">
          <div className="menu-item">
            {time.toLocaleDateString('en-US', { 
              weekday: 'short', 
              month: 'short', 
              day: 'numeric' 
            })}
          </div>
          <div className="menu-item">
            {time.toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
        </div>
      </div>

      {showLogoutModal && (
        <div className="logout-modal-overlay" onClick={handleCancelLogout}>
          <div className="logout-modal" onClick={(e) => e.stopPropagation()}>
            <div className="logout-modal-header">
              <div className="logout-modal-icon">
                <AlertCircle size={32} strokeWidth={2} />
              </div>
              <h3>Are you sure you want to shut down?</h3>
            </div>
            
            <p className="logout-modal-text">
              This will close the portfolio application.
            </p>

            <div className="logout-modal-actions">
              <button 
                className="logout-modal-btn cancel"
                onClick={handleCancelLogout}
              >
                Cancel
              </button>
              <button 
                className="logout-modal-btn confirm"
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
