# Deployment Guide for GitHub Pages

Your project is now configured for GitHub Pages deployment. The following steps will help you update your live site.

## Issue Identified
The blank white page on GitHub Pages was caused by incorrect asset paths. The following changes have been made:

1. **vite.config.ts** – Added `base: '/labinitial_presentation_online_elitelaundry/'`
2. **index.html** – Changed absolute paths (`/vite.svg`, `/index.css`, `/index.tsx`) to relative paths (`./vite.svg`, etc.)
3. **constants.ts** – Changed image/video paths from `/assets/...` to `assets/...` (relative)

These changes ensure that all resources are correctly resolved when the site is served under the repository path `https://arafatinbusiness.github.io/labinitial_presentation_online_elitelaundry/`.

## Steps to Update Your Live Site

### Option 1: Manual Deployment (Quick)
1. Build the project:
   ```bash
   npm run build
   ```
2. The built files are in the `dist/` folder. Since `dist` is ignored by Git, you need to push them to a branch that GitHub Pages uses (typically `gh-pages` or `main` with a `/docs` folder). If you are using the "Deploy from a branch" setting with the `gh-pages` branch, you can:
   - Switch to a new branch, copy the contents of `dist` there, commit, and push.
   - Or use the `gh-pages` npm package (see Option 2).

### Option 2: Automated Deployment with `gh-pages` Package
1. Install `gh-pages` as a dev dependency:
   ```bash
   npm install --save-dev gh-pages
   ```
2. Add a `deploy` script to `package.json`:
   ```json
   "scripts": {
     "dev": "vite",
     "build": "vite build",
     "preview": "vite preview",
     "deploy": "gh-pages -d dist"
   }
   ```
3. Build and deploy:
   ```bash
   npm run build
   npm run deploy
   ```
   This will push the `dist` folder to the `gh-pages` branch.

### Option 3: GitHub Actions (Recommended for Continuous Deployment)
Create a `.github/workflows/deploy.yml` file with the following content:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

After pushing this workflow, any push to `main` will automatically rebuild and deploy your site.

## Verify Deployment
After deploying, visit:
```
https://arafatinbusiness.github.io/labinitial_presentation_online_elitelaundry/
```

The page should now display your presentation slides correctly.

## Troubleshooting
- If the page remains blank, open the browser's Developer Tools (F12) and check the Console and Network tabs for errors (404, CORS, etc.).
- Ensure that the GitHub Pages source is set to the branch containing the built files (`gh-pages` or `main` with `/docs`).
- Clear your browser cache or try incognito mode.

## Need Help?
Refer to the [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html#github-pages) or open an issue in the repository.
