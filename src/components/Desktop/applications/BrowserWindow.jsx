import { useState } from 'react';
import { Globe, ArrowLeft, RotateCw, Lock, ArrowRight } from 'lucide-react';
import { browserConfig } from '../../../constants/portfolioData';

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
    <div className="text-[#1d1d1f] font-[-apple-system,BlinkMacSystemFont,'SF_Pro_Display',sans-serif] p-0 h-full flex flex-col overflow-hidden" style={{ padding: 0 }}>
      <div className="bg-gradient-to-b from-white/95 to-[rgba(242,242,247,0.95)] py-2.5 px-3 flex items-center gap-3 border-b border-black/5 backdrop-blur-[10px]" style={{ padding: '10px 12px' }}>
        <div className="flex gap-1.5">
          <button onClick={handleBack} className="w-8 h-8 border-none rounded-lg bg-white/60 backdrop-blur-[10px] flex items-center justify-center cursor-pointer transition-all duration-200 text-[#1d1d1f] hover:bg-black/10 hover:-translate-y-px active:scale-95" title="Home">
            <ArrowLeft size={16} strokeWidth={2} />
          </button>
          <button onClick={handleRefresh} className="w-8 h-8 border-none rounded-lg bg-white/60 backdrop-blur-[10px] flex items-center justify-center cursor-pointer transition-all duration-200 text-[#1d1d1f] hover:bg-black/10 hover:-translate-y-px active:scale-95" title="Refresh">
            <RotateCw size={16} strokeWidth={2} />
          </button>
        </div>
        
        <form onSubmit={handleNavigate} className="flex-1 flex items-center gap-2 bg-white/90 backdrop-blur-[10px] py-1.5 px-3 rounded-lg border border-black/10 shadow-[0_1px_4px_rgba(0,0,0,0.05)]" style={{ padding: '6px 12px' }}>
          <div className="flex items-center text-[#86868b]">
            <Lock size={14} strokeWidth={2} />
          </div>
          <input
            type="text"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            placeholder="Search Google or enter address"
            className="flex-1 border-none outline-none bg-transparent text-sm text-[#1d1d1f] placeholder:text-[#86868b]"
          />
          <button type="submit" className="py-1.5 px-2 bg-[rgba(102,126,234,0.1)] border-none rounded-md text-[#667eea] cursor-pointer transition-all duration-200 flex items-center justify-center hover:bg-[rgba(102,126,234,0.2)] hover:scale-105" style={{ padding: '6px 8px' }}>
            <ArrowRight size={14} strokeWidth={2} />
          </button>
        </form>
      </div>
      
      <div className="flex-1 bg-white relative overflow-hidden flex flex-col">
        <iframe
          src={url}
          title="Browser"
          className="w-full h-full border-none"
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
          onError={(e) => console.error('Iframe error:', e)}
        />
        <div className="absolute bottom-0 left-0 right-0 z-10 bg-white/95 backdrop-blur-[10px] border-t border-black/5">
          <p className="text-[11px] text-[#86868b] py-2 px-3 m-0 text-center" style={{ padding: '8px 12px', margin: 0 }}>
            {browserConfig.noteText}
          </p>
        </div>
      </div>
    </div>
  );
}
