# Quick Setup Guide

## ✅ Installation Complete!

Your portfolio is ready to run. The dev server is already running at http://localhost:5173/

## 🎨 Next Step: Add Your 3D Model

The portfolio currently shows a placeholder cyan cube. To add your laptop model:

### Option 1: Use a Free Model (Quickest)

1. Visit https://sketchfab.com/3d-models/laptop-f27bb7c0dd2f4ff5a264fb155de6e964
2. Click "Download 3D Model"
3. Select "glTF Binary (.glb)" format
4. Save as `laptop.glb` in the `public/models/` folder
5. Refresh your browser

### Option 2: Create Your Own in Blender

1. Open Blender and create/import a laptop model
2. Select the model
3. File > Export > glTF 2.0 (.glb)
4. Check "Apply Modifiers" and "Limit to Selected Objects"
5. Save to `public/models/laptop.glb`

### Option 3: Use AI to Generate

Use tools like:
- Meshy.ai
- Spline
- Luma AI

Export as GLB and place in `public/models/`

## 🎯 Customization

### Update Personal Info

1. **Hero Section** - `src/components/Hero3D.jsx`
   - Change name and title in the overlay

2. **About Section** - `src/components/About.jsx`
   - Update your professional summary

3. **Projects** - `src/components/Projects.jsx`
   - Add your real projects with descriptions

4. **Contact** - `src/components/Contact.jsx`
   - Already has your email and phone

### Adjust Colors

Edit `src/styles.css`:
- Background: `#0f0f0f` (line ~17)
- Accent: `#00f5ff` (throughout the file)

### Fine-tune 3D Scene

In `src/components/Hero3D.jsx`:
- Camera position: `[0, 1.5, 5]`
- Model scale: `1.5`
- Model position: `[0, -1, 0]`
- Environment: `"city"` (try: sunset, dawn, night, warehouse)

## 🚀 Production Build

When ready to deploy:

```bash
npm run build
```

Output will be in the `dist/` folder - ready to deploy to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

## 📱 Test Responsiveness

The portfolio is fully responsive. Test on:
- Desktop (1920px+)
- Tablet (768px)
- Mobile (375px)

---

Enjoy your new portfolio! 🎉
