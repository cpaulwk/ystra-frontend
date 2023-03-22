import { TouchableOpacity } from "react-native";
import tw from "twrnc";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function ButtonIcon({
  isCartItem,
  onPress,
  name,
  size,
  style,
  likedColor,
  color,
}) {
  return (
    <TouchableOpacity
      style={
        isCartItem
          ? tw`flex justify-center items-center w-8 h-8`
          : tw`border flex justify-center items-center bg-white opacity-70 rounded-50 w-8 h-8`
      }
      onPress={() => onPress()}
    >
      <FontAwesome
        name={name}
        size={size}
        style={style}
        color={likedColor || color}
      />
    </TouchableOpacity>
  );
}
