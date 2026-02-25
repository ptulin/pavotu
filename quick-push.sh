#!/bin/bash
# Quick push to ptulin/pavotu (same pattern as DE.Main/quick-push.sh)
cd "$(dirname "$0")"

if [ -z "$GITHUB_TOKEN" ]; then
  if [ -f ~/.github_token ]; then
    export GITHUB_TOKEN=$(cat ~/.github_token)
  else
    echo "GitHub token not set. Run:"
    echo "  export GITHUB_TOKEN=your_token"
    echo "  ./quick-push.sh"
    echo "Or create ~/.github_token (get token: https://github.com/settings/tokens)"
    exit 1
  fi
fi

python3 push-to-github.py
