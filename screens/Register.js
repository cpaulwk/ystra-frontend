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
} from "react-native";

export default function HomePage({ navigation }) {
  const Separator = () => <View style={styles.separator} />;
  return (
    <KeyboardAvoidingView
      style={{ ...styles.container, justifyContent: "flex-start" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ImageBackground
        style={styles.image}
        source={require("../assets/homescreen-background.jpg")}
      />
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={styles.title}></Text>
          <TouchableOpacity
            style={styles.buttonregister}
            onPress={() => Alert.alert("Button pressed")}>
            <Button
              title="Register"
              color="white"
              onPress={() => Alert.alert("Simple Button pressed")}
            />
          </TouchableOpacity>
        </View>
        <Separator />

        <View>
          <Text style={styles.title}></Text>
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
      <View style={{ borderWidth: 1, borderColor: "black", padding: 5 }}>
        <Text style={styles.ortext}>or</Text>
      </View>
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
  keeptext: {
    fontSize: 30,
    opacity: 0.65,
    fontWeight: "bold",
    color: "black",
    bottom: 550,
  },
  ortext: {
    fontSize: 30,
    opacity: 1,
    fontWeight: "bold",
    color: "black",
    bottom: 145,
  },
  buttonregister: {
    opacity: 0.9,
    marginTop: 475,
    backgroundColor: "black",
    borderWidth: 0,
    borderRadius: 10,
    padding: 10,
    width: 350,
  },
  buttongoogle: {
    opacity: 0.93,
    marginTop: 10,
    backgroundColor: "#2C6DB4",
    borderWidth: 0,
    borderRadius: 10,
    padding: 10,
    width: 350,
  },
});
