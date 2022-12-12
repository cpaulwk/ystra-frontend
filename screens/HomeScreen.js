import {
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  SafeAreaView,
} from "react-native";

export default function HomePage({ navigation }) {
  return (
    <KeyboardAvoidingView
      style={{ ...styles.container, justifyContent: "flex-start" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ImageBackground
        style={styles.image}
        source={require("../assets/homescreen-background.jpg")}
      />
      <SafeAreaView style={styles.container}></SafeAreaView>
      <Text style={styles.welcomtext}>Welcome to Ystra</Text>
      <Text style={styles.sentencetext}>Bring your art to home</Text>
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
