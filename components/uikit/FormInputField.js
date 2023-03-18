import { TextInput } from "react-native";
import tw from "twrnc";

export default function FormInputField(props) {
  return (
    <TextInput
      key={props.name}
      placeholder={props.placeholder}
      name={props.name}
      style={tw`border border-[#9ca3af] bg-white p-3 pl-5 opacity-90 w-${props.width} rounded-2.5 text-4`}
      onChangeText={(e) => props.onChangeText(props.name, e)}
      // {...bind}
    />
  );
}
