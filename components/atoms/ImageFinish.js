import { Image, View } from "react-native";
import tw from "twrnc";

export default function ImageFinish({ selectedFinish }) {
  return (
    <View
      style={selectedFinish === "none" ? tw`hidden` : tw`absolute opacity-20`}
    >
      <Image
        style={tw`h-75 w-75`}
        source={
          (selectedFinish === "gloss" &&
            require("../../assets/glossfinish.png")) ||
          (selectedFinish === "matte" &&
            require("../../assets/mattefinish.jpg"))
        }
      />
    </View>
  );
}
