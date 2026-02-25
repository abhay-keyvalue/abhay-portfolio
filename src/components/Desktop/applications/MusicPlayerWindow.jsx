import { useState } from 'react';
import { Music, Music2, Music3, Music4, SkipBack, SkipForward, ChevronDown, ChevronUp } from 'lucide-react';
import { musicPlaylist } from '../../../constants/portfolioData';
import './ApplicationWindow.css';

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
    <div className="application-window music-player-window">
      <div className="music-player-content">
        <div className="window-header-section music-header">
          <div className="window-header-icon">
            <Music size={24} strokeWidth={2} />
          </div>
          <p>Music Player</p>
        </div>

        <div className="track-info-header">
          <h3 className="track-title">{track.title}</h3>
          <p className="track-artist">{track.artist}</p>
        </div>

        <div className="soundcloud-player">
          <iframe
            key={currentTrack}
            width="100%"
            height="166"
            scrolling="no"
            frameBorder="no"
            allow="autoplay"
            src={getSoundCloudEmbedUrl(track.soundcloudUrl)}
            title={track.title}
          />
        </div>

        <div className="player-nav-controls">
          <button
            onClick={handlePrevious}
            disabled={currentTrack === 0}
            className="nav-control-btn"
            title="Previous Track"
          >
            <SkipBack size={16} strokeWidth={2} />
            <span>Previous</span>
          </button>
          <button
            onClick={handleNext}
            disabled={currentTrack === playlist.length - 1}
            className="nav-control-btn"
            title="Next Track"
          >
            <span>Next</span>
            <SkipForward size={16} strokeWidth={2} />
          </button>
        </div>

        <div className="playlist-section">
          <div className="playlist-header">
            <h4>Playlist ({playlist.length} tracks)</h4>
            <button 
              onClick={() => setIsExpanded(!isExpanded)} 
              className="playlist-toggle"
              title={isExpanded ? 'Collapse' : 'Expand'}
            >
              {isExpanded ? <ChevronUp size={16} strokeWidth={2} /> : <ChevronDown size={16} strokeWidth={2} />}
            </button>
          </div>
          {isExpanded && (
            <div className="playlist-tracks">
              {playlist.map((item, index) => {
                const TrackIcon = getMusicIcon(index);
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentTrack(index)}
                    className={`playlist-item ${index === currentTrack ? 'active' : ''}`}
                  >
                    <div className="playlist-icon">
                      <TrackIcon size={20} strokeWidth={2} />
                    </div>
                    <div className="playlist-text">
                      <span className="playlist-title">{item.title}</span>
                      <span className="playlist-artist">{item.artist}</span>
                    </div>
                    {index === currentTrack && (
                      <div className="playing-indicator">
                        <Music size={16} strokeWidth={2} />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="music-note">
          <div className="music-note-header">
            <Music size={14} strokeWidth={2} />
            <span>Powered by SoundCloud</span>
          </div>
          <p>Use the embedded player controls to play, pause, and adjust volume</p>
        </div>
        
      </div>
    </div>
  );
}
