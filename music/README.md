# Music Folder

Place your MP3 music files here to use them in the music player.

## How to Add Your Own Music

1. **Add MP3 files** to this folder:
   ```
   public/music/
   ├── song1.mp3
   ├── song2.mp3
   └── song3.mp3
   ```

2. **Update the playlist** in `src/components/Desktop/applications/MusicPlayerWindow.jsx`:
   ```javascript
   const playlist = [
     {
       title: 'Your Song Title',
       artist: 'Artist Name',
       url: '/music/song1.mp3',  // Path relative to public folder
       cover: '🎵',
     },
     // Add more tracks...
   ];
   ```

3. **Restart the dev server** to see your changes

## Current Setup

The music player currently uses royalty-free music from Pixabay CDN. You can:
- Keep the current tracks (no copyright issues)
- Replace with your own music files
- Use any publicly accessible MP3 URL

## Supported Formats

- MP3 (recommended)
- WAV
- OGG
- M4A

## File Size Recommendations

- Keep individual files under 10MB for fast loading
- Use 128-192 kbps bitrate for good quality with reasonable size
- Consider using compressed formats for web delivery

## Copyright Note

Ensure you have the right to use any music you add to your portfolio.
Consider using royalty-free music from:
- Pixabay Audio Library
- YouTube Audio Library
- Free Music Archive
- Incompetech
