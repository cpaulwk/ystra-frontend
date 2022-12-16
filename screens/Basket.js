import { View, Text, Image, Button, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import tw from "twrnc";
// import {} from "@material-tailwind/react";

export default function Basket({ navigation }) {
  const user = useSelector((state) => state.user.value);
  return (
    <View style={tw`flex-1 border-2 border-orange-800 w-full h-full`}>
      <Image source={require("../assets/img-Ng8OjQ4XBHSSd2KXIdvKgOJD.png")} />
      <View
        style={tw` justify-center flex-row border-2 border-orange-800 w-full`}>
        <TouchableOpacity
          style={tw`flex  border-2 border-orange-800 items-center bg-[#161E44] rounded-1.75  h-12 w-[30%] mb-15`}>
          <Text style={{ color: "#fff" }}>Bouton 1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`flex border-2 border-orange-800 items-center bg-[#161E44] rounded-1.75  h-12 w-[30%] mb-15`}>
          <Text style={{ color: "#fff" }}>Bouton 2</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`flex border-2 border-orange-800 items-center bg-[#161E44] rounded-1.75  h-12 w-[30%] mb-15`}>
          <Text style={{ color: "#fff" }}>Bouton 3</Text>
        </TouchableOpacity>
      </View>
      <View
        style={tw` justify-center flex-row border-2 border-orange-800 w-full`}>
        <TouchableOpacity
          style={tw`flex  border-2 border-orange-800 items-center bg-[#161E44] rounded-1.75  h-12 w-[30%] mb-15`}>
          <Text style={{ color: "#fff" }}>Bouton 1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`flex border-2 border-orange-800 items-center bg-[#161E44] rounded-1.75  h-12 w-[30%] mb-15`}>
          <Text style={{ color: "#fff" }}>Bouton 2</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`flex border-2 border-orange-800 items-center bg-[#161E44] rounded-1.75  h-12 w-[30%] mb-15`}>
          <Text style={{ color: "#fff" }}>Bouton 3</Text>
        </TouchableOpacity>
      </View>

      <View
        style={tw`flex-1 justify-center items-center w-full bg-[#F2EFEA]`}></View>
      <Text>Basket seydou</Text>
      <Text>{/* {user.userName} {user.token} */}</Text>
    </View>
  );
}
