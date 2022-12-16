import { View, Text } from "react-native";

import { useSelector } from "react-redux";
import tw from "twrnc";

export default function Gallery({ navigation }) {
  const user = useSelector((state) => state.user.value);

  return (
    <View style={tw`flex-1 justify-center items-center`}>
      <Text>Gallery</Text>
      <Text>Username: {user.userName}</Text>
      <Text>Token: {user.token}</Text>
    </View>
  );
}

