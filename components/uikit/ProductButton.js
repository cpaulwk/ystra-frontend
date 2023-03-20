import { Text, TouchableOpacity } from "react-native";
import tw from "twrnc";

export default function ProductButton({
  item,
  selectedOptButton,
  selectedSize,
  selectedFrame,
  selectedFinish,
  setselectedSize,
  setselectedFrame,
  setselectedFinish,
}) {
  return (
    <TouchableOpacity
      style={[
        selectedOptButton === "size"
          ? tw`flex border-[1.5px] justify-center items-center rounded-1.75 h-12 aspect-square border-[#161E44]`
          : tw`flex border-[1.5px] justify-center items-center rounded-1.75 h-12 w-[20%] border-[#161E44]`,
        (selectedOptButton === "size" && selectedSize === item) ||
        (selectedOptButton === "frame" && selectedFrame === item) ||
        (selectedOptButton === "finish" && selectedFinish === item)
          ? tw`bg-[#161E44]`
          : tw`bg-[#FFFFFF]`,
      ]}
      onPress={() => {
        switch (selectedOptButton) {
          case "size":
            setselectedSize(item);
            break;
          case "frame":
            setselectedFrame(item);
            break;
          case "finish":
            setselectedFinish(item);
            break;
        }
      }}
    >
      <Text
        style={[
          selectedOptButton === "size"
            ? tw`font-black text-3xl`
            : tw`font-black`,
          (selectedOptButton === "size" && selectedSize === item) ||
          (selectedOptButton === "frame" && selectedFrame === item) ||
          (selectedOptButton === "finish" && selectedFinish === item)
            ? tw`text-[#FFFFFF]`
            : tw`text-[#161E44]`,
        ]}
      >
        {`${item.charAt(0).toUpperCase() + item.slice(1)}`}
      </Text>
    </TouchableOpacity>
  );
}
