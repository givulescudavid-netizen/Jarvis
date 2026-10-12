#!/bin/bash
# Cloud sessions start from a fresh copy of the repo: install graphify, add its
# /graphify skill, and build the code map (graphify-out/). No API key needed.
# The version is pinned so a new release is only used after someone bumps it here.
[ "${CLAUDE_CODE_REMOTE:-}" = "true" ] || exit 0
GRAPHIFY_VERSION=0.9.86
export PATH="$HOME/.local/bin:$PATH"
if ! command -v graphify >/dev/null 2>&1; then
  uv tool install "graphifyy==$GRAPHIFY_VERSION" >/dev/null 2>&1 || pip install --user "graphifyy==$GRAPHIFY_VERSION" >/dev/null 2>&1 || exit 0
fi
[ -n "${CLAUDE_ENV_FILE:-}" ] && echo "export PATH=\"$HOME/.local/bin:\$PATH\"" >> "$CLAUDE_ENV_FILE"
graphify install >/dev/null 2>&1
cd "${CLAUDE_PROJECT_DIR:-.}" && graphify update . >/dev/null 2>&1
exit 0
