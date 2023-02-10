import { View, TextInput } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import tw from "twrnc";

export default function InputFieldWithIcon(props) {
  return (
    <View style={tw`flex-row items-center mt-5 mb-2`}>
      <TextInput
        placeholder={props.placeholder}
        value={props.value}
        // ********
        onChangeText={(value) => {
          props.onChangeText(value, props.placeholder);
        }}
        // ********
        style={tw`border border-[#9ca3af] bg-white p-3 pl-13 opacity-90 w-full rounded-2.5 text-4`}
        autoCapitalize="none"
        secureTextEntry={props.secureTextEntry}
      />
      <View
        style={tw`absolute border-r border-[#AFAFAF] flex justify-center items-center rounded-l-2.5 h-full aspect-square pl-1`}
      >
        <FontAwesome name={props.iconName} size={20} />
      </View>
    </View>
  );
}
