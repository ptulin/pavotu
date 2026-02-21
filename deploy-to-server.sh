#!/bin/bash
# Deploy Pavotu portfolio to disruptiveexperience.com
# Run this ON THE SERVER (SSH or cPanel Terminal) after cloning the repo.
# Or: run locally with SSH: ssh user@disruptiveexperience.com 'bash -s' < deploy-to-server.sh

set -e

# Where the repo is on the server (change if you cloned elsewhere)
REPO_DIR="${REPO_DIR:-$HOME/ptulin}"
if [ ! -d "$REPO_DIR" ]; then
  echo "Cloning repo..."
  git clone https://github.com/ptulin/ptulin.git "$REPO_DIR"
fi

cd "$REPO_DIR"
git pull origin main

# Web root for disruptiveexperience.com (same pattern as DE.Main)
WEB_ROOT="${WEB_ROOT:-$HOME/disruptiveexperience.com/public_html}"
mkdir -p "$WEB_ROOT"

echo "Copying pavotu-local/* to $WEB_ROOT ..."
cp -rf pavotu-local/* "$WEB_ROOT/"

chmod -R 755 "$WEB_ROOT"
find "$WEB_ROOT" -type f -exec chmod 644 {} \;

echo "✅ Deployed. Visit https://disruptiveexperience.com/"
