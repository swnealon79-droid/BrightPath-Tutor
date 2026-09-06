# BrightPath Tutor — Standalone Android Build

This edition no longer requires the Manus runtime or the BrightPath tRPC server to start and use the learning app. Learner profiles, activities, progress, family settings, and tutoring hints operate on the Android device.

## Fastest route: GitHub Actions

1. Create a GitHub repository and upload the **contents** of this project folder.
2. Open the repository's **Actions** tab.
3. Select **Build Standalone Android APK**.
4. Choose **Run workflow**.
5. When the run finishes, open the run and download the artifact named **BrightPath-Tutor-Standalone-APK**.
6. Unzip the artifact on the Android phone and install `BrightPath-Tutor-Standalone.apk`.

Android may ask you to allow installs from the browser/file manager you used to open the APK.

## Ubuntu terminal route

Install Node.js 20, Java 17, and the Android SDK first. Then from the project directory run:

```bash
./scripts/build-ubuntu.sh
```

The APK will be written to:

```text
dist/BrightPath-Tutor-Standalone.apk
```

## Important signing note

The first goal is an installable standalone APK for testing. Before publishing to Google Play or distributing updates long-term, configure a permanent release keystore and protect its credentials with GitHub Actions secrets. Never commit the keystore password to the repository.

## What changed from the Manus backup

- Removed the Manus runtime initialization from app startup.
- Removed the OAuth callback route from the mobile app.
- Removed the runtime tRPC provider from the app shell.
- Replaced the server-only AI tutor request with an on-device tutoring/safety helper so the app still works without a backend.
- Changed the Android package to `com.brightpath.tutor`.
- Added a GitHub Actions APK build workflow.
- Added an Ubuntu build script.

The original `server/` source is retained as reference for a future optional online AI service, but the Android app no longer needs it for normal operation.
