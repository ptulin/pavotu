# cPanel Git setup for https://disruptiveexperience.com/pavotu/

Follow this exactly so the repo lives where the web server serves from.

## 1. Correct repository path

Your domain is served from the **main account** `public_html`, not from `disruptiveexperience.com/public_html`. So the Git repo must be in the main `public_html`.

**In cPanel → Git Version Control → Create:**

| Field | Value |
|-------|--------|
| **Clone a Repository** | On |
| **Clone URL** | `https://github.com/ptulin/pavotu.git` |
| **Repository Path** | `public_html/pavotu` |
| **Repository Name** | `pavotu` |

**Do not use:** `repositories/pavotu` or `disruptiveexperience.com/public_html/pavotu` — the site would not be web-accessible there.

**Full path on server:** `/home1/moose/public_html/pavotu`  
So after clone, the URL **https://disruptiveexperience.com/pavotu/** serves files from that directory.

## 2. Before creating (if you had a symlink or old repo)

If you already have `~/public_html/pavotu` (symlink or folder), remove it so cPanel can create the repo there:

```bash
rm -f ~/public_html/pavotu
```

(Symlink: removed. Real folder: delete it in File Manager or `rm -rf ~/public_html/pavotu`.)

## 3. Create the repository in cPanel

1. **Create** (or **Add**), **Clone a Repository** = On.
2. **Clone URL:** `https://github.com/ptulin/pavotu.git`
3. **Repository Path:** `public_html/pavotu` (not `repositories/pavotu`).
4. **Repository Name:** `pavotu`
5. Click **Create** and wait for the clone to finish.

## 4. After the clone

1. **Manage** → **Pull or Deploy** → **Update from Remote** (so `main` is up to date).
2. If "Update from Remote" fails (e.g. untracked files), run once on the server:
   ```bash
   cd ~/public_html/pavotu && git clean -fd && git pull origin main
   ```
3. Run the one-shot setup script (permissions + WordPress .htaccess):
   ```bash
   cd ~/public_html/pavotu && bash server-setup-pavotu.sh
   ```
4. Open **https://disruptiveexperience.com/pavotu/** — the portfolio should load.

## 5. Later: updating the site

- Push from your Mac to GitHub.
- In cPanel: **Manage** → **Pull or Deploy** → **Update from Remote**.  
  Or on the server: `cd ~/public_html/pavotu && git pull origin main`.

No "Deploy" step needed — the repo is the live site.
