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
  Image,
} from "react-native";

import { useState, useEffect } from "react";

export default function WelcomePage({ navigation }) {
  const [showPages, setShowPages] = useState(0);

  let welcomeblock = (
    <View style={styles.buttoncontainer}>
      <TouchableOpacity
        style={styles.blackbutton}
        onPress={() => {
          navigation.navigate('TabNavigator');
          setShowPages(1); // navigation vers REGISTER
        }}>
        <Text style={styles.textbutton}> Register</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.bluebutton}
        onPress={() => {
          setShowPages(2); // navigation vers la page de connexion
          navigation.navigate('TabNavigator');
        }}>
        <Text style={styles.textbutton}> Login</Text>
      </TouchableOpacity>
    </View>
  );

  if (showPages === 1) {
    welcomeblock = (
      // REGISTER BLOCK
      <View style={styles.buttoncontainer}>
        <View style={styles.inputcontainer}>
          <Text style={styles.beforeinputtext}>Username</Text>
          <TextInput placeholder="Username" style={styles.input} />
          <Text style={styles.beforeinputtext}>Email</Text>
          <TextInput
            keyboardType="email-adress"
            placeholder="Email"
            style={styles.input}
          />
          <Text style={styles.beforeinputtext}>Password</Text>
          <TextInput
            secureTextEntry={true}
            value="password"
            placeholder="Password"
            style={styles.input}
          />

          <TextInput />
        </View>
        <TouchableOpacity
          style={styles.blackbutton}
          onPress={() => {
            setShowPages(0); // DOIT VALIDER L'ENREGISTREMENT
          }}>
          <Text style={styles.textbutton}> Validate</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bluebutton}
          onPress={() => {
            setShowPages(0); // OUVRE API SIGNUP GOOGLE
          }}>
          <Text style={styles.textbutton}> Register with Google</Text>
        </TouchableOpacity>
      </View>
    );
  }
  if (showPages === 2) {
    welcomeblock = (
      // LOGIN BLOCK
      <View style={styles.logincontainer}>
        <Text style={styles.beforeinputtext}>Username</Text>
        <TextInput placeholder="Username" style={styles.input} />
        <Text style={styles.beforeinputtext}>Email</Text>
        <TextInput placeholder="Email" style={styles.input} />
        <Text style={styles.beforeinputtext}>Password</Text>
        <TextInput placeholder="Password" style={styles.input} />

        <View style={styles.buttoncontainer}>
          <TouchableOpacity
            style={styles.blackbutton}
            onPress={() => {
              setShowPages(0); // DOIT VALIDER CONNEXION
            }}>
            <Text style={styles.textbutton}> Validate</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.bluebutton}
            onPress={() => {
              setShowPages(0); // OUVRE API LOGIN GOOGLE
            }}>
            <Text style={styles.textbutton}> Login with Google</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }


  const goTab=()=>{
    navigation.navigate('TabNavigator');
  }

  return (
    <ImageBackground
      style={styles.backgroundimage}
      source={require("../assets/homescreen-background.jpg")}
      resizeMode="stretch">
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <SafeAreaView style={styles.contents}>
          <Image
            style={styles.logo}
            source={require("../assets/logoystra.png")}
          />
          <View style={styles.welcomepage}>
            <Text style={styles.welcomtext}>Welcome to Ystra</Text>
            <Text style={styles.sentencetext}>Bring your art to home</Text>
            {welcomeblock}
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    justifyContent: "space-between",
  },
  contents: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    height: "100%",
  },
  backgroundimage: {
    width: "104%",
    height: "100%",
    flex: 1,
    justifyContent: "center",
  },
  logo: {
    width: 150,
    height: 150,
  },
  textbutton: {
    fontWeight: "600",
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },
  welcomepage: {
    alignItems: "center",
  },
  welcomtext: {
    fontSize: 40,
    opacity: 0.65,
    fontWeight: "bold",
    color: "black",
    marginBottom: 50,
  },
  sentencetext: {
    fontSize: 20,
    opacity: 0.65,
    fontWeight: "bold",
    color: "black",
    marginBottom: 285,
  },
  buttoncontainer: {
    flex: 1,
    marginBottom: 30,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  blackbutton: {
    opacity: 0.9,
    marginBottom: 20,
    backgroundColor: "black",
    borderRadius: 10,
    padding: 15,
    width: 350,
  },
  bluebutton: {
    opacity: 0.93,
    marginTop: 20,
    backgroundColor: "#2C6DB4",
    borderWidth: 0,
    borderRadius: 10,
    padding: 15,
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
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    fontSize: 16,
    margin: 10,
  },
  beforeinputtext: {
    marginBottom: -10,
    fontSize: 15,
    fontWeight: "bold",
  },
});
