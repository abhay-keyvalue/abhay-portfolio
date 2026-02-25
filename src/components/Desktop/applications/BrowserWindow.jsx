import { useState } from 'react';
import { Globe, ArrowLeft, RotateCw, Lock, ArrowRight } from 'lucide-react';
import { browserConfig } from '../../../constants/portfolioData';
import './ApplicationWindow.css';

export default function BrowserWindow() {
  const [url, setUrl] = useState(browserConfig.defaultUrl);
  const [inputUrl, setInputUrl] = useState(browserConfig.defaultInputUrl);

  const handleNavigate = (e) => {
    e.preventDefault();
    let newUrl = inputUrl;
    
    if (!newUrl.startsWith('http://') && !newUrl.startsWith('https://')) {
      if (newUrl.includes('.')) {
        newUrl = 'https://' + newUrl;
      } else {
        newUrl = `${browserConfig.searchEngine}?q=${encodeURIComponent(newUrl)}&igu=1`;
      }
    } else {
      newUrl = newUrl + (newUrl.includes('?') ? '&' : '?') + 'igu=1';
    }
    
    setUrl(newUrl);
  };

  const handleBack = () => {
    setUrl(browserConfig.defaultUrl);
    setInputUrl(browserConfig.defaultInputUrl);
  };

  const handleRefresh = () => {
    setUrl(url + '&t=' + Date.now());
  };

  return (
    <div className="application-window browser-window">
      <div className="browser-toolbar">
        <div className="browser-nav-buttons">
          <button onClick={handleBack} className="browser-nav-btn" title="Home">
            <ArrowLeft size={16} strokeWidth={2} />
          </button>
          <button onClick={handleRefresh} className="browser-nav-btn" title="Refresh">
            <RotateCw size={16} strokeWidth={2} />
          </button>
        </div>
        
        <form onSubmit={handleNavigate} className="browser-address-bar">
          <div className="browser-lock">
            <Lock size={14} strokeWidth={2} />
          </div>
          <input
            type="text"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            placeholder="Search Google or enter address"
            className="browser-url-input"
          />
          <button type="submit" className="browser-go-btn">
            <ArrowRight size={14} strokeWidth={2} />
          </button>
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
            {browserConfig.noteText}
          </p>
        </div>
      </div>
    </div>
  );
}
