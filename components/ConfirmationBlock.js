import { Text, TextInput, TouchableOpacity, View } from "react-native";
import tw from "twrnc";

export default function ConfirmationBlock({ handleSelectedPage, navigation }) {
  const handleConfirmation = () => {
    navigation.navigate("TabNavigator", { screen: "Home" });
    handleSelectedPage("Welcome");
  };

  return (
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