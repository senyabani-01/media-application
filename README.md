# Our Warming World: Interactive Climate Data Story

Plain HTML/CSS/JavaScript, no frameworks, no libraries, no build step.
Data: [Berkeley Earth on Kaggle](https://www.kaggle.com/datasets/berkeleyearth/climate-change-earth-surface-temperature-data), major cities file (100 cities, in the `data/` folder, already prepared as `data/data.json`).

## Run it (Windows)
1. Install Python 3 from https://www.python.org/downloads/ (tick "Add Python to PATH"). Nothing else is needed.
2. Unzip the folder and double-click **RUN.cmd**. Your browser opens at http://localhost:8000.
   Or in Command Prompt, inside the folder: `python -m http.server 8000`, then open http://localhost:8000.

Mac/Linux: `python3 -m http.server 8000`.
The data is bundled in `data/data.js`, so the page also works if you simply double-click `index.html`.
If you see no animation: your computer's "reduce motion" setting may be on. Use the **Animation** button at the top of the page to turn it on.
If `data/data.json` is ever missing, the page asks you to choose `data/GlobalLandTemperaturesByMajorCity.csv` and builds the data itself.

## Optional: rebuild the data
`pip install pandas` then `python prepare_data.py`. This rewrites `data/data.json` and `data/transformations.md` from the CSV.

## Git (version control)
This folder is already a Git repository.
```
git log --oneline                     (see history)
git config user.name "Your Name"
git config user.email "you@example.com"
git checkout -b fix/usability          (branch for test fixes)
git add -A && git commit -m "Fix: describe the change"
git checkout main && git merge fix/usability
git remote add origin <your-github-repo-url>
git push -u origin main
```

## Deploy (free, needed for submission)
- **Netlify:** drag the folder onto https://app.netlify.com/drop
- **GitHub Pages:** push the folder to a repo, then Settings -> Pages -> deploy from `main` / root.
You may delete the large CSV before uploading; the site only needs `data/data.json`. Submit the live link.

## Files
`index.html`, `style.css`, `script.js` (site) · `RUN.cmd` · `prepare_data.py` · `data/` (CSV, data.json, transformations.md) · `docs/PROJECT_DOCS.md` (pitch, audience analysis, requirements, storyboard and wireframes, production plan, design principles, test plans and reports, Git, ethics/privacy/security/cultural/sustainability, reflection) · `docs/ASSET_REGISTER.md` · `_headers` (security headers for Netlify)

## Data transformations
Monthly values -> annual mean (only complete years and complete cities, 1900-2012) -> anomaly versus each city's own 1901-1930 average -> story line is the average across 100 cities (uncertainty is the average of the cities' uncertainty). Details in `data/transformations.md`.

## Features
Responsive layout · keyboard navigation (arrow keys, skip link) · chart alt text and data tables · reduced-motion support · dark mode · uncertainty shown · source attributed.

## Before you submit
Run usability tests with 5+ users and complete section 10 (tests) and 13 (reflection) of `docs/PROJECT_DOCS.md`, then adjust the site from the findings.
