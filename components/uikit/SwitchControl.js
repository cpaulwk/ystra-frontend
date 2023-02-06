import React from "react";
import { View, Text, Switch } from "react-native";
import tw from "twrnc";

export default function SwitchControl(props) {
  const { handleSwitchParent, currentValue, title } = props;
  const handleSwitch = () => {
    handleSwitchParent(!currentValue);
  };

  return (
    <View style={tw`flex-row justify-end items-center w-full px-5 mt-5`}>
      <Text style={tw`mr-2 font-bold`}>{title}</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#76CA66" }}
        thumbColor={currentValue ? "#f4f3f4" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={() => {
          handleSwitch();
        }}
        value={currentValue}
      />
    </View>
  );
}
