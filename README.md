# Pavotu portfolio

Static portfolio site for **Pawel Tulin** (UX & Service Designer). Live at **https://disruptiveexperience.com/pavotu/**.

## Local

- **Pages:** `index.html`, `work.html`, `lord-abbett.html`, `ibm.html`, `pearson.html`, `resume.html`
- **Assets:** `assets/css/style.css`, `assets/images/`, `assets/pdf/`
- Run the server **from the project root** (the folder that contains `index.html` and `lord-abbett.html`):
  ```bash
  cd /path/to/Pavotu
  python3 -m http.server 8765
  ```
  Then open http://127.0.0.1:8765/ or http://127.0.0.1:8765/lord-abbett.html

## Deploy (cPanel)

- Repo path on server: **public_html/pavotu** (same pattern as **public_html/disruptive**). Pull = live.
- Full steps: **[CPANEL-SETUP.md](CPANEL-SETUP.md)**
- If you get **403** after clone: run **fix-pavotu-403.sh** on the server (or the one-liner in that script).

## Push to GitHub

```bash
./quick-push.sh
```

Uses `GITHUB_TOKEN` or `~/.github_token`. Repo: **https://github.com/ptulin/pavotu**
