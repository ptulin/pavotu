# Push to GitHub (ptulin) and deploy to disruptiveexperience.com

## 1. Push to GitHub (run on your Mac)

Remote is already set: `https://github.com/ptulin/ptulin.git`

**If the repo doesn’t exist yet:** Create it at https://github.com/new with name **ptulin** (no README).

Then in Terminal:

```bash
cd /Users/patu/Documents/CursorProjects/Pavotu
git push -u origin main
```

When prompted for password, use a **Personal Access Token** (not your GitHub password):  
https://github.com/settings/tokens → Generate new token (classic), scope `repo`.

---

## 2. Deploy to disruptiveexperience.com

Your server uses **cPanel** and paths under `~/disruptiveexperience.com/public_html/`.

### Option A: cPanel Git (recommended)

1. In cPanel → **Git Version Control** → **Create**.
2. Set:
   - **Repository URL:** `https://github.com/ptulin/ptulin.git`
   - **Repository path:** `public_html`  
     (or e.g. `public_html/portfolio` if you want https://disruptiveexperience.com/portfolio/)
3. Create, then **Manage** → **Pull**.
4. **If you used `public_html`:** The repo has a `pavotu-local` folder; the site must be served from inside it. Either:
   - Set your domain’s document root in cPanel to `public_html/pavotu-local`, or
   - Run the copy one-liner below (on the server) so that the **contents** of `pavotu-local/` end up in the web root.

**One-liner to run on the server (SSH or cPanel Terminal)** so the live site is at the root of disruptiveexperience.com:

```bash
cd ~/ptulin
git pull origin main
mkdir -p ~/disruptiveexperience.com/public_html
cp -rf pavotu-local/* ~/disruptiveexperience.com/public_html/
chmod -R 755 ~/disruptiveexperience.com/public_html
find ~/disruptiveexperience.com/public_html -type f -exec chmod 644 {} \;
echo "✅ Deployed. Visit https://disruptiveexperience.com/"
```

(If cPanel cloned the repo into a different path, replace `~/ptulin` with that path, e.g. `~/public_html` if you cloned into `public_html` and then move contents of `pavotu-local` up – see Option B.)

### Option B: Clone into a subfolder, then copy to root

On the server:

```bash
cd ~
git clone https://github.com/ptulin/ptulin.git ptulin
mkdir -p ~/disruptiveexperience.com/public_html
cp -rf ptulin/pavotu-local/* ~/disruptiveexperience.com/public_html/
chmod -R 755 ~/disruptiveexperience.com/public_html
```

For future updates:

```bash
cd ~/ptulin && git pull origin main && cp -rf pavotu-local/* ~/disruptiveexperience.com/public_html/
```

---

## Summary

| Item | Value |
|------|--------|
| GitHub repo | https://github.com/ptulin/ptulin |
| Server web root | `~/disruptiveexperience.com/public_html/` |
| Site contents | Everything inside `pavotu-local/` (index.html, assets/, etc.) |
