import { useState } from 'react';
import './ApplicationWindow.css';

export default function MusicPlayerWindow() {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isExpanded, setIsExpanded] = useState(true);

  // To add your own music:
  // 1. Go to any SoundCloud track or playlist
  // 2. Copy the full URL (e.g., https://soundcloud.com/artist/track-name)
  // 3. Add it to the playlist array below
  const playlist = [
    {
      title: 'NEELAKASHAM',
      artist: 'Remix',
      soundcloudUrl: 'https://soundcloud.com/rexvijayan/neelakasham-extended?in=mycupofmusic/sets/malayalam-songs&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing',
      cover: '🎵',
    },
    {
      title: 'Ambient Coding',
      artist: 'Focus Music',
      soundcloudUrl: 'https://soundcloud.com/mathews_philip/ohm-shanthi-oshaana?in=jjojo28/sets/om-shanthi-oshana&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing',
      cover: '🎶',
    },
    {
      title: 'Unfinished Hope Premam BGM',
      artist: 'Sreeraj Krishnan',
      soundcloudUrl: 'https://soundcloud.com/sreeraj-krishnan/unfinished-hope-premam-bgm?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing',
      cover: '🎼',
    },
  ];

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

  return (
    <div className="application-window music-player-window">
      <div className="music-player-content">
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

        {isExpanded && (
          <div className="playlist-section">
            <div className="playlist-header">
              <h4>Playlist</h4>
              <button 
                onClick={() => setIsExpanded(!isExpanded)} 
                className="playlist-toggle"
              >
                {isExpanded ? '▼' : '▲'}
              </button>
            </div>
            <div className="playlist-tracks">
              {playlist.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTrack(index)}
                  className={`playlist-item ${index === currentTrack ? 'active' : ''}`}
                >
                  <span className="playlist-icon">{item.cover}</span>
                  <div className="playlist-text">
                    <span className="playlist-title">{item.title}</span>
                    <span className="playlist-artist">{item.artist}</span>
                  </div>
                  {index === currentTrack && (
                    <span className="playing-indicator">♫</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="player-nav-controls">
          <button
            onClick={handlePrevious}
            disabled={currentTrack === 0}
            className="nav-control-btn"
            title="Previous Track"
          >
            ⏮ Previous
          </button>
          <button
            onClick={handleNext}
            disabled={currentTrack === playlist.length - 1}
            className="nav-control-btn"
            title="Next Track"
          >
            Next ⏭
          </button>
        </div>

        <div className="music-note">
          <p>🎵 Powered by SoundCloud</p>
          <p>Use the embedded player controls to play, pause, and adjust volume</p>
        </div>
        
      </div>
    </div>
  );
}
