import { File, Paths } from "expo-file-system/next";
import { useContext } from "react";
import {
  ActivityIndicator,
  Alert,
  Share,
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
} from "react-native";

import URL from "./URL";
import useContextMenu from "./useContextMenu";
import { ModalContext } from "../contexts/ModalContext";
import { ThemeContext } from "../contexts/SettingsContexts/ThemeContext";

export default function useVideoMenu() {
  const showContextMenu = useContextMenu();
  const { setModal } = useContext(ModalContext);
  const { theme } = useContext(ThemeContext);

  return async (videoUrl: string) => {
    const result = await showContextMenu({
      options: ["Share"],
    });
    if (result === "Share") {
      try {
        setModal(
          <TouchableOpacity
            style={styles.modalContainer}
            onPress={() => setModal(null)}
            activeOpacity={0.9}
          >
            <View
              style={[
                styles.modal,
                {
                  backgroundColor: theme.background,
                  borderColor: theme.divider,
                },
              ]}
            >
              <Text
                style={[
                  styles.title,
                  {
                    color: theme.text,
                  },
                ]}
              >
                Preparing Video...
              </Text>
              <ActivityIndicator size="small" />
            </View>
          </TouchableOpacity>,
        );
        const fileName = new URL(videoUrl).getBasePath().split("/").pop();
        const file = new File(`${Paths.cache.uri}/${fileName}`);
        if (file.exists) {
          file.delete();
        }
        await File.downloadFileAsync(videoUrl, file);
        setModal(null);
        await Share.share({
          url: file.uri,
        });
        file.delete();
      } catch (_e) {
        Alert.alert("Error", "Failed to download video");
        setModal(null);
      }
    }
  };
}

const styles = StyleSheet.create({
  modalContainer: {
    position: "absolute",
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 16,
    marginBottom: 10,
  },
});
