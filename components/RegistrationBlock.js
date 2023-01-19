import { Text, TextInput, TouchableOpacity, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useState } from "react";
import tw from "twrnc";
import { BACKEND_URL } from "@env";

export default function RegistrationBlock({
  handleSelectedPage,
  handleCanReturn,
}) {
  const [disableButton, setDisableButton] = useState(false);
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isBadUserInput, setIsBadUserInput] = useState(false);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const passwordRegex =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{10,}$/;

  const handleReturn = () => {
    handleSelectedPage("Welcome");
    handleCanReturn(true);
  };

  const handleChangePwd = (value) => {
    console.log(value);
    setPassword(value);
    if (!passwordRegex.test(password)) {
      setIsBadUserInput(true);
      setErrorMessage(
        "Password must include:\n     • at least 10 characters\n     • 1 uppercase letter\n     • 1 number\n     • 1 special character"
      );
    } else {
      setIsBadUserInput(false);
      setErrorMessage("");
    }
  };

  const handleRegister = () => {
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!emailRegex.test(email)) {
      setErrorMessage("Invalid email address");
      setIsBadUserInput(true);
      return;
    }

    if (!passwordRegex.test(password)) {
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
          handleSelectedPage("Confirmation");

          handleCanReturn(false);
          setCanReturn(false);
          handleUpdate(3);
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

  return (
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
            handleReturn();
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
