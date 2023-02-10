import { TouchableOpacity } from "react-native";
export default function ReturnButton() {
  return (
    <TouchableOpacity
      style={tw`flex justify-center items-center bg-[#2C6DB4] rounded-1.75 opacity-90 h-13 w-[90%]`}
      onPress={() => {
        handleReturn();
      }}
    >
      <Text style={tw`text-4 text-white font-semibold`}>PLACEHOLDER</Text>
    </TouchableOpacity>
  );
}
