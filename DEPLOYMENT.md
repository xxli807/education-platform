# Deployment Guide - GitHub Pages

This education platform deploys to GitHub Pages via GitHub Actions. Every push to `main` builds and publishes the site.

## Live Site
`https://<your-github-username>.github.io/education-platform/`

## What's Configured
- **Workflow**: [.github/workflows/deploy.yml](.github/workflows/deploy.yml) — builds with yarn and uploads the `dist/` directory as a Pages artifact.
- **Vite base path**: set to `/education-platform/` in [vite.config.ts](vite.config.ts) so assets resolve correctly under the repo subpath.
- **Hash router**: avoids 404s on deep links since GitHub Pages doesn't support SPA fallback.

## One-Time Setup
1. Make the repository public (required for free GitHub Pages, or use a paid plan for private).
2. Go to **Settings → Pages**.
3. Under **Build and deployment → Source**, select **GitHub Actions** (NOT "Deploy from a branch").
4. Push to `main` — the workflow runs, builds, and publishes the site.

## Updating Vite Base Path
If you fork or rename the repo, update `base` in `vite.config.ts` to match your new repo name:
```ts
base: '/<your-repo-name>/',
```

## Troubleshooting
- **Workflow fails on `yarn install`**: ensure `yarn.lock` is committed to the repo.
- **Site shows 404 / blank page**: confirm the Pages source is set to "GitHub Actions" and the `base` path matches your repo name.
- **Old version still showing**: hard refresh (Cmd+Shift+R / Ctrl+F5).
