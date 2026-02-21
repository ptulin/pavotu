#!/bin/bash
# Deploy Pavotu portfolio to disruptiveexperience.com/pavotu/
# Run this ON THE SERVER (cPanel Terminal or SSH) after cPanel has cloned the repo.

set -e

# Where cPanel cloned the repo (path under your account)
REPO_DIR="${REPO_DIR:-$HOME/disruptiveexperience.com/public_html/pavotu}"
# Site lives at public_html/pavotu/
WEB_ROOT="${WEB_ROOT:-$HOME/disruptiveexperience.com/public_html/pavotu}"

if [ ! -d "$REPO_DIR" ]; then
  echo "Error: $REPO_DIR not found. Clone the repo in cPanel Git first (path: public_html/pavotu)."
  exit 1
fi

cd "$REPO_DIR"
git pull origin main

# Copy site files from pavotu-local/ into the web root so index.html is at .../pavotu/index.html
echo "Copying pavotu-local/* to $WEB_ROOT ..."
cp -rf pavotu-local/* "$WEB_ROOT/"

chmod -R 755 "$WEB_ROOT"
find "$WEB_ROOT" -type f -exec chmod 644 {} \;

echo "✅ Deployed. Visit https://disruptiveexperience.com/pavotu/"
