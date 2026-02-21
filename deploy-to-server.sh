#!/bin/bash
# Deploy Pavotu portfolio to disruptiveexperience.com/pavotu/
# Run this ON THE SERVER (cPanel Terminal or SSH).
# Creates public_html/pavotu if needed, clones or pulls from GitHub, then copies site files.

set -e

REPO_URL="https://github.com/ptulin/pavotu.git"
# Where the site must live: https://disruptiveexperience.com/pavotu/
WEB_ROOT="${WEB_ROOT:-$HOME/disruptiveexperience.com/public_html/pavotu}"
# Where we clone/pull the repo (can be same as WEB_ROOT or a separate dir)
REPO_DIR="${REPO_DIR:-$HOME/pavotu-repo}"

echo "Creating directory: $WEB_ROOT"
mkdir -p "$WEB_ROOT"

if [ ! -d "$REPO_DIR/.git" ]; then
  echo "Cloning repo into $REPO_DIR ..."
  rm -rf "$REPO_DIR"
  git clone "$REPO_URL" "$REPO_DIR"
fi

cd "$REPO_DIR"
git pull origin main

echo "Copying pavotu-local/* to $WEB_ROOT ..."
cp -rf pavotu-local/* "$WEB_ROOT/"

chmod -R 755 "$WEB_ROOT"
find "$WEB_ROOT" -type f -exec chmod 644 {} \;

echo "✅ Deployed. Visit https://disruptiveexperience.com/pavotu/"
