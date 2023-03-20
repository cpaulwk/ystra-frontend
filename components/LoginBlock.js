import { Keyboard, Text, TouchableWithoutFeedback, View } from "react-native";
import { useState } from "react";
import tw from "twrnc";
import { BACKEND_URL } from "@env";
import { useDispatch } from "react-redux";
import { login } from "../reducers/user";
import useForm from "../hooks/useForm";
import InputFieldWithIcon from "./uikit/InputFieldWithIcon";
import ButtonWithText from "./uikit/ButtonWithText";

export default function LoginBlock({
  navigation,
  handleCanReturn,
  handleSelectedPage,
}) {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const [isBadUserInput, setIsBadUserInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { form, handleForm } = useForm();

  const handleLogin = () => {
    // Ajouter une fonction checkBody (pour vérifier s'il y a bien une valeur)
    setIsLoading(true);

    if (!form["Email"] || !form["Password"]) {
      setIsLoading(false);
      return;
    }

    fetch(`${BACKEND_URL}/users/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: form["Email"],
        password: form["Password"],
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data =>", data);
        if (data.result) {
          dispatch(login({ email: form["Email"], token: data.token }));
          navigation.navigate("TabNavigator", { screen: "Home" });
          handleSelectedPage("Welcome");
          handleCanReturn(false);
          setIsLoading(false);
        } else {
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

  const inputFields = [
    {
      name: "Email",
      placeholder: "Email",
      iconName: "envelope-o",
      secureText: false,
    },
    {
      name: "Password",
      placeholder: "Password",
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
            {inputFields.map((e) => (
              <InputFieldWithIcon
                key={e.name}
                name={e.name}
                secureTextEntry={e.secureText}
                placeholder={e.placeholder}
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
        <View style={tw`flex justify-end items-center mb-[20%] w-full px-[1%]`}>
          <ButtonWithText
            size="small"
            color="black"
            margin="mb-15"
            onPress={handleLogin}
            text="Sign in"
            isLoading={isLoading}
          />

          <ButtonWithText
            size="small"
            color="[#2C6DB4]"
            text="Sign in with Google"
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
