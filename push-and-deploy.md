# Pavotu: GitHub repo + server dir

- **GitHub repo:** https://github.com/ptulin/pavotu
- **Live URL:** https://disruptiveexperience.com/pavotu/
- **Server path:** `public_html/pavotu/`

## 1. Push to GitHub (same as DE.Main)

Uses **GITHUB_TOKEN** or **~/.github_token**. The script creates the repo if it doesn’t exist, then runs `git push`.

**From your Mac (where your token is available):**

```bash
cd /Users/patu/Documents/CursorProjects/Pavotu
./quick-push.sh
```

Or with token in env:

```bash
export GITHUB_TOKEN=your_token
python3 push-to-github.py
```

If you don’t have a token yet: https://github.com/settings/tokens (scope **repo**). Save to `~/.github_token` or set `GITHUB_TOKEN`.

## 2. Deploy on server

Use **CPANEL-DEPLOY.md** for the cPanel steps only.
