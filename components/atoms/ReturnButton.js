import { TouchableOpacity } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import tw from "twrnc";
export default function ReturnButton({ withoutHeader, onPress }) {
  let top = "0";
  let left = "[0%]";
  let absolute = "";

  if (withoutHeader) {
    // console.log("Reached this line");
    top = "15";
    left = "[5%]";
    absolute = "absolute";
  }

  return (
    <TouchableOpacity
      // style={tw`absolute flex justify-center items-center z-100 top-10 bottom-10 bg-[#AFAFAF] h-15 w-15 rounded-6 left-[5%] top-${top} opacity-50`}
      style={tw`${absolute} flex justify-center items-center z-100 bg-[#AFAFAF] top-${top} left-${left} h-15 w-15 rounded-6 opacity-50 m-1`}
      onPress={onPress}
    >
      <FontAwesome name="chevron-left" size={20} />
    </TouchableOpacity>
  );
}
