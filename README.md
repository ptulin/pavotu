# Pavotu portfolio

Static portfolio site for **Pawel Tulin** (UX & Service Designer). Live at **https://disruptiveexperience.com/pavotu/**.

## Local

- **Pages:** `index.html`, `work.html`, `lord-abbett.html`, `ibm.html`, `pearson.html`, `resume.html`
- **Assets:** `assets/css/style.css`, `assets/images/`, `assets/pdf/`
- Open `index.html` in a browser or run: `python3 -m http.server 8000` then visit http://localhost:8000

## Deploy (cPanel)

- Repo path on server: **public_html/pavotu** (same pattern as **public_html/disruptive**). Pull = live.
- Full steps: **[CPANEL-SETUP.md](CPANEL-SETUP.md)**
- If you get **403** after clone: run **fix-pavotu-403.sh** on the server (or the one-liner in that script).

## Push to GitHub

```bash
./quick-push.sh
```

Uses `GITHUB_TOKEN` or `~/.github_token`. Repo: **https://github.com/ptulin/pavotu**
