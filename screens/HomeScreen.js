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
      <Text style={styles.text1}>Welcome to Ystra</Text>
      <Text style={styles.text2}>Bring your art to home</Text>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    marginVertical: 8,
  },
  image: {
    width: "111.5%",
    height: "100%",
    position: "absolute",
  },
  welcomtext: {
    fontSize: 30,
    opacity: 0.65,
    fontWeight: "bold",
    color: "black",
    bottom: 550,
  },
  sentencetext: {
    fontSize: 20,
    opacity: 0.65,
    fontWeight: "bold",
    color: "black",
    bottom: 525,
  },
});
