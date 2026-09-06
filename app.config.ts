import type { ExpoConfig } from "expo/config";

const config: ExpoConfig = {
  name: "BrightPath Tutor",
  slug: "brightpath-tutor",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "brightpathtutor",
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.brightpath.tutor",
    infoPlist: { ITSAppUsesNonExemptEncryption: false },
  },
  android: {
    package: "com.brightpath.tutor",
    versionCode: 1,
    adaptiveIcon: {
      backgroundColor: "#E6F4FE",
      foregroundImage: "./assets/images/android-icon-foreground.png",
      backgroundImage: "./assets/images/android-icon-background.png",
      monochromeImage: "./assets/images/android-icon-monochrome.png",
    },
    edgeToEdgeEnabled: true,
    predictiveBackGestureEnabled: false,
    permissions: ["POST_NOTIFICATIONS"],
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./assets/images/favicon.png",
  },
  plugins: [
    "expo-router",
    ["expo-audio", { microphonePermission: "Allow $(PRODUCT_NAME) to access your microphone." }],
    ["expo-video", { supportsBackgroundPlayback: true, supportsPictureInPicture: true }],
    [
      "expo-splash-screen",
      {
        image: "./assets/images/splash-icon.png",
        imageWidth: 200,
        resizeMode: "contain",
        backgroundColor: "#ffffff",
        dark: { backgroundColor: "#000000" },
      },
    ],
    ["expo-build-properties", { android: { buildArchs: ["arm64-v8a", "armeabi-v7a"], minSdkVersion: 24 } }],
  ],
  experiments: { typedRoutes: true, reactCompiler: true },
};

export default config;
