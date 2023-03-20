import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import tw from "twrnc";

export default function ButtonWithText({
  color,
  disabled,
  size,
  margin,
  onPress,
  isLoading,
  text,
}) {
  let backgroundColor = color;

  if (disabled) {
    backgroundColor = "[#AFAFAF]";
  }

  const buttonSize = {
    fontSize: "",
    fontWeight: "",
    height: "",
    opacity: "",
    width: "",
  };

  let { height, width, fontSize, fontWeight, opacity } = buttonSize;
  switch (size) {
    case "small":
      fontSize = "4";
      fontWeight = "semibold";
      height = "13";
      opacity = "opacity-90";
      width = "[90%]";
      break;
    default:
      fontSize = "2xl";
      fontWeight = "medium";
      height = "15";
      opacity = "";
      width = "full";
  }

  return (
    <TouchableOpacity
      style={tw`flex justify-center items-center bg-${backgroundColor} rounded-1.75 ${opacity} h-${height} w-${width} ${margin}`}
      onPress={onPress}
      disabled={disabled}
    >
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <Text style={tw`text-${fontSize} text-white font-${fontWeight}`}>
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
}
