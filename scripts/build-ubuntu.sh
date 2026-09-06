#!/usr/bin/env bash
set -euo pipefail

if ! command -v node >/dev/null 2>&1; then
  echo "Node.js is required (Node 20 recommended)."
  exit 1
fi
if ! command -v java >/dev/null 2>&1; then
  echo "Java 17 is required."
  exit 1
fi

corepack enable
pnpm install --frozen-lockfile
npx expo prebuild --platform android --clean --no-install
(
  cd android
  ./gradlew assembleRelease --no-daemon
)
mkdir -p dist
cp android/app/build/outputs/apk/release/app-release.apk dist/BrightPath-Tutor-Standalone.apk
echo
echo "APK created: dist/BrightPath-Tutor-Standalone.apk"
