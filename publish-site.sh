#!/bin/bash
set -euo pipefail

cd "$(dirname "$0")"

if ! command -v rsync >/dev/null 2>&1; then
  echo "rsync is required but not installed."
  exit 1
fi

echo "Publishing site/ into repository root..."
rsync -a \
  --exclude '.DS_Store' \
  site/ ./

echo "Done. Root now contains the latest static site from site/."
