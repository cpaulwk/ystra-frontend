import { Text, TouchableOpacity } from "react-native";
import tw from "twrnc";

export default function CustomizationButton({
  item,
  selectedOptButton,
  setSelectedOptButton,
}) {
  return (
    <TouchableOpacity
      style={[
        tw`flex-1 justify-center items-center rounded-r`,
        selectedOptButton === item
          ? tw`bg-[#161E44] w-full h-full border border-[#161E44]`
          : tw`w-full h-full`,
      ]}
      onPress={() => setSelectedOptButton(item)}
    >
      <Text
        style={[
          tw`text-2xl font-medium`,
          selectedOptButton === item ? tw`text-[#FFFFFF]` : tw`text-[#161E44]`,
        ]}
      >
        {item.charAt(0).toUpperCase() + item.slice(1)}
      </Text>
    </TouchableOpacity>
  );
}
