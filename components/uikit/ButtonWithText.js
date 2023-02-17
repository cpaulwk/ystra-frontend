import { Text, TouchableOpacity } from "react-native";
import tw from "twrnc";

export default function ButtonWithText(props) {
  // console.log("props =>", props);
  const buttonSize = {
    fontSize: "",
    fontWeight: "",
    height: "",
    opacity: "",
    width: "",
  };

  let { height, width, fontSize, fontWeight, opacity } = buttonSize;
  switch (props.size) {
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
      style={tw`flex justify-center items-center bg-${props.color} rounded-1.75 ${opacity} h-${height} w-${width} ${props.margin}`}
      onPress={props.onPress}
      disabled={props.disabled}
    >
      <Text style={tw`text-${fontSize} text-white font-${fontWeight}`}>
        {props.text}
      </Text>
    </TouchableOpacity>
  );
}
