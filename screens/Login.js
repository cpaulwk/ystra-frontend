import {
  Button,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ImageBackground,
  TextInput,
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
      <SafeAreaView style={styles.container}>
        <View style={styles.inputcontainer}>
          <Text style={styles.beforeinputtext}>Username</Text>
          <TextInput placeholder="Email or Username" style={styles.input} />
          <Text style={styles.beforeinputtext}>Password</Text>
          <TextInput placeholder="Password" style={styles.input} />
        </View>
        <View style={styles.buttoncontainer}>
          <TouchableOpacity
            style={styles.buttonregister}
            onPress={() => Alert.alert("Button pressed")}>
            <Button
              title="Register"
              color="white"
              onPress={() => Alert.alert("Simple Button pressed")}
            />
          </TouchableOpacity>

          <Text style={styles.ortext}>━━━━━ or ━━━━━</Text>
          <TouchableOpacity
            style={styles.buttongoogle}
            onPress={() => Alert.alert("Button pressed")}>
            <Button
              title="Register with Google"
              color="white"
              onPress={() => Alert.alert("Simple Button pressed")}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <Text style={styles.keeptext}>Keep your own art</Text>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  view: {},
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
  keeptext: {
    fontSize: 30,
    opacity: 0.65,
    fontWeight: "bold",
    color: "black",
    bottom: 550,
  },
  ortext: {
    fontSize: 25,
    opacity: 1,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
  buttoncontainer: {
    marginTop: 180,
  },
  buttonregister: {
    opacity: 0.9,
    backgroundColor: "black",
    borderWidth: 0,
    borderRadius: 10,
    padding: 10,
    width: 350,
  },
  buttongoogle: {
    opacity: 0.93,
    marginTop: 5,
    backgroundColor: "#2C6DB4",
    borderWidth: 0,
    borderRadius: 10,
    padding: 10,
    width: 350,
  },
  input: {
    borderWidth: 1,
    borderColor: "#9ca3af",
    padding: 12,
    opacity: 0.93,
    width: 330,
    marginTop: 15,
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    fontSize: 16,
  },
  inputcontainer: {
    flex: 1,
    marginTop: 250,
    // opacity: 0.5,

    // backgroundColor: "white",
  },
  beforeinputtext: {
    marginBottom: -10,
    fontSize: 15,
    fontWeight: "bold",
  },
});
