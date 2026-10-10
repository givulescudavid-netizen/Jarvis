#!/bin/bash
# Double-click to start Jarvis. Keep this window open while you use it.
cd "$(dirname "$0")/.."
echo ""
echo "  J.A.R.V.I.S. is starting..."
echo "  Keep this window open while you use Jarvis. Close it to shut Jarvis down."
echo ""
if ! command -v python3 >/dev/null 2>&1; then
  echo "  Python is needed. A Mac window may pop up offering to install it - click Install, then run this again."
  python3 --version
  read -p "  Press Enter to close"
  exit 1
fi
(sleep 1 && open "http://localhost:8000/index.html") &
python3 -m http.server 8000 --bind 127.0.0.1
