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

import { useState, useEffect } from "react";

export default function HomePage({ navigation }) {
  const [showButtons, setShowButtons] = useState(false); // état initial pour cacher les boutons
  const [showRegisterPage, setshowRegisterPage] = useState(false); // état initial lors du click sur register
  const [showLoginPage, setShowLoginPage] = useState(false); // état initial lors du click sur signin

  useEffect(() => {
    setTimeout(() => {
      setShowButtons(true); // màj de l'état après 2 secondes pour afficher les boutons
    }, 2000);
  }, []);
  return (
    <KeyboardAvoidingView
      style={{ ...styles.container, justifyContent: "flex-start" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ImageBackground
        style={styles.image}
        source={require("../assets/homescreen-background.jpg")}
      />
      <SafeAreaView style={styles.container}>
        {showButtons && (
          <>
            <View style={styles.buttoncontainer}>
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
              <View>
                <Text style={styles.title}></Text>
                <TouchableOpacity
                  style={styles.buttonsignin}
                  onPress={() => Alert.alert("Button pressed")}>
                  <Button
                    title="Login"
                    color="white"
                    onPress={() => Alert.alert("Simple Button pressed")}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      </SafeAreaView>
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
  buttonregister: {
    opacity: 0.9,
    marginTop: 475,
    backgroundColor: "black",
    borderWidth: 0,
    borderRadius: 10,
    padding: 10,
    width: 350,
  },
  buttonsignin: {
    opacity: 0.93,
    marginTop: 10,
    backgroundColor: "#2C6DB4",
    borderWidth: 0,
    borderRadius: 10,
    padding: 10,
    width: 350,
  },
});
