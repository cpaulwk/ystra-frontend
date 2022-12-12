import {
  Button,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";

export default function HomePage({ navigation }) {
  return (
    <KeyboardAvoidingView
      style={{ ...styles.container, justifyContent: "flex-start" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <Image
        style={styles.image}
        source={require("../assets/homescreen-background.jpg")}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  title: {
    width: "80%",
    fontSize: 38,
    fontWeight: "600",
  },
});
