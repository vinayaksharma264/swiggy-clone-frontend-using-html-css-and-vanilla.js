# FoodieApp — Swiggy-style Food Delivery Clone

A food delivery web app clone built with **pure HTML, CSS, and vanilla JavaScript** — no frameworks, no libraries. Built as a hands-on learning project covering DOM manipulation, async data fetching, and client-side state management.

## Live Demo

_Add your GitHub Pages link here after deploying:_
`https://<your-username>.github.io/<repo-name>`

## Features

- 🔍 Browse food categories, fetched live from an external API
- 🍽️ Dynamic menu grid — cards generated entirely from fetched data
- 🛒 Add-to-cart system with quantity increase/decrease
- 💰 Live-updating cart total and item count badge
- 📱 Responsive layout (CSS Grid + Flexbox, no media-query heavy overrides needed for the menu grid)
- ♿ Respects `prefers-reduced-motion` for users sensitive to animation

## Tech Stack

| Layer | Tech |
|---|---|
| Structure | HTML5 |
| Styling | CSS3 (Flexbox, Grid, transitions) |
| Logic | Vanilla JavaScript (ES6+, `async/await`, `fetch`) |
| Data | [TheMealDB](https://www.themealdb.com/api.php) — free public API |

No build step, no `npm install`, no bundler. Open `index.html` and it runs.

## Project Structure

```
├── index.html   # Page structure/markup
├── style.css    # All styling
├── script.js    # Fetching data, rendering, cart logic
└── README.md
```

## How It Works

1. On load, `getCategories()` fetches all food categories from TheMealDB and renders them as filter buttons.
2. Clicking a category fetches matching meals (`filter.php?c=<category>`) and renders them as cards in the menu grid.
3. Clicking **Add to Cart** on a card pushes the item into an in-memory `cart` array (or bumps its quantity if already present).
4. The cart sidebar re-renders on every change, recalculating total price and item count.

## Run Locally

Because the app uses `fetch()` to call an external API, opening `index.html` directly via `file://` can hit CORS restrictions in some browsers. Easiest fix — serve it locally:

**Option A — VS Code Live Server**
1. Install the "Live Server" extension
2. Right-click `index.html` → **Open with Live Server**

**Option B — Python's built-in server**
```bash
python -m http.server 8000
```
Then open `http://localhost:8000`

## Deploy (GitHub Pages)

1. Push this repo to GitHub
2. Go to **Settings → Pages**
3. Source: **Deploy from a branch** → Branch: `main`, folder: `/ (root)` → **Save**
4. Site goes live at `https://<username>.github.io/<repo-name>` within ~1 minute

## Known Limitations

- Prices are randomly generated (TheMealDB doesn't provide pricing data) — for demo purposes only
- Cart state resets on page refresh (no `localStorage` persistence yet)
- No real checkout/payment — this is a front-end learning project, not a production app

## Possible Next Steps

- [ ] Search bar filtering (`search.php?s=`)
- [ ] Checkout form with order summary
- [ ] Persist cart with `localStorage`
- [ ] Loading states / empty states polish

## Author

**Vinayak Sharma**
[GitHub](https://github.com/vinayaksharma264) · vinayakkworks@gmail.com
