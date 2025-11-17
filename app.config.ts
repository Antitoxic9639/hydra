import packageJson from './package.json';

const projectId = "2b6189c2-7a11-4638-9028-e1276c014727";
const IS_DEV = process.env.APP_VARIANT === 'development';

module.exports = {
  expo: {
    name: "Hydra",
    slug: "hydra",
    version: packageJson.version,
    newArchEnabled: true,
    runtimeVersion: {
      policy: 'appVersion',
    },
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "hydra",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/images/splash.png",
      resizeMode: "contain",
      backgroundColor: "#000000"
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      appStoreUrl: "https://apps.apple.com/us/app/hydra-for-reddit/id6478089063",
      supportsTablet: true,
      bundleIdentifier: "com.ibbe.hydra",
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false,
        UIDesignRequiresCompatibility: true,
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#000000"
      }
    },
    web: {
      bundler: "metro",
      favicon: "./assets/images/favicon.png"
    },
    extra: {
      eas: {
        projectId,
      }
    },
    owner: "testaraaa",
    plugins: [
      "expo-router",
      [
        'expo-media-library', {
          savePhotosPermission: 'Allow $(PRODUCT_NAME) to save photos and videos to your library.',
        }
      ],
      "@sentry/react-native/expo",
      [
        'expo-image-picker', {
          "photosPermission": "$(PRODUCT_NAME) accesses your photos to upload images.",
        }
      ],
      'expo-notifications',
      [
        'expo-video',
        {
          "supportsPictureInPicture": true,
        }
      ],
      [
        "expo-alternate-app-icons",
        [
          {
            "name": "cerberus",
            "ios": "./assets/images/custom_icons/cerberus.png",
            "android": {
              "foregroundImage": "./assets/images/custom_icons/cerberus.png",
              "backgroundColor": "#FFFFFF",
            },
          },
        ]
      ],
      [
        "react-native-safari-extension",
        {
          "folderName": "IosExtension",
        }
      ]
    ],
    updates: {
      url: `https://u.expo.dev/${projectId}`,
      fallbackToCacheTimeout: 5000,
    }
  }
}
