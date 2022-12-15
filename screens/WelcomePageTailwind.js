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
import tw from "twrnc";
import CheckCircleFillIcon from "react-native-bootstrap-icons/icons/check-circle-fill";
import CameraFillIcon from "react-native-bootstrap-icons/icons/camera-fill";

import { useState, useEffect } from "react";

export default function HomePage({ navigation }) {
  const [showPages, setShowPages] = useState(0);

  let welcomeBlock = (
    <View style={tw`flex-1 justify-between items-center w-full`}>
      {/* Text */}
      <View style={tw`flex justify-center items-center `}>
        <View style={tw`flex items-center mt-[23%]`}>
          <Text style={tw`text-10 mb-[12%] font-bold opacity-70`}>
            Welcome to Ystra
          </Text>
          <Text style={tw`text-5.5 font-bold opacity-70`}>
            Bring your art to home
          </Text>
        </View>
      </View>

      {/* Buttons */}
      <View style={tw`flex items-center mb-[20%] w-full px-[1%]`}>
        <TouchableOpacity
          style={tw`flex justify-center items-center bg-black rounded-1.75 opacity-90 h-13 w-[90%] mb-15`}
          onPress={() => {
            setShowPages(1); // navigation vers REGISTER
          }}
        >
          <Text style={tw`text-4 text-white font-semibold`}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`flex justify-center items-center bg-[#2C6DB4] rounded-1.75 opacity-90 h-13 w-[90%]`}
          onPress={() => {
            setShowPages(2); // navigation vers la page de connexion
          }}
        >
          <Text style={tw`text-4 text-white font-semibold`}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (showPages === 1) {
    welcomeBlock = (
      <View style={tw`flex-1 justify-between items-center w-full`}>
        {/* Text and Fields */}
        <View style={tw`flex items-center w-full px-[1%]`}>
          <Text
            style={tw`flex flex-row items-center text-10 font-bold opacity-70 mt-7.5`}
          >
            Keep your own art
          </Text>
          <View style={tw`flex items-center mt-4.5 w-[90%]`}>
            <Text style={tw`text-4 w-full mb-2 mt-5 font-bold`}>Username</Text>
            <TextInput
              placeholder="Username"
              style={tw`border border-[#9ca3af] bg-white p-3 opacity-90 w-full rounded-2.5 text-4`}
            />
            <Text style={tw`text-4 w-full mb-2 mt-5 font-bold`}>Email</Text>
            <TextInput
              placeholder="Email"
              style={tw`border border-[#9ca3af] bg-white p-3 opacity-90 w-full rounded-2.5 text-4`}
            />
            <Text style={tw`text-4 w-full mb-2 mt-5 font-bold`}>Password</Text>
            <TextInput
              placeholder="Password"
              style={tw`border border-[#9ca3af] bg-white p-3 opacity-90 w-full rounded-2.5 text-4`}
            />
          </View>
        </View>

        {/* Buttons */}
        <View style={tw`flex items-center mb-[20%] w-full px-[1%]`}>
          <TouchableOpacity
            style={tw`flex justify-center items-center bg-black rounded-1.75 opacity-90 h-13 w-[90%] mb-15`}
            onPress={() => {
              setShowPages(1); // navigation vers REGISTER
            }}
          >
            <Text style={tw`text-4 text-white font-semibold`}>Validate</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={tw`flex justify-center items-center bg-[#2C6DB4] rounded-1.75 opacity-90 h-13 w-[90%]`}
            onPress={() => {
              setShowPages(2); // navigation vers la page de connexion
            }}
          >
            <Text style={tw`text-4 text-white font-semibold`}>
              Register with Google
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  if (showPages === 2) {
    welcomeBlock = (
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
            }}
          >
            <Text style={styles.textbutton}> Validate</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.bluebutton}
            onPress={() => {
              setShowPages(0); // OUVRE API LOGIN GOOGLE
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
      style={tw`flex-1`}
      source={require("../assets/background.jpg")}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        style={tw`flex items-center h-full w-full`}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Image
          style={tw`h-27.125 w-35 mt-16.25`}
          source={require("../assets/logoystra.png")}
        />
        {welcomeBlock}
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
    flex: "column",
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
