import { TouchableOpacity } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import tw from "twrnc";
export default function ReturnButton(props) {
  let top = "";
  props.withHeader ? (top = "[7%]") : (top = "[8%]");
  return (
    <TouchableOpacity
      style={tw`absolute flex justify-center items-center z-100 top-10 bottom-10 bg-[#AFAFAF] h-15 w-15 rounded-6 left-[5%] top-${top} opacity-50`}
      onPress={props.onPress}
    >
      <FontAwesome name="chevron-left" size={20} />
    </TouchableOpacity>
  );
}
