# TrueTail — Real Ingredients. True Love.

A one-page, animated, 3D-tilt marketing site for TrueTail natural dog treats. Pure HTML/CSS/JS — no build step, no dependencies to install. Open it or push it and it just works.

## What's inside

- `index.html` — all page content and structure
- `css/styles.css` — theme, layout, animations
- `js/script.js` — scroll reveals, 3D tilt on mouse move, particle background, mobile nav
- `images/` — product photography and logo assets

## Preview it locally

You don't need anything installed beyond a browser, but since the page fetches a Google Font, serve it over HTTP rather than opening the file directly:

```bash
cd truetail-website
python3 -m http.server 8000
```

Then open http://localhost:8000 in your browser.

## Deploy to GitHub Pages (free hosting)

1. Create a new repository on GitHub (e.g. `truetail-website`) — don't initialize it with a README.
2. In this folder, run:
   ```bash
   git init
   git add .
   git commit -m "Initial TrueTail site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git push -u origin main
   ```
3. On GitHub, go to **Settings → Pages**.
4. Under "Build and deployment", set **Source** to `Deploy from a branch`, branch `main`, folder `/ (root)`. Save.
5. Wait a minute, then your site is live at:
   `https://<your-username>.github.io/<your-repo>/`

No further configuration needed — this is a static site.

## Customizing

- **Colors / fonts**: all theme values are CSS variables at the top of `css/styles.css` (`:root { ... }`).
- **Copy**: edit text directly in `index.html`.
- **Images**: replace files in `images/` (keep the same filenames, or update the `src` attributes in `index.html`).
- **Email / socials**: update the `mailto:` link and social URLs in the footer and "Our Promise" section of `index.html`.

## Notes

- Animations respect `prefers-reduced-motion`.
- The mouse-tilt and cursor-glow effects are disabled automatically on touch devices.
- Everything is dependency-free except one Google Fonts request (Fraunces + Inter) — the page still works offline, just falls back to system fonts.
