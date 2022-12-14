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
  Alert,
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
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ImageBackground
        style={styles.image}
        source={require("../assets/homescreen-background.jpg")}>
        <SafeAreaView style={styles.contents}>
          {showButtons && (
            <>
              {/* export du composant login avec 3 inputs  + 2 boutons */}
              <View style={styles.logincontainer}>
                <View style={styles.inputcontainer}>
                  <Text style={styles.beforeinputtext}>Username</Text>
                  <TextInput placeholder="Username" style={styles.input} />
                  <Text style={styles.beforeinputtext}>Email</Text>
                  <TextInput placeholder="Email" style={styles.input} />
                  <Text style={styles.beforeinputtext}>Password</Text>
                  <TextInput placeholder="Password" style={styles.input} />
                </View>
                <View style={styles.buttoncontainer}>
                  <TouchableOpacity style={styles.blackbutton}>
                    <Button
                      title="Login"
                      color="white"
                      onPress={() => setshowRegisterPage(true)}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.bluebutton}>
                    <Button
                      title="Login with Google"
                      color="white"
                      onPress={() => setShowLoginPage(true)}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              {/* fin de l'import  */}
            </>
          )}
        </SafeAreaView>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },

  contents: {
    flex: "column",
    alignItems: "center",
    justifyContent: "space-between",
    height: "100%",
  },
  image: {
    width: "111.5%",
    height: "100%",
  },
  welcomemessage: {
    flex: "column",
    height: "20%",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: "45%",
  },
  welcomtext: {
    fontSize: 40,
    opacity: 0.65,
    fontWeight: "bold",
    color: "black",
    marginBottom: 30,
  },
  sentencetext: {
    fontSize: 20,
    opacity: 0.65,
    fontWeight: "bold",
    color: "black",
  },
  buttoncontainer: {
    flex: "column",
    marginBottom: 30,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  blackbutton: {
    opacity: 0.9,
    marginBottom: 20,
    backgroundColor: "black",
    borderWidth: 0,
    borderRadius: 10,
    padding: 10,
    width: 350,
  },
  bluebutton: {
    opacity: 0.93,
    marginTop: 20,
    backgroundColor: "#2C6DB4",
    borderWidth: 0,
    borderRadius: 10,
    padding: 10,
    width: 350,
  },
  registercontainer: {
    flex: 1,
    marginTop: 330,
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
  beforeinputtext: {
    marginBottom: -10,
    fontSize: 15,
    fontWeight: "bold",
  },
});
