#!/usr/bin/env bash
set -euo pipefail

npm ci
npm run lint
npm run typecheck
npm run typecheck
npm run test:proxy
npm run build

echo "Starting Next.js app for smoke checks..."
npm run start > /tmp/antigravity_start.log 2>&1 &
APP_PID=$!

cleanup() {
  if kill -0 "$APP_PID" 2>/dev/null; then
    kill "$APP_PID" || true
  fi
}
trap cleanup EXIT

for i in {1..30}; do
  if curl -fsS http://localhost:3000 >/dev/null 2>&1; then
    break
  fi
  sleep 1
  if [[ "$i" == "30" ]]; then
    echo "App failed to start. Logs:" >&2
    cat /tmp/antigravity_start.log >&2
    exit 1
  fi
done

npm run smoke

echo "Strict gate completed successfully."
