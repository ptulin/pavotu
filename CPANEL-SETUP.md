# cPanel Git setup for https://disruptiveexperience.com/pavotu/

**Same pattern as your disruptive project:** repo path = **public_html/pavotu** (like **public_html/disruptive**). The repo lives where the web server serves from; Update from Remote = live site.

## 1. Repository path (match disruptive)

Your **disruptive** repo is at **public_html/disruptive**. Pavotu should match:

**In cPanel → Git Version Control → Create:**

| Field | Value |
|-------|--------|
| **Clone a Repository** | On |
| **Clone URL** | `https://github.com/ptulin/pavotu.git` |
| **Repository Path** | `public_html/pavotu` |
| **Repository Name** | `pavotu` |

**Full path on server:** `/home1/moose/public_html/pavotu`  
So **https://disruptiveexperience.com/pavotu/** serves files from that directory (no deploy copy step).

## 2. Before creating

If `public_html/pavotu` already exists (e.g. symlink or old folder), remove it so the clone can create it:

```bash
rm -f ~/public_html/pavotu
```

## 3. Create the repository in cPanel

1. **Create** → **Clone a Repository** = On.
2. **Clone URL:** `https://github.com/ptulin/pavotu.git`
3. **Repository Path:** `public_html/pavotu`
4. **Repository Name:** `pavotu`
5. Click **Create** and wait for the clone to finish.

## 4. After the clone

1. **Manage** → **Pull or Deploy** → **Update from Remote**.
2. If WordPress handles the main site, add the pavotu pass-through once (SSH):
   ```bash
   grep -q 'RewriteRule ^pavotu' ~/public_html/.htaccess || (cp ~/public_html/.htaccess ~/public_html/.htaccess.bak && awk '/RewriteEngine On/ { print; print "RewriteRule ^pavotu(/.*)?$ - [L]"; next }1' ~/public_html/.htaccess > ~/public_html/.htaccess.new && mv ~/public_html/.htaccess.new ~/public_html/.htaccess)
   ```
3. If you get **403 Forbidden**, run the fix script (permissions + .htaccess):
   ```bash
   cd ~/public_html/pavotu && git pull origin main && bash fix-pavotu-403.sh
   ```
4. Open **https://disruptiveexperience.com/pavotu/**.

## 5. Later: updating the site

- Push to GitHub, then in cPanel: **Update from Remote** (same as disruptive). No Deploy step.
