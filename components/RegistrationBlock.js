import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useState } from "react";
import tw from "twrnc";
import { BACKEND_URL } from "@env";
import InputFieldWithIcon from "./uikit/InputFieldWithIcon";
import {
  PasswordValidation,
  EmailValidation,
} from "../modules/InputValidation";

export default function RegistrationBlock({
  handleSelectedPage,
  handleCanReturn,
}) {
  const dispatch = useDispatch();
  const [disableButton, setDisableButton] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isBadUserInput, setIsBadUserInput] = useState(false);
  const [form, setForm] = useState({});

  const handleReturn = () => {
    handleSelectedPage("Welcome");
    handleCanReturn(true);
  };

  const handleRegister = () => {
    const { result } = EmailValidation(form["Email"]);
    console.log("result =>", result);
    if (!result) {
      setErrorMessage("Invalid email address");
      setIsBadUserInput(!result);
      return;
    }

    const { result: resultpwd } = PasswordValidation(form["Password"]);
    console.log("resultpwd =>", resultpwd);
    if (!resultpwd) {
      setErrorMessage("Invalid password");
      setIsBadUserInput(true);
      return;
    }

    fetch(`${BACKEND_URL}/users/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: form.Email,
        password: form.Password,
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
          dispatch(login({ email: form["Email"], token: data.token }));
        } else {
          dispatch(login({ email: form["Email"], token: data.token }));
          //message d'erreur
          setErrorMessage(data.error);
          setIsBadUserInput(true);
        }
      })
      .catch((error) => {
        // gérer les erreurs
      });
  };

  // WIP
  const handleForm = (val, name) => {
    setForm({ ...form, [name]: val });

    if (name === "Password") {
      const { result, errorMessage } = PasswordValidation(val);
      setErrorMessage(errorMessage);
      setIsBadUserInput(!result);
    }
    console.log("form =>", form);
  };

  const inputFields = [
    {
      name: "Email",
      iconName: "envelope-o",
      secureText: false,
    },
    {
      name: "Password",
      iconName: "lock",
      secureText: true,
    },
  ];

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
          {/* WIP */}
          {inputFields.map((e) => (
            <InputFieldWithIcon
              key={e.name}
              secureTextEntry={e.secureText}
              placeholder={e.name}
              value={form[e.name]}
              onChangeText={handleForm}
              iconName={e.iconName}
            />
          ))}
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
