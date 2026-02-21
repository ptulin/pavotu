# If the page is white: fix permissions and verify files

Run these on the server (SSH).

**1. Confirm files are there**
```bash
cd /home1/moose/disruptiveexperience.com/public_html/pavotu
ls -la index.html assets/css/style.css
```

**2. Fix permissions (so the web server can read files)**
```bash
cd /home1/moose/disruptiveexperience.com/public_html/pavotu
find . -path ./.git -prune -o -type d -exec chmod 755 {} \;
find . -path ./.git -prune -o -type f -exec chmod 644 {} \;
```

**3. Test from the server**
```bash
curl -I https://disruptiveexperience.com/pavotu/
```
You want to see `200 OK`. If you see `403 Forbidden` or `404 Not Found`, the problem is path or config, not just permissions.
