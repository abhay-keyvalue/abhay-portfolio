# Deployment Guide - GitHub Pages

This portfolio is configured to deploy automatically to GitHub Pages.

## Automatic Deployment (Recommended)

The site deploys automatically via GitHub Actions when you push to the `main` branch.

### Setup Steps:

1. **Enable GitHub Pages in your repository:**
   - Go to your GitHub repository
   - Navigate to **Settings** → **Pages**
   - Under "Build and deployment":
     - Source: Select **GitHub Actions**
   - Save the changes

2. **Push your code:**
   ```bash
   git add .
   git commit -m "Setup GitHub Pages deployment"
   git push origin main
   ```

3. **Wait for deployment:**
   - Go to the **Actions** tab in your GitHub repository
   - Watch the "Deploy to GitHub Pages" workflow
   - Once complete, your site will be live at:
     `https://abhay-keyvalue.github.io/abhay-portfolio/`

## Manual Deployment (Alternative)

If you prefer manual deployment using gh-pages:

1. **Install gh-pages:**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Deploy:**
   ```bash
   npm run deploy
   ```

This will build and push to the `gh-pages` branch.

## Local Testing

Before deploying, test the production build locally:

```bash
npm run build
npm run preview
```

## Configuration Files

- **vite.config.js** - Base path set to `/abhay-portfolio/`
- **.github/workflows/deploy.yml** - GitHub Actions workflow
- **public/.nojekyll** - Prevents Jekyll processing

## Troubleshooting

### Site shows 404 or blank page
- Verify the base path in `vite.config.js` matches your repo name
- Check that GitHub Pages source is set to "GitHub Actions"
- Clear browser cache and hard refresh (Cmd+Shift+R)

### Assets not loading
- Ensure all asset paths are relative or use the public folder
- Check browser console for CORS or 404 errors

### Workflow fails
- Check the Actions tab for error details
- Verify Node.js version compatibility
- Ensure all dependencies are in package.json

## Notes

- **Build time**: ~2-3 minutes
- **Deploy time**: ~1 minute
- **Total time**: First deployment may take 5-10 minutes
- Subsequent deployments are usually faster
- The site URL will be: `https://abhay-keyvalue.github.io/abhay-portfolio/`
