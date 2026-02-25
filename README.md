# Pavotu Portfolio

Static portfolio site for **Pawel Tulin** (UX & Service Designer). Live at **https://disruptiveexperience.com/pavotu/**.

## Canonical Source

- Source of truth: `site/`
- Runtime output path (for legacy hosting compatibility): repository root

## Local Development

1. Start the local server:
   ```bash
   ./serve.sh
   ```
2. Open:
   - `http://127.0.0.1:8765/`
   - `http://127.0.0.1:8765/work/index.html`

## Automated Checks

Run all static checks:

```bash
./check-site.py
```

Checks include:
- broken local links/assets in `site/**/*.html`
- required mobile-nav wiring (`hamburger` + `main.js`) on all pages

## Publish `site/` to Root

Sync canonical `site/` into repository root:

```bash
./publish-site.sh
```

This supports hosts that serve from repo root.

## Deploy (cPanel)

- Repo path on server: `public_html/pavotu`
- `.cpanel.yml` now runs `publish-site.sh` after pull
- Full setup: [CPANEL-SETUP.md](CPANEL-SETUP.md)
- If you get `403` after clone: run `fix-pavotu-403.sh`

## Push to GitHub

```bash
./quick-push.sh
```

Uses `GITHUB_TOKEN` or `~/.github_token`. Repo: **https://github.com/ptulin/pavotu**
