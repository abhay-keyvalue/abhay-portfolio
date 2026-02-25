import { useState } from 'react';
import './ApplicationWindow.css';

export default function BrowserWindow() {
  const [url, setUrl] = useState('https://www.google.com/webhp?igu=1');
  const [inputUrl, setInputUrl] = useState('https://www.google.com');

  const handleNavigate = (e) => {
    e.preventDefault();
    let newUrl = inputUrl;
    
    if (!newUrl.startsWith('http://') && !newUrl.startsWith('https://')) {
      if (newUrl.includes('.')) {
        newUrl = 'https://' + newUrl;
      } else {
        newUrl = `https://www.google.com/search?q=${encodeURIComponent(newUrl)}&igu=1`;
      }
    } else {
      newUrl = newUrl + (newUrl.includes('?') ? '&' : '?') + 'igu=1';
    }
    
    setUrl(newUrl);
  };

  const handleBack = () => {
    setUrl('https://www.google.com/webhp?igu=1');
    setInputUrl('https://www.google.com');
  };

  const handleRefresh = () => {
    setUrl(url + '&t=' + Date.now());
  };

  return (
    <div className="application-window browser-window">
      <div className="browser-toolbar">
        <div className="browser-nav-buttons">
          <button onClick={handleBack} className="browser-nav-btn" title="Back">
            ←
          </button>
          <button onClick={handleRefresh} className="browser-nav-btn" title="Refresh">
            ↻
          </button>
        </div>
        
        <form onSubmit={handleNavigate} className="browser-address-bar">
          <span className="browser-lock">🔒</span>
          <input
            type="text"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            placeholder="Search Google or enter address"
            className="browser-url-input"
          />
          <button type="submit" className="browser-go-btn">Go</button>
        </form>
      </div>
      
      <div className="browser-content">
        <iframe
          src={url}
          title="Browser"
          className="browser-iframe"
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
          onError={(e) => console.error('Iframe error:', e)}
        />
        <div className="browser-note">
          <p style={{ fontSize: '11px', color: '#86868b', padding: '8px 12px', margin: 0, textAlign: 'center', background: 'rgba(255, 255, 255, 0.95)' }}>
            Note: Some sites may block iframe embedding. If content doesn't load, try a different URL.
          </p>
        </div>
      </div>
    </div>
  );
}
