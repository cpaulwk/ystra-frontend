import { View } from "react-native";
import tw from "twrnc";

export default function ImageFrame({ selectedFrame }) {
  return (
    <View style={selectedFrame === "none" ? tw`hidden` : tw`absolute z-100`}>
      <View
        style={
          (selectedFrame === "dark" && tw`h-78 w-78 border-[2]`) ||
          (selectedFrame === "light" &&
            tw`h-78 w-78 border-[2] border-[#f9e8d5]`)
        }
      ></View>
    </View>
  );
}
