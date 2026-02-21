#!/bin/bash
# Run this on the server (SSH). One-time setup: clean repo, permissions, .htaccess.
# Use when repo is at ~/public_html/pavotu (see CPANEL-SETUP.md).
set -e
REPO="${REPO:-$HOME/public_html/pavotu}"
DOMAIN_HTA="${DOMAIN_HTA:-$HOME/public_html/.htaccess}"
RULE='RewriteRule ^pavotu(/.*)?$ - [L]'

echo "1. Going to repo..."
cd "$REPO"

echo "2. Reset and clean (keep .git)..."
git fetch origin
git reset --hard origin/main
git clean -fd

echo "3. Permissions (dirs 755, files 644, skip .git)..."
find . -path ./.git -prune -o -type d -exec chmod 755 {} \;
find . -path ./.git -prune -o -type f -exec chmod 644 {} \;

echo "4. Ensure pavotu .htaccess (DirectoryIndex)..."
echo 'DirectoryIndex index.html' > "$REPO/.htaccess"

echo "5. Exclude /pavotu/ from WordPress in domain .htaccess..."
if [ ! -f "$DOMAIN_HTA" ]; then
  echo "   Creating $DOMAIN_HTA (was missing)..."
  printf '%s\n%s\n' 'RewriteEngine On' 'RewriteRule ^pavotu(/.*)?$ - [L]' > "$DOMAIN_HTA"
else
  if grep -q 'RewriteRule ^pavotu' "$DOMAIN_HTA" 2>/dev/null; then
    echo "   Already present."
  else
    cp "$DOMAIN_HTA" "${DOMAIN_HTA}.bak"
    awk '/RewriteEngine On/ { print; print "RewriteRule ^pavotu(/.*)?$ - [L]"; next }1' "$DOMAIN_HTA" > "${DOMAIN_HTA}.new" && mv "${DOMAIN_HTA}.new" "$DOMAIN_HTA"
    echo "   Added. Backup: ${DOMAIN_HTA}.bak"
  fi
fi

echo "6. Quick test..."
curl -sI "https://disruptiveexperience.com/pavotu/" | head -1
echo ""
echo "Done. Open: https://disruptiveexperience.com/pavotu/"
