# cPanel Git setup for https://disruptiveexperience.com/pavotu/

Use the same pattern as your other projects: **repo in `repositories/`**, deploy to **`public_html/`**.

## 1. Repository path (like your other projects)

Your other projects live in **repositories/** (pawel, portfolio, udl-stem-lab, etc.). Pavotu should match.

**In cPanel → Git Version Control → Create:**

| Field | Value |
|-------|--------|
| **Clone a Repository** | On |
| **Clone URL** | `https://github.com/ptulin/pavotu.git` |
| **Repository Path** | `repositories/pavotu` |
| **Repository Name** | `pavotu` |

**Full path on server:** `/home1/moose/repositories/pavotu`  
The site is **not** served from there. Deployment (see below) copies files to **`public_html/pavotu`** so **https://disruptiveexperience.com/pavotu/** works.

## 2. Create the repository in cPanel

1. **Create** → **Clone a Repository** = On.
2. **Clone URL:** `https://github.com/ptulin/pavotu.git`
3. **Repository Path:** `repositories/pavotu`
4. **Repository Name:** `pavotu`
5. Click **Create** and wait for the clone to finish.

## 3. After the clone

1. **Manage** → **Pull or Deploy** → **Update from Remote** (get latest from GitHub).
2. **Deploy HEAD Commit** (runs `.cpanel.yml`: copies repo → `public_html/pavotu`, sets permissions and `.htaccess`).
3. If the main site uses WordPress, ensure **`~/public_html/.htaccess`** has the pavotu pass-through (so `/pavotu/` is not handled by WordPress). One-time, on the server:
   ```bash
   grep -q 'RewriteRule ^pavotu' ~/public_html/.htaccess || (cp ~/public_html/.htaccess ~/public_html/.htaccess.bak && awk '/RewriteEngine On/ { print; print "RewriteRule ^pavotu(/.*)?$ - [L]"; next }1' ~/public_html/.htaccess > ~/public_html/.htaccess.new && mv ~/public_html/.htaccess.new ~/public_html/.htaccess)
   ```
4. Open **https://disruptiveexperience.com/pavotu/** — the portfolio should load.

## 4. Later: updating the site

1. Push from your Mac to GitHub.
2. In cPanel: **Manage** → **Pull or Deploy** → **Update from Remote** → **Deploy HEAD Commit**.

Or on the server:
```bash
cd ~/repositories/pavotu && git pull origin main && bash -c 'export DEPLOYPATH=/home1/moose/public_html/pavotu && mkdir -p $DEPLOYPATH && cp -f index.html work.html resume.html ibm.html lord-abbett.html pearson.html README.md .htaccess $DEPLOYPATH/ 2>/dev/null; cp -rf assets $DEPLOYPATH/ 2>/dev/null; echo "DirectoryIndex index.html" > $DEPLOYPATH/.htaccess && find $DEPLOYPATH -type d -exec chmod 755 {} \; && find $DEPLOYPATH -type f -exec chmod 644 {} \;'
```
