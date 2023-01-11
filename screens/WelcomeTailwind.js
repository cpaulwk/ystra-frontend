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
import ChevronLeftIcon from "react-native-bootstrap-icons/icons/chevron-left";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { BACKEND_URL } from "@env";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../reducers/user";

export default function Welcome({ navigation }) {
  const dispatch = useDispatch();
  const [showPages, setShowPages] = useState(0);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [canReturn, setCanReturn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isBadUserInput, setIsBadUserInput] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{10,}$/;
  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    console.log(user.token)
    user.token && navigation.navigate("TabNavigator", { screen: "Home" });
    },[]);

  const handleReturn = () => {
    setCanReturn(false);
    setShowPages(0);
    setIsBadUserInput(false);
  };

  const handleChangePwd = (value) => {

    setPassword(value);
    if(!passwordRegex.test(password)) {
      setIsBadUserInput(true);
      setErrorMessage("Password must include:\n     • at least 10 characters\n     • 1 uppercase letter\n     • 1 number\n     • 1 special character");
    } else {
      setIsBadUserInput(false);
      setErrorMessage("");
    }

  }

  const handleRegister = () => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(!emailRegex.test(email)){
      setErrorMessage("Invalid email address");
      setIsBadUserInput(true);
      return;
    }

    if(!passwordRegex.test(password)){
      setErrorMessage("Invalid password");
      setIsBadUserInput(true);
      return;
    }

    fetch(`${BACKEND_URL}/users/signup`, {
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
        if (data.result) {
          setCanReturn(false);
          setShowPages(3);
          setDisableButton(true);
          dispatch(login({ userName: username, token: data.token }));
        } else {
          dispatch(login({ userName: username, token: data.token }));
          //message d'erreur
          setErrorMessage(data.error);
          setIsBadUserInput(true);
        }
      })
      .catch((error) => {
        // gérer les erreurs
      });
  };

  const handleConfirmation = () => {
    dispatch(login({ userName: username, token: data.token }));
    navigation.navigate("TabNavigator", { screen: "Home" });
  };

  const handleLogin = () => {
    fetch(`${BACKEND_URL}/users/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data =>", data);
        if (data.result) {
          dispatch(login({ userName: username, token: data.token }));
          setCanReturn(false);
          navigation.navigate("TabNavigator", { screen: "Home" });
          setUsername("");
          setEmail("");
          setPassword("");
        } else {
          //message d'erreur
          setErrorMessage(data.error);
          setIsBadUserInput(true);
        }
      })
      .catch((error) => {
        // gérer les erreurs
      });
  };

  let welcomeBlock = (
    <View style={tw`flex-1 justify-between items-center w-full h-full`}>
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
            setCanReturn(true);
            setShowPages(1); // navigation vers REGISTER
          }}
        >
          <Text style={tw`text-4 text-white font-semibold`}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`flex justify-center items-center bg-[#2C6DB4] rounded-1.75 opacity-90 h-13 w-[90%]`}
          onPress={() => {
            setCanReturn(true);
            setShowPages(2); // navigation vers LOGIN
          }}
        >
          <Text style={tw`text-4 text-white font-semibold`}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // WIP
  if (showPages === 1) {
    welcomeBlock = (
      <View style={tw`flex-1 justify-between items-center w-full h-full`}>
        {/* Text and Fields */}
        <View style={tw`flex items-center w-full px-[1%]`}>
          <Text
            style={tw`flex flex-row items-center text-10 font-bold opacity-70 mt-7.5`}
          >
            Keep your own art
          </Text>
          <View style={tw`flex items-center mt-4.5 w-[90%]`}>
            <View style={tw`flex-row items-center mt-5 mb-2`}>
              <TextInput
                placeholder="Username"
                value={username}
                onChangeText={(value) => setUsername(value)}
                style={tw`border border-[#9ca3af] bg-white p-3 pl-13 opacity-90 w-full rounded-2.5 text-4`}
              />
              <View
                style={tw`absolute border-r border-[#AFAFAF] flex justify-center items-center rounded-l-2.5 h-full aspect-square pl-1`}
              >
                <FontAwesome name="user" size={20} />
              </View>
            </View>
            <View style={tw`flex-row items-center mt-5 mb-2`}>
              <TextInput
                placeholder="Email"
                value={email}
                onChangeText={(value) => setEmail(value)}
                style={tw`border border-[#9ca3af] bg-white p-3 pl-13 opacity-90 w-full rounded-2.5 text-4`}
                autoCapitalize="none"
              />
              <View
                style={tw`absolute border-r border-[#AFAFAF] flex justify-center items-center rounded-l-2.5 h-full aspect-square pl-1`}
              >
                <FontAwesome name="envelope-o" size={20} />
              </View>
            </View>
            <View style={tw`flex-row items-center mt-5 mb-2`}>
              <TextInput
                secureTextEntry={true}
                placeholder="Password"
                value={password}
                onChangeText={(value) => handleChangePwd(value)}
                style={tw`border border-[#9ca3af] bg-white p-3 pl-13 opacity-90 w-full rounded-2.5 text-4`}
              />
              <View
                style={tw`absolute border-r border-[#AFAFAF] flex justify-center items-center rounded-l-2.5 h-full aspect-square pl-1`}
              >
                <FontAwesome name="lock" size={20} />
              </View>
            </View>
            {isBadUserInput && (
              <View style={tw`flex w-full bg-white/80 rounded-2.5 p-2.5`}>
                <Text style={tw`text-4 text-[#BA0000]`}>{errorMessage}</Text>
            </View>
              )}
          </View>
        </View>

        {/* Buttons */}
        <View style={tw`flex items-center mb-[20%] w-full px-[1%]`}>
          <TouchableOpacity
            style={tw`flex justify-center items-center bg-black rounded-1.75 opacity-90 h-13 w-[90%] mb-15`}
            onPress={() => handleRegister()}
            disabled={disableButton}
          >
            <Text style={tw`text-4 text-white font-semibold`}>Sign up</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={tw`flex justify-center items-center bg-[#2C6DB4] rounded-1.75 opacity-90 h-13 w-[90%]`}
            onPress={() => {
              setCanReturn(true);
              setShowPages(1); // navigation vers la page de connexion
            }}
          >
            <Text style={tw`text-4 text-white font-semibold`}>
              Sign up with Google
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (showPages === 2) {
    welcomeBlock = (
      // LOGIN BLOCK
      <View style={tw`flex-1 justify-between items-center w-full h-full`}>
        {/* Text and Fields */}
        <View style={tw`flex items-center w-full px-[1%]`}>
          <Text
            style={tw`flex flex-row items-center text-10 font-bold opacity-70 mt-7.5`}
          >
            Keep your own art
          </Text>
          <View style={tw`flex items-center mt-4.5 w-[90%]`}>
            <View style={tw`flex-row items-center mt-5 mb-2`}>
              <TextInput
                placeholder="Username"
                value={username}
                onChangeText={(value) => setUsername(value)}
                style={tw`border border-[#9ca3af] bg-white p-3 pl-13 opacity-90 w-full rounded-2.5 text-4`}
              />
              <View
                style={tw`absolute border-r border-[#AFAFAF] flex justify-center items-center rounded-l-2.5 h-full aspect-square pl-1`}
              >
                <FontAwesome name="user" size={20} />
              </View>
            </View>
            <View style={tw`flex-row items-center mt-5 mb-2`}>
              <TextInput
                secureTextEntry={true}
                placeholder="Password"
                value={password}
                onChangeText={(value) => setPassword(value)}
                style={tw`border border-[#9ca3af] bg-white p-3 pl-13 opacity-90 w-full rounded-2.5 text-4`}
              />
              <View
                style={tw`absolute border-r border-[#AFAFAF] flex justify-center items-center rounded-l-2.5 h-full aspect-square pl-1`}
              >
                <FontAwesome name="lock" size={20} />
              </View>
            </View>
            <View style={tw`flex-row items-center w-full h-7`}>
              {isBadUserInput && (
                <Text style={tw`text-4 text-[#BA0000]`}>{errorMessage}</Text>
              )}
            </View>
          </View>
        </View>

        {/* Buttons */}
        <View style={tw`flex items-center mb-[20%] w-full px-[1%]`}>
          <TouchableOpacity
            style={tw`flex justify-center items-center bg-black rounded-1.75 opacity-90 h-13 w-[90%] mb-15`}
            onPress={() => handleLogin()}
          >
            <Text style={tw`text-4 text-white font-semibold`}>Sign in</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={tw`flex justify-center items-center bg-[#2C6DB4] rounded-1.75 opacity-90 h-13 w-[90%]`}
            onPress={() => {
              setCanReturn(true);
              setShowPages(2); // navigation vers la page de connexion
            }}
          >
            <Text style={tw`text-4 text-white font-semibold`}>
              Sign in with Google
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (showPages === 3) {
    welcomeBlock = (
      // EMAIL CONFIRMATION BLOCK
      <View style={tw`flex-1 justify-between items-center w-full`}>
        {/* Text and Fields */}
        <View style={tw`flex items-center w-full px-[1%] mt-[20%]`}>
          <Text style={tw`text-10 font-bold opacity-70 mb-[18%]`}>
            Confirm your email from your inbox
          </Text>
          <Text
            style={tw`text-4 text-[#161E44] w-full font-bold w-[90%] opacity-70 pl-[1%]`}
          >
            Resend confirmation
          </Text>
        </View>
        <View style={tw`flex items-center mb-[20%] w-full px-[1%]`}>
          <TouchableOpacity
            style={tw`flex justify-center items-center bg-[#2C6DB4] rounded-1.75 opacity-90 h-13 w-[90%]`}
            onPress={() => {
              handleConfirmation();
            }}
          >
            <Text style={tw`text-4 text-white font-semibold`}>
              Proceed to Ystra
            </Text>
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
      {canReturn && (
        <TouchableOpacity
          style={tw`absolute flex justify-center items-center z-100 top-10 bottom-10 bg-[#AFAFAF] h-15 w-15 rounded-6 left-[5%] top-[8%] opacity-50`}
          onPress={() => handleReturn()}
        >
          <FontAwesome name="chevron-left" size={20} />
        </TouchableOpacity>
      )}
      <View style={tw`flex items-center h-full w-full`}>
        <Image
          style={tw`h-27.125 w-35 mt-16.25`}
          source={require("../assets/logoystra.png")}
        />
        {welcomeBlock}
      </View>
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
