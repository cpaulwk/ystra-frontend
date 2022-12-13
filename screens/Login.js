import {
  Button,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
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
    }, 1000);
  }, []);
  return (
    <>
      {/*Composant login avec 2 inputs */}
      <View style={styles.logincontainer}>
        <Text style={styles.beforeinputtext}>Username</Text>
        <TextInput placeholder="Username or Email" style={styles.input} />
        <Text style={styles.beforeinputtext}>Username or Email</Text>
        <TextInput placeholder="Password" style={styles.input} />
      </View>
      <SafeAreaView style={styles.container}>
        <View style={styles.buttoncontainer}>
          <View>
            <Text style={styles.title}></Text>
            <TouchableOpacity
              style={styles.buttonlogin}
              onPress={() => Alert.alert("Button pressed")}>
              <Button
                title="Login"
                color="white"
                onPress={() => Alert.alert("Simple Button pressed")}
              />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.title}></Text>
            <TouchableOpacity
              style={styles.buttonlogingoogle}
              onPress={() => Alert.alert("Button pressed")}>
              <Button
                title="Login with Google"
                color="white"
                onPress={() => Alert.alert("Simple Button pressed")}
              />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
      <Text style={styles.welcomtext}>Welcome to Ystra</Text>
      <Text style={styles.sentencetext}>Bring your art to home</Text>
    </>
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
  buttoncontainer: {
    marginBottom: 0,
  },
  buttonlogin: {
    opacity: 0.9,
    marginTop: 75,
    backgroundColor: "black",
    borderWidth: 0,
    borderRadius: 10,
    padding: 10,
    width: 350,
  },
  buttonlogingoogle: {
    opacity: 0.93,
    marginTop: 10,
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
