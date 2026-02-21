# Manual deploy (if cPanel Deploy stays white)

If **Deploy HEAD Commit** gives no confirmation and https://disruptiveexperience.com/pavotu stays white, copy the site files by hand once so the site works. You can fix the automated deploy later.

## Steps in cPanel File Manager

1. **Open File Manager**  
   cPanel → **Files** → **File Manager**.

2. **Go to the pavotu folder**  
   Navigate to `public_html` → `pavotu`.  
   (Full path is something like `public_html/pavotu` or `/home1/moose/.../public_html/pavotu`.)

3. **Check what’s there**  
   You should see at least:
   - `.git` (folder)
   - `.cpanel.yml` (file)
   - **`pavotu-local`** (folder) ← site files are inside here

4. **Copy contents of `pavotu-local` into `pavotu`**  
   - Open the **`pavotu-local`** folder.
   - Select **all** items inside (e.g. **Select All** or Ctrl/Cmd+A):
     - `index.html`, `work.html`, `resume.html`, `pearson.html`, `ibm.html`, `lord-abbett.html`, `README.md`
     - **`assets`** folder (with `css/`, `images/` inside)
   - Use **Copy** (or right‑click → Copy).
   - Go **back** to the **`pavotu`** folder (parent of `pavotu-local`).
   - **Paste**.
   - If asked about overwriting, choose to overwrite.

5. **Check the result**  
   Inside `pavotu` you should now see:
   - `index.html`, `work.html`, `resume.html`, etc.
   - `assets` folder with `css/style.css`, `images/logo-r.svg`, etc.

6. **Test the site**  
   Open: **https://disruptiveexperience.com/pavotu/**  
   The portfolio should load (no white page).

---

**After the site works:** If you want to rely on **Deploy HEAD Commit** again, we can debug why the `.cpanel.yml` copy isn’t running (e.g. path, permissions, or logs).
