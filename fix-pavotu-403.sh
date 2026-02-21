#!/bin/bash
# Run on server (SSH). Fixes 403: permissions + .htaccess for pavotu. Safe to run anytime.
set -e
PAVOTU="$HOME/public_html/pavotu"
MAIN_HTA="$HOME/public_html/.htaccess"

echo "1. Permissions (dirs 755, files 644)..."
find "$PAVOTU" -type d -exec chmod 755 {} \;
find "$PAVOTU" -type f -exec chmod 644 {} \;

echo "2. Pavotu .htaccess (DirectoryIndex)..."
echo 'DirectoryIndex index.html' > "$PAVOTU/.htaccess"

echo "3. Main .htaccess: exclude /pavotu/ from WordPress..."
if [ ! -f "$MAIN_HTA" ]; then
  printf '%s\n%s\n' 'RewriteEngine On' 'RewriteRule ^pavotu(/.*)?$ - [L]' > "$MAIN_HTA"
  echo "   Created."
else
  if grep -q 'RewriteRule ^pavotu' "$MAIN_HTA" 2>/dev/null; then
    echo "   Already present."
  else
    cp "$MAIN_HTA" "${MAIN_HTA}.bak"
    awk '/RewriteEngine On/ { print; print "RewriteRule ^pavotu(/.*)?$ - [L]"; next }1' "$MAIN_HTA" > "${MAIN_HTA}.new" && mv "${MAIN_HTA}.new" "$MAIN_HTA"
    echo "   Added. Backup: ${MAIN_HTA}.bak"
  fi
fi

echo "4. Test..."
curl -sI "https://disruptiveexperience.com/pavotu/" | head -1
echo ""
echo "Done. Open: https://disruptiveexperience.com/pavotu/"
