import { Keyboard, Text, TouchableWithoutFeedback, View } from "react-native";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../reducers/user";
import tw from "twrnc";
import { BACKEND_URL } from "@env";
import InputFieldWithIcon from "./uikit/InputFieldWithIcon";
import ButtonWithText from "./uikit/ButtonWithText";
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
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isBadUserInput, setIsBadUserInput] = useState(false);
  const [form, setForm] = useState({});

  const handleRegister = () => {
    setIsLoading(true);
    const { result } = EmailValidation(form["Email"]);
    if (!result) {
      setErrorMessage("Invalid email address");
      setIsBadUserInput(!result);
      setIsLoading(false);
      return;
    }

    const { result: resultpwd } = PasswordValidation(form["Password"]);
    if (!resultpwd) {
      setErrorMessage("Invalid password");
      setIsBadUserInput(true);
      setIsLoading(false);
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
        console.log("data of registration => ", data);
        if (data.result) {
          dispatch(login({ email: form["Email"], token: data.token }));
          handleSelectedPage("Confirmation");

          handleCanReturn(false);
          setCanReturn(false);
          handleUpdate(3);
          setDisableButton(true);
          setIsLoading(false);
        } else {
          dispatch(login({ email: form["Email"], token: data.token }));
          //message d'erreur
          setErrorMessage(data.error);
          setIsBadUserInput(true);
          setIsLoading(false);
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
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
                name={e.name}
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
          <ButtonWithText
            size="small"
            color="black"
            disabled={disableButton}
            isLoading={isLoading}
            margin="mb-15"
            onPress={handleRegister}
            text="Sign up"
          />
          <ButtonWithText
            size="small"
            color="[#2C6DB4]"
            disabled={disableButton}
            text="Sign up with Google"
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
