# Portfolio (Naomishiko/portfolio)

React (CRA) + Tailwind portfolio. Live site: https://www.naomistudio.tech

## Hosting / deploy

- Host: **GitHub Pages**, served from the **`gh-pages`** branch (repo root).
- Custom domain `www.naomistudio.tech` via `public/CNAME` (committed).
- DNS is at **GoDaddy**. `www` should be a CNAME to `naomishiko.github.io`.
- **Netlify is out of free credits** and blocks new deploys; the old Netlify site
  (`naomistudio.netlify.app`) is only reachable until DNS is repointed.
- Build uses relative paths (`"homepage": "."` in package.json) so the same build
  works on both `naomishiko.github.io/portfolio/` and the custom domain.

### To publish a change

1. Edit source on `main`, then build:
   `rm -rf build && npm run build`
2. Publish the build to `gh-pages`:
   ```
   rm -rf /tmp/ghpages && cp -r build /tmp/ghpages && cd /tmp/ghpages && touch .nojekyll
   git init -q && git checkout -q -b gh-pages && git add -A
   git commit -q -m "Publish"
   git remote add origin https://<token>@github.com/Naomishiko/portfolio.git
   git push -f origin gh-pages
   ```

## Notes

- Keep `public/ugc.mp4` small (< ~10 MB). It is referenced relatively as `ugc.mp4`.
- The push token lacks the `workflow` scope, so `.github/workflows/*` cannot be
  pushed with it. Hence the `gh-pages`-branch approach instead of Actions.
