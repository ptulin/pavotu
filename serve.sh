#!/bin/bash
# Stop any server on 8765, then start from project root. Single port, reload = run again.
cd "$(dirname "$0")"
PORT=8765
pid=$(lsof -ti :$PORT 2>/dev/null)
[ -n "$pid" ] && kill $pid 2>/dev/null && echo "Stopped existing server (PID $pid)."
sleep 1
echo "Serving at http://127.0.0.1:$PORT/"
exec python3 -m http.server $PORT
