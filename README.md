# Abhay Balan - 3D Portfolio

A stunning, interactive 3D portfolio with a macOS-inspired desktop interface built with React, Three.js, and @react-three/fiber.

🌐 **Live Demo**: [https://abhay-keyvalue.github.io/abhay-portfolio/](https://abhay-keyvalue.github.io/abhay-portfolio/)

## Features

- 🖥️ **macOS-Style Desktop Interface** - Fully interactive desktop with draggable windows, dock, and menu bar
- 🎨 **Cinematic 3D Scene** - Interactive 3D laptop with floating animations, particles, and bloom effects
- 🧭 **Built-in Safari Browser** - Functional browser window with Google search
- 🎬 **Camera Animations** - Scroll-based and keyframe-based camera movements
- 💫 **Visual Effects** - Code rain, floating tech icons, professional lighting
- 🪟 **Window Management** - Minimize, close, drag windows just like macOS
- 📱 **Fully Responsive** - Optimized for all screen sizes
- ⚡ **Performance Optimized** - Lazy loading, memoization, and efficient rendering
- 🎯 **BIOS-Style Loading Screen** - Retro loading experience before main content

## Tech Stack

- **Frontend**: React 19
- **Build Tool**: Vite
- **3D Graphics**: Three.js, @react-three/fiber, @react-three/drei
- **Post-Processing**: @react-three/postprocessing
- **Deployment**: GitHub Pages with GitHub Actions

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Deploy to GitHub Pages

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

**Quick Deploy:**
```bash
npm run deploy
```

## 3D Model Setup

**IMPORTANT**: The project expects a 3D model file at `public/models/laptop.glb`.

### Adding Your Model

1. Create a laptop or device model in Blender (or download one)
2. Export as GLB format (optimized for web)
3. Place the file at `public/models/laptop.glb`

### Model Recommendations

- Keep file size under 2MB for optimal performance
- Use compressed textures
- Optimize polygon count (aim for < 50k triangles)
- Center the model origin in Blender before exporting

### Quick Start Without a Model

If you don't have a model yet, you can:
1. Download a free laptop model from [Sketchfab](https://sketchfab.com/) or [CGTrader](https://www.cgtrader.com/)
2. Use a placeholder cube by replacing `<primitive object={scene} />` with `<mesh><boxGeometry /><meshStandardMaterial color="#00f5ff" /></mesh>` in `src/components/Hero3D.jsx`

## Project Structure

```
abhay-portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment
├── public/
│   ├── models/
│   │   └── laptop.glb         # 3D laptop model
│   ├── fonts/                 # Custom fonts
│   └── .nojekyll              # GitHub Pages config
├── src/
│   ├── components/
│   │   ├── Desktop/
│   │   │   ├── Desktop.jsx           # Main desktop interface
│   │   │   ├── WindowFrame.jsx       # Draggable windows
│   │   │   ├── MenuBar.jsx           # Top menu bar
│   │   │   ├── Taskbar.jsx           # Bottom dock
│   │   │   ├── DesktopShortcut.jsx   # Desktop icons
│   │   │   └── applications/
│   │   │       ├── ProfileWindow.jsx
│   │   │       ├── ProjectsWindow.jsx
│   │   │       ├── SkillsWindow.jsx
│   │   │       ├── ContactWindow.jsx
│   │   │       └── BrowserWindow.jsx
│   │   ├── Hero3D.jsx           # 3D scene with laptop
│   │   ├── LoadingScreen.jsx    # BIOS-style loading
│   │   ├── FloatingIcons.jsx    # 3D tech icons
│   │   ├── CodeRain.jsx         # Matrix effect
│   │   ├── LaptopScreen.jsx     # Screen content
│   │   └── CameraKeyframes.jsx  # Camera animations
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
├── index.html
├── package.json
├── vite.config.js
├── DEPLOYMENT.md
└── README.md
```

## Customization

### Personal Information

Update the following in the respective components:

- **Hero Title**: Edit name and subtitle in `src/components/Hero3D.jsx` (line ~375)
- **About Me**: Update profile info in `src/components/Desktop/applications/ProfileWindow.jsx`
- **Experience**: Modify work history in `src/components/Desktop/applications/ProjectsWindow.jsx`
- **Skills**: Update technical skills in `src/components/Desktop/applications/SkillsWindow.jsx`
- **Contact**: Change contact details in `src/components/Desktop/applications/ContactWindow.jsx`

### Desktop Customization

Add or modify applications in `src/components/Desktop/Desktop.jsx`:

```javascript
const APPLICATIONS = {
  yourApp: {
    key: 'yourApp',
    name: 'Your App',
    icon: '🎯',
    component: YourAppWindow,
    width: 60, // percentage of screen width
  },
};
```

### 3D Scene Customization

Modify constants in `src/components/Hero3D.jsx`:

- **Camera**: Adjust `CAMERA_CONFIG` for position and angles
- **Lighting**: Modify `LIGHTING_CONFIG` for intensity and colors
- **Particles**: Change `PARTICLE_CONFIG` for particle density
- **Model**: Update `MODEL_CONFIG` for scale, position, and rotation
- **Effects**: Tune `BLOOM_CONFIG` for glow intensity

### Styling

Desktop styles in `src/components/Desktop/`:
- `Desktop.css` - Background gradient and layout
- `WindowFrame.css` - Window appearance and animations
- `Taskbar.css` - Dock styling and hover effects
- `ApplicationWindow.css` - Content styling for all windows

## Interactive Features

### Desktop Mode
- **Double-click** desktop icons to open applications
- **Drag** windows by their title bar
- **Click** traffic light buttons to close or minimize
- **Dock** shows all available apps with running indicators
- **Menu bar** displays time and system menus

### 3D Scene Mode
- **Scroll** to trigger camera movements
- **Press 1-4** for cinematic camera keyframes:
  - `1` - Intro view
  - `2` - Overview
  - `3` - Close-up
  - `4` - Screen focus
- **Toggle** between scroll and keyframe modes
- **Return** to desktop anytime with the back button

### Loading Screen
- **Press any key** or **click anywhere** to skip loading
- Auto-advances after all resources load

## Deployment

This project is configured for automatic deployment to GitHub Pages.

### Automatic Deployment (Recommended)

1. **Enable GitHub Pages:**
   - Go to repository **Settings** → **Pages**
   - Set source to **GitHub Actions**

2. **Push to main:**
   ```bash
   git push origin main
   ```

3. **Access your site:**
   - `https://YOUR_USERNAME.github.io/abhay-portfolio/`

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

### Manual Deployment

```bash
npm run deploy
```

## Performance Optimizations

- React component memoization with `memo()`
- Callback memoization with `useCallback()` and `useMemo()`
- 3D model preloading
- Lazy loading with Suspense boundaries
- Efficient render loop with `useFrame()`
- Optimized WebGL settings (shadow maps, antialiasing)
- Particle system with buffer geometry

## Browser Support

- Modern browsers with WebGL 2.0 support
- Chrome, Firefox, Safari, Edge (latest versions)
- Minimum: Chrome 79+, Firefox 70+, Safari 14+

## License

MIT

---

Built with ❤️ by Abhay Balan | Senior Software Engineer | React Native & Frontend Specialist
