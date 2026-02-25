# Abhay Balan - 3D Portfolio

A production-ready 3D developer portfolio built with React, Three.js, and @react-three/fiber.

## Features

- 🎨 Interactive 3D hero section with floating laptop model
- 🌊 Smooth animations and transitions
- 💎 Glassmorphism design elements
- 📱 Fully responsive layout
- ⚡ Optimized performance with lazy loading and Suspense
- 🎭 Professional dark theme with cyan accents

## Tech Stack

- React 18
- Vite
- Three.js
- @react-three/fiber
- @react-three/drei

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
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
├── public/
│   └── models/
│       └── laptop.glb (you need to add this)
├── src/
│   ├── components/
│   │   ├── Hero3D.jsx
│   │   ├── About.jsx
│   │   ├── Projects.jsx
│   │   └── Contact.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
├── index.html
└── package.json
```

## Customization

### Personal Information

Update the following in the respective components:

- **Hero**: Edit name and title in `src/components/Hero3D.jsx`
- **About**: Modify professional summary in `src/components/About.jsx`
- **Projects**: Add your projects in `src/components/Projects.jsx`
- **Contact**: Update contact details in `src/components/Contact.jsx`

### Styling

All styles are in `src/styles.css`. Key variables to customize:

- Background color: `#0f0f0f`
- Accent color: `#00f5ff`
- Section spacing: Adjust padding in section classes

### 3D Scene

Modify the 3D scene in `src/components/Hero3D.jsx`:

- Camera position: `camera={{ position: [0, 1.5, 5] }}`
- Lighting: Adjust `ambientLight` and `directionalLight` intensity
- Environment: Change `preset="city"` to other options (sunset, dawn, night, etc.)
- Float animation: Modify `speed`, `rotationIntensity`, `floatIntensity` props

## Performance Tips

- The 3D component is lazy-loaded for faster initial page load
- Model is preloaded using `useGLTF.preload()`
- Suspense boundaries handle loading states
- OrbitControls zoom is disabled for better UX

## Browser Support

- Modern browsers with WebGL support
- Chrome, Firefox, Safari, Edge (latest versions)

## License

MIT

---

Built with ❤️ by Abhay Balan
