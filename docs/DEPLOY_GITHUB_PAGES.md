# Deploy to GitHub Pages: step by step

## The key idea (read this first)
You do **not** start a server on GitHub Pages. `python -m http.server 8000` is only for testing on your own computer. GitHub Pages is a free web server that GitHub runs for you: it serves your files, and your site gets a public link like:

`https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/`

This project is plain HTML/CSS/JavaScript with the data bundled in `data/data.js`, so no build step and no Python are needed online.

## Which files do I run?
**None.** Nothing is run. You only push the files and open the link. The page that opens is `index.html`, which loads `style.css`, `script.js` and `data/data.js` by itself.

Files that **must** be pushed (keep the same folder structure):

| File | Needed online? |
|---|---|
| `index.html`, `style.css`, `script.js` | Yes (the site) |
| `data/data.js` | Yes (the charts' data) |
| `data/data.json`, `data/transformations.md` | Recommended (backup and documentation) |
| `data/GlobalLandTemperaturesByMajorCity.csv` | Optional (14 MB source data; fine to include as evidence, fine to leave out) |
| `docs/` (all .md files), `README.md` | Yes, for marking evidence |
| `.nojekyll`, `.gitignore` | Yes (tiny helper files) |
| `RUN.cmd`, `prepare_data.py` | Only for your computer; harmless online |
| `_headers` | Ignored by GitHub Pages (it is for Netlify); harmless |

Important: `index.html` must be at the **top level** of the repository, not inside an extra folder.

---
## Option A: with Git (recommended, you also get version-control evidence)

### 1. Install Git (once)
Download Git for Windows from https://git-scm.com/downloads and install with the default options. Check: open Command Prompt and run `git --version`.

### 2. Create the empty repository on GitHub
1. Sign in at https://github.com (create a free account if needed).
2. Click **+** (top right) -> **New repository**.
3. Repository name: for example `climate-story`. Choose **Public** (free Pages needs public unless you have a paid plan).
4. **Do not** tick "Add a README", ".gitignore" or "licence" (the project already has them).
5. Click **Create repository**. Copy the repository URL shown, for example `https://github.com/YOUR-USERNAME/climate-story.git`.

### 3. Push the project
Open Command Prompt **inside the project folder** (the folder that contains `index.html`; in File Explorer type `cmd` in the address bar and press Enter), then run:

```
git config user.name "Your Name"
git config user.email "YOUR-USERNAME@users.noreply.github.com"
git status
git add -A
git commit -m "Prepare project for deployment"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/climate-story.git
git push -u origin main
```
Notes:
- The folder already contains a Git history, so `git commit` may say "nothing to commit". That is fine; continue with the next commands.
- Using the `users.noreply.github.com` email keeps your real email private (find yours at GitHub -> Settings -> Emails).
- On the first push a window opens asking you to sign in to GitHub. Sign in and approve. If it asks for a password in the terminal, use a **personal access token** (GitHub -> Settings -> Developer settings -> Personal access tokens), not your account password.
- If you get "remote origin already exists", run `git remote set-url origin https://github.com/YOUR-USERNAME/climate-story.git` and push again.

### 4. Turn on GitHub Pages
1. Open your repository on GitHub -> **Settings** tab.
2. In the left menu click **Pages**.
3. Under **Build and deployment** -> **Source**, choose **Deploy from a branch**.
4. Under **Branch**, choose **main** and the folder **/ (root)**, then click **Save**.

### 5. Wait and open your site
1. Go to the **Actions** tab. You will see "pages build and deployment" running. Wait until it shows a green tick (usually 1 to 3 minutes).
2. Go back to **Settings -> Pages**. The link appears at the top: **Your site is live at** `https://YOUR-USERNAME.github.io/climate-story/`.
3. Open it. Press **Ctrl+F5** the first time to avoid an old cached version.

---
## Option B: without Git (upload in the browser)
1. Create the repository as in step 2 above, but this time tick **Add a README** (so the upload page is available), or click **uploading an existing file** on the empty repository page.
2. Click **Add file -> Upload files**.
3. Open the project folder on your computer, select **everything inside it** (`index.html`, `style.css`, `script.js`, `data`, `docs`, and so on), and drag it into the browser. Do not drag the outer folder itself, otherwise `index.html` ends up one level too deep. Leave out the 14 MB CSV if the upload is slow.
4. Click **Commit changes**.
5. Do steps 4 and 5 above (Settings -> Pages -> main / root).

Hidden files such as `.nojekyll` may not appear in File Explorer drag-and-drop. They are optional online, so you can skip them.

---
## Updating the site later
After changing any file (for example after your usability-test fixes):
```
git add -A
git commit -m "Fix: describe what you changed"
git push
```
Wait about a minute and refresh with Ctrl+F5. Each commit is evidence of your improvements.

## Check that it works (record this in your test report)
- The page opens at the `github.io` link on a phone and on a computer.
- Chapter 1 shows a line and coloured stripes; the line draws when you scroll to it (turn on the **Animation** button if your system reduces motion).
- The city dropdown lists 100 cities and the sliders change the chart.
- Keyboard: Tab to the "Skip to story" link, arrow keys move between chapters.
- Run Lighthouse (Chrome: F12 -> Lighthouse -> Mobile) on the live link and save the scores in `docs/PROJECT_DOCS.md`, section 10.4.

## Troubleshooting
| Problem | Fix |
|---|---|
| 404 "There isn't a GitHub Pages site here" | Pages not enabled, or still building. Check Settings -> Pages is set to main / root and wait for the green tick in Actions. |
| 404 after the green tick | `index.html` is inside a sub-folder. Move its contents to the top level of the repository. |
| Page opens but no charts | Hard refresh (Ctrl+F5). Confirm `data/data.js` is in the repository. File names are case-sensitive online (`data.js`, not `Data.js`). |
| Styles missing | Confirm `style.css` is next to `index.html` in the repository. |
| `git push` rejected or "failed to push" | Run `git pull origin main --allow-unrelated-histories`, then `git push`. This happens if the GitHub repo was created with a README. |
| "Support for password authentication was removed" | Use a personal access token or the browser sign-in, not your password. |
| Settings tab has no Pages option | The repository is private on a free plan. Make it public (Settings -> General -> Danger Zone -> Change visibility). |

## What to submit
The live link (`https://YOUR-USERNAME.github.io/climate-story/`), the repository link, and the documents in `docs/`.
