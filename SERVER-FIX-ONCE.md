# One-time server fix (merge blocked by old copied files)

The server has leftover **untracked** files from the old deploy copy (README.md, index.html, assets/…). Git refuses to pull until they’re removed.

**Run these commands once on the server** (SSH or cPanel **Terminal**):

```bash
cd /home1/moose/disruptiveexperience.com/public_html/pavotu
git clean -fd
```

Then in cPanel: **Git → Manage pavotu → Pull or Deploy → Update from Remote**.

`git clean -fd` removes untracked files and directories in that repo so the next pull can apply the new layout (site at repo root).
