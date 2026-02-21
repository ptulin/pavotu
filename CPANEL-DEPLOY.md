# Deploy Pavotu in cPanel

**Goal:** Site live at **https://disruptiveexperience.com/pavotu/**

The deploy script **creates the directory `public_html/pavotu`** if it doesn’t exist and clones from GitHub (or pulls if already cloned). You can use either **Option A** (script only) or **Option B** (cPanel Git + copy).

---

## Option A – One script (creates dir + deploys)

1. In cPanel open **Terminal**.
2. Run (paste the whole block):

```bash
cd ~
curl -sL https://raw.githubusercontent.com/ptulin/pavotu/main/deploy-to-server.sh -o deploy-pavotu.sh
chmod +x deploy-pavotu.sh
bash deploy-pavotu.sh
```

**Or** if the repo is already there (e.g. you cloned it somewhere):

```bash
cd ~/pavotu-repo
bash deploy-to-server.sh
```

The script will:
- Create `~/disruptiveexperience.com/public_html/pavotu` if it doesn’t exist
- Clone https://github.com/ptulin/pavotu into `~/pavotu-repo` (or pull if it exists)
- Copy `pavotu-local/*` into `public_html/pavotu/`

3. Open **https://disruptiveexperience.com/pavotu/** in your browser.

---

## Option B – cPanel Git then copy

1. **Git Version Control → Create**
   - **Repository URL:** `https://github.com/ptulin/pavotu.git`
   - **Repository path:** `public_html/pavotu`
   - Create (this creates the `pavotu` directory and clones the repo).

2. **Terminal:**

```bash
cd ~/disruptiveexperience.com/public_html/pavotu
git pull origin main
cp -rf pavotu-local/* .
```

3. Open **https://disruptiveexperience.com/pavotu/** in your browser.

---

## Updating the site later

1. Push from your Mac: `git push origin main`
2. On the server in **Terminal**:

```bash
cd ~/pavotu-repo
bash deploy-to-server.sh
```

(Or with Option B: cPanel Git → Manage → Pull, then run `cp -rf pavotu-local/* .` in that directory.)

---

**Summary:** The script creates the `pavotu` directory on the server and deploys from GitHub. **I did not push to GitHub from here** — you still need to run `git push -u origin main` from your Mac (and create the repo `pavotu` on GitHub if it doesn’t exist).
