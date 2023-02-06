import { Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";

export default function WelcomeBlock({ handleSelectedPage, handleCanReturn }) {
  const handleGoToRegister = () => {
    handleSelectedPage("Register");
    handleCanReturn(true);
  };
  const handleGoToLogin = () => {
    handleSelectedPage("Login");
    handleCanReturn(true);
  };

  return (
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
            handleGoToRegister();
          }}
        >
          <Text style={tw`text-4 text-white font-semibold`}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`flex justify-center items-center bg-[#2C6DB4] rounded-1.75 opacity-90 h-13 w-[90%]`}
          onPress={() => {
            handleGoToLogin();
          }}
        >
          <Text style={tw`text-4 text-white font-semibold`}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

        <TouchableOpacity
          style={tw`flex justify-center items-center bg-[#2C6DB4] rounded-1.75 opacity-90 h-13 w-[90%]`}
          onPress={() => {
            handleGoToLogin();
          }}
        >
          <Text style={tw`text-4 text-white font-semibold`}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}