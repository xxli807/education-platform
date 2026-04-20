# Deployment Guide - GitHub Pages

This education platform is automatically deployed to GitHub Pages using GitHub Actions. Every time you push code to the `main` branch, it automatically builds and deploys to your GitHub Pages site.

## 🚀 Live Site
Your app will be available at: **`https://xxli807.github.io/education-platform/`**

## ✅ What's Already Set Up

1. **GitHub Actions Workflow** (`.github/workflows/deploy.yml`)
   - Runs automatically on every push to `main`
   - Builds the production bundle
   - Deploys to GitHub Pages

2. **Vite Configuration** (`vite.config.ts`)
   - Base path set to `/education-platform/` for GitHub Pages
   - Production build optimized and minified

## 📋 Setup Steps (One-Time Only)

### Step 1: Enable GitHub Pages
1. Go to your repository: `https://github.com/xxli807/education-platform`
2. Click **Settings** → **Pages**
3. Under "Source", select **Deploy from a branch**
4. Select branch: **gh-pages**
5. Click **Save**

⚠️ **Note**: The first deployment via GitHub Actions will create the `gh-pages` branch automatically.

### Step 2: Push to Trigger Deployment
```bash
git add .
git commit -m "Setup GitHub Pages deployment"
git push origin main
```

### Step 3: Monitor Deployment
1. Go to your repository
2. Click **Actions** tab
3. Watch the "Deploy to GitHub Pages" workflow run
4. Once it completes (green checkmark), your site is live!

## 🔄 Automatic Deployments

From now on, every time you:
```bash
git push origin main
```

The GitHub Actions workflow will:
1. ✅ Check out your code
2. ✅ Install dependencies
3. ✅ Run TypeScript checks
4. ✅ Build the production bundle (`npm run build`)
5. ✅ Deploy to GitHub Pages automatically

**No manual deployment needed!**

## 🌐 Access Your App

Once deployed, visit: **`https://xxli807.github.io/education-platform/`**

The app will:
- Load all assets from the correct paths
- Work with React Router (using hash routes for GitHub Pages compatibility)
- Store data in IndexedDB locally in the browser
- Work offline after first load

## 📱 Features Preserved

- ✅ All subjects (Math, English, Science, Thinking)
- ✅ Holiday Plans (new feature)
- ✅ IndexedDB data storage
- ✅ Print functionality
- ✅ Responsive design
- ✅ Dark theme with animations

## 🔧 Troubleshooting

### Site not updating after push?
- GitHub Actions can take 2-5 minutes to complete
- Check the **Actions** tab to see workflow status
- Force refresh browser (Ctrl+F5 / Cmd+Shift+R)

### Assets not loading?
- This should not happen - base path is correctly configured
- If it does, clear browser cache and try again

### Want to deploy a different branch?
Edit `.github/workflows/deploy.yml` and change:
```yaml
on:
  push:
    branches: [main]  # Change to your branch name
```

## 📚 More Info

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)

---

**Status**: ✅ Ready to deploy!
Push to `main` branch to trigger automatic deployment.
