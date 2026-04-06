import { useState } from 'react';
import { Music, Music2, Music3, Music4, SkipBack, SkipForward, ChevronDown, ChevronUp } from 'lucide-react';
import { musicPlaylist } from '../../../constants/portfolioData';

export default function MusicPlayerWindow() {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isExpanded, setIsExpanded] = useState(true);

  const playlist = musicPlaylist;

  const track = playlist[currentTrack];
  
  const getSoundCloudEmbedUrl = (url) => {
    return `https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&color=%23667eea&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true`;
  };

  const handlePrevious = () => {
    if (currentTrack > 0) {
      setCurrentTrack(currentTrack - 1);
    }
  };

  const handleNext = () => {
    if (currentTrack < playlist.length - 1) {
      setCurrentTrack(currentTrack + 1);
    }
  };

  const getMusicIcon = (index) => {
    const icons = [Music2, Music3, Music4];
    return icons[index % icons.length];
  };

  return (
    <div className="text-[#1d1d1f] font-[-apple-system,BlinkMacSystemFont,'SF_Pro_Display',sans-serif] p-0 bg-gradient-to-br from-[rgba(102,126,234,0.05)] to-[rgba(118,75,162,0.05)]" style={{ padding: 0 }}>
      <div className="p-5 flex flex-col gap-4" style={{ padding: 20 }}>
        <div className="flex items-center gap-3 mb-0" style={{ marginBottom: 0 }}>
          <div className="w-11 h-11 flex items-center justify-center bg-gradient-to-br from-[rgba(102,126,234,0.15)] to-[rgba(118,75,162,0.15)] rounded-xl text-[#667eea] shadow-[0_2px_8px_rgba(102,126,234,0.2)]">
            <Music size={24} strokeWidth={2} />
          </div>
          <p className="text-2xl font-bold text-[#1d1d1f] tracking-tight mb-0" style={{ marginBottom: 0 }}>Music Player</p>
        </div>

        <div className="text-center py-3 px-0 mb-2" style={{ padding: '12px 0', marginBottom: 8 }}>
          <h3 className="m-0 mb-1 text-lg font-bold text-[#1d1d1f] tracking-tight leading-tight" style={{ marginBottom: 4 }}>{track.title}</h3>
          <p className="m-0 text-[13px] text-[#667eea] font-medium">{track.artist}</p>
        </div>

        <div className="rounded-xl overflow-hidden mb-3" style={{ marginBottom: 12 }}>
          <iframe
            key={currentTrack}
            width="100%"
            height="166"
            scrolling="no"
            frameBorder="no"
            allow="autoplay"
            src={getSoundCloudEmbedUrl(track.soundcloudUrl)}
            title={track.title}
            className="block"
          />
        </div>

        <div className="flex justify-between gap-3 mb-2" style={{ marginBottom: 8 }}>
          <button
            onClick={handlePrevious}
            disabled={currentTrack === 0}
            className="flex items-center justify-center gap-2 py-2.5 px-5 bg-white/60 backdrop-blur-[10px] border-none rounded-[10px] text-sm font-semibold text-[#667eea] shadow-[0_2px_8px_rgba(0,0,0,0.08)] cursor-pointer transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white/80 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]"
            style={{ padding: '10px 20px' }}
            title="Previous Track"
          >
            <SkipBack size={16} strokeWidth={2} />
            <span>Previous</span>
          </button>
          <button
            onClick={handleNext}
            disabled={currentTrack === playlist.length - 1}
            className="flex items-center justify-center gap-2 py-2.5 px-5 bg-white/60 backdrop-blur-[10px] border-none rounded-[10px] text-sm font-semibold text-[#667eea] shadow-[0_2px_8px_rgba(0,0,0,0.08)] cursor-pointer transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white/80 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]"
            style={{ padding: '10px 20px' }}
            title="Next Track"
          >
            <span>Next</span>
            <SkipForward size={16} strokeWidth={2} />
          </button>
        </div>

        <div className="mt-2" style={{ marginTop: 8 }}>
          <div className="flex justify-between items-center mb-2" style={{ marginBottom: 8 }}>
            <h4 className="m-0 text-sm font-bold text-[#1d1d1f] tracking-tight" style={{ margin: 0 }}>Playlist ({playlist.length} tracks)</h4>
            <button 
              onClick={() => setIsExpanded(!isExpanded)} 
              className="bg-[rgba(102,126,234,0.1)] border-none rounded-lg w-8 h-8 flex items-center justify-center text-[#667eea] cursor-pointer transition-all duration-200 hover:bg-[rgba(102,126,234,0.2)] hover:scale-110"
              title={isExpanded ? 'Collapse' : 'Expand'}
            >
              {isExpanded ? <ChevronUp size={16} strokeWidth={2} /> : <ChevronDown size={16} strokeWidth={2} />}
            </button>
          </div>
          {isExpanded && (
            <div className="flex flex-col gap-2">
              {playlist.map((item, index) => {
                const TrackIcon = getMusicIcon(index);
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentTrack(index)}
                    className={`flex items-center gap-3 p-3 bg-white/60 backdrop-blur-[10px] border border-white/60 rounded-xl text-left cursor-pointer transition-all duration-200 hover:bg-white/90 hover:translate-x-1 ${index === currentTrack ? 'bg-[rgba(102,126,234,0.15)] border-[rgba(102,126,234,0.3)]' : ''}`}
                    style={{ padding: 12 }}
                  >
                    <div className={`w-10 h-10 flex items-center justify-center rounded-[10px] text-[#667eea] shrink-0 transition-all duration-200 ${index === currentTrack ? 'bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white shadow-[0_4px_12px_rgba(102,126,234,0.4)]' : 'bg-white/60'}`}>
                      <TrackIcon size={20} strokeWidth={2} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className={`block text-sm font-semibold tracking-tight truncate mb-0.5 ${index === currentTrack ? 'text-[#667eea]' : 'text-[#1d1d1f]'}`} style={{ marginBottom: 2 }}>{item.title}</span>
                      <span className="block text-xs text-[#86868b] truncate">{item.artist}</span>
                    </div>
                    {index === currentTrack && (
                      <div className="flex items-center text-[#667eea] animate-pulse">
                        <Music size={16} strokeWidth={2} />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="text-center py-3 px-0 mt-2 bg-white/40 backdrop-blur-[10px] rounded-xl border border-white/60" style={{ padding: '12px 0', marginTop: 8 }}>
          <div className="flex items-center justify-center gap-2 mb-1 text-xs font-semibold text-[#667eea]" style={{ marginBottom: 4 }}>
            <Music size={14} strokeWidth={2} />
            <span>Powered by SoundCloud</span>
          </div>
          <p className="my-1 text-xs text-[#86868b]" style={{ marginTop: 4, marginBottom: 4 }}>Use the embedded player controls to play, pause, and adjust volume</p>
        </div>
        
      </div>
    </div>
  );
}
