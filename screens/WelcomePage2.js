import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  Image,
} from "react-native";
import React from "react";
import { useState } from "react";

export default function WelcomePage({ navigation }) {
  const [showPages, setShowPages] = useState(0);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    fetch("https://ystra-backend.vercel.app/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.result === true) {
          navigation.navigate("WelcomePage");
        } else {
          //message d'erreur
        }
      })
      .catch((error) => {
        // gérer les erreurs
      });
  };

  const handleLogin = () => {
    fetch("https://ystra-backend.vercel.app/users/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.result === true) {
          navigation.navigate("WelcomePage");
        } else {
          //message d'erreur
        }
      })
      .catch((error) => {
        // gérer les erreurs
      });
  };
  let welcomeblock = (
    <View style={styles.buttoncontainer}>
      <TouchableOpacity
        style={styles.blackbutton}
        onPress={() => {
          setShowPages(1); // navigation vers REGISTER
        }}
      >
        <Text style={styles.textbutton}> Register</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.bluebutton}
        onPress={() => {
          setShowPages(2); // navigation vers la page de connexion
        }}
      >
        <Text style={styles.textbutton}> Login</Text>
      </TouchableOpacity>
    </View>
  );

  /*REGISTER BLOCK*/ if (showPages === 1) {
    welcomeblock = (
      <View style={styles.registercontainer}>
        <View style={styles.inputcontainer}>
          <Text style={styles.beforeinputtext}>Username</Text>

          <TextInput
            placeholder="Username"
            style={styles.input}
            value={username}
            onChangeText={(value) => setUsername(value)}
          />
          <Text style={styles.beforeinputtext}>Email</Text>
          <TextInput
            keyboardType="email-adress"
            placeholder="Email"
            style={styles.input}
            value={email}
            onChangeText={(value) => setEmail(value)}
          />

          <Text style={styles.beforeinputtext}>Password</Text>
          <TextInput
            secureTextEntry={true}
            value={password}
            placeholder="Password"
            style={styles.input}
            onChangeText={(value) => setPassword(value)}
          />

          <TextInput />
        </View>
        <TouchableOpacity
          style={styles.blackbutton}
          onPress={() => handleRegister()}
        >
          <Text style={styles.textbutton}>Validate</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bluebutton}
          onPress={() => {
            // OUVRE API SIGNUP GOOGLE
          }}
        >
          <Text style={styles.textbutton}> Register with Google</Text>
        </TouchableOpacity>
      </View>
    );
  }
  /*LOGIN BLOCK*/ if (showPages === 2) {
    welcomeblock = (
      <View style={styles.logincontainer}>
        <Text style={styles.beforeinputtext}>Username</Text>
        <TextInput
          placeholder="Username or Email"
          style={styles.input}
          value={username}
          onChangeText={(value) => setUsername(value)}
        />
        <Text style={styles.beforeinputtext}>Password</Text>
        <TextInput
          placeholder="Password"
          style={styles.input}
          value={password}
          onChangeText={(value) => setPassword(value)}
        />
        <View style={styles.buttoncontainer}>
          <TouchableOpacity
            style={styles.blackbutton}
            onPress={() => handleLogin()}
          >
            <Text style={styles.textbutton}> Validate</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bluebutton}
            onPress={() => {
              // OUVRE API LOGIN GOOGLE
            }}
          >
            <Text style={styles.textbutton}> Login with Google</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <ImageBackground
      style={styles.backgroundimage}
      source={require("../assets/homescreen-background.jpg")}
      resizeMode="stretch"
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
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
    flex: "column",
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
    marginBottom: -100,
  },
  sentencetext: {
    fontSize: 20,
    opacity: 0.65,
    fontWeight: "bold",
    color: "black",
    marginBottom: 285,
  },

  buttoncontainer: {
    flex: "column",
    marginBottom: 30,
    justifyContent: "flex-end",
    alignItems: "center",
    borderWidth: 7,
    borderColor: "red",
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

//
