import { Text, TextInput, TouchableOpacity, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useState } from "react";
import tw from "twrnc";
import { BACKEND_URL } from "@env";
import { useDispatch } from "react-redux";
import { login } from "../reducers/user";

export default function LoginBlock({
  navigation,
  handleCanReturn,
  handleSelectedPage,
}) {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const [isBadUserInput, setIsBadUserInput] = useState(false);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

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
          navigation.navigate("TabNavigator", { screen: "Home" });
          handleSelectedPage("Welcome");
          handleCanReturn(false);
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
            handleCanReturn(true);
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

        <TouchableOpacity
          style={tw`flex justify-center items-center bg-[#2C6DB4] rounded-1.75 opacity-90 h-13 w-[90%]`}
          onPress={() => {
            handleCanReturn(true);
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