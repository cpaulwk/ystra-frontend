import AsyncStorage from "@react-native-async-storage/async-storage";
import { TextInput } from "react-native";
import tw from "twrnc";

export default function FormInputField({
  placeholder,
  name,
  width,
  onChangeText,
  value,
}) {
  return (
    <TextInput
      placeholder={placeholder}
      name={name}
      style={tw`border border-[#9ca3af] bg-white p-3 pl-5 opacity-90 w-${width} rounded-2.5 text-4`}
      onChangeText={(value) => onChangeText(name, value)}
      value={value}
      // {...bind}
    />
  );
}
