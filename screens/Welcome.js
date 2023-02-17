import { View, ImageBackground, Image } from "react-native";
import tw from "twrnc";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import ConfirmationBlock from "../components/ConfirmationBlock";
import LoginBlock from "../components/LoginBlock";
import RegistrationBlock from "../components/RegistrationBlock";
import WelcomeBlock from "../components/WelcomeBlock";
import ReturnButton from "../components/uikit/ReturnButton";

export default function Welcome({ navigation }) {
  const [canReturn, setCanReturn] = useState(false);
  const [isBadUserInput, setIsBadUserInput] = useState(false);
  const [selectedPage, setSelectedPage] = useState("Welcome");
  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    console.log(user.token);
    user.token && navigation.navigate("TabNavigator", { screen: "Home" });
  }, []);

  const handleReturn = () => {
    setCanReturn(false);
    setSelectedPage("Welcome");
    setIsBadUserInput(false);
  };

  const handleSelectedPage = (newSelectedPage) => {
    setSelectedPage(newSelectedPage);
  };

  const handleCanReturn = (newCanReturn) => {
    setCanReturn(newCanReturn);
  };

  const renderedBlock = (
    <>
      {selectedPage === "Welcome" && (
        <WelcomeBlock
          handleSelectedPage={handleSelectedPage}
          handleCanReturn={handleCanReturn}
        />
      )}
      {selectedPage === "Register" && (
        <RegistrationBlock
          handleSelectedPage={handleSelectedPage}
          handleCanReturn={handleCanReturn}
        />
      )}
      {selectedPage === "Login" && (
        <LoginBlock
          handleCanReturn={handleCanReturn}
          handleSelectedPage={handleSelectedPage}
          navigation={navigation}
        />
      )}
      {selectedPage === "Confirmation" && (
        <ConfirmationBlock
          handleSelectedPage={handleSelectedPage}
          navigation={navigation}
        />
      )}
    </>
  );

  return (
    <ImageBackground
      style={tw`flex-1`}
      source={require("../assets/background.jpg")}
      resizeMode="cover"
    >
      {canReturn && (
        <ReturnButton withoutHeader={true} onPress={handleReturn} />
      )}
      <View style={tw`flex items-center h-full w-full`}>
        <Image
          style={tw`h-27.125 w-35 mt-16.25`}
          source={require("../assets/logoystra.png")}
        />
        {renderedBlock}
      </View>
    </ImageBackground>
  );
}
