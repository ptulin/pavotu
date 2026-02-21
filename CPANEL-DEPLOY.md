# Deploy Pavotu in cPanel (only step left)

**Goal:** Site live at **https://disruptiveexperience.com/pavotu/**

---

## In cPanel

### 1. Git Version Control → Create

1. Open **Git Version Control**.
2. Click **Create**.
3. Set:
   - **Repository URL:** `https://github.com/ptulin/pavotu.git`
   - **Repository path:** `public_html/pavotu`
4. Click **Create**. cPanel will clone the repo into `public_html/pavotu`.

### 2. Copy site files into the web root

The repo has a `pavotu-local` folder; the site must be served from the contents of that folder in `public_html/pavotu/`.

**Option A – cPanel Terminal**

1. Open **Terminal** in cPanel.
2. Run:

```bash
cd ~/disruptiveexperience.com/public_html/pavotu
git pull origin main
cp -rf pavotu-local/* .
```

3. Done. Open **https://disruptiveexperience.com/pavotu/** in your browser.

**Option B – Run the deploy script**

1. In cPanel **Terminal**:

```bash
cd ~/disruptiveexperience.com/public_html/pavotu
bash deploy-to-server.sh
```

---

## Later: update the site

1. Push changes from your Mac: `git push origin main`
2. In cPanel → **Git Version Control** → **Manage** → select the **pavotu** repo → **Pull**.
3. In **Terminal** run again:

```bash
cd ~/disruptiveexperience.com/public_html/pavotu
cp -rf pavotu-local/* .
```

Or: `bash deploy-to-server.sh`

---

**Live URL:** https://disruptiveexperience.com/pavotu/
