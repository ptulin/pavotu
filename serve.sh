#!/bin/bash
set -euo pipefail

# Serve the canonical static source directory.
cd "$(dirname "$0")"
PORT="${1:-8765}"
DOCROOT="site"

pid=$(lsof -ti :"$PORT" 2>/dev/null || true)
if [ -n "${pid}" ]; then
  kill "${pid}" 2>/dev/null || true
  echo "Stopped existing server on port ${PORT} (PID ${pid})."
  sleep 1
fi

echo "Serving ${DOCROOT}/ at http://127.0.0.1:${PORT}/"
exec python3 -m http.server "${PORT}" --directory "${DOCROOT}"
