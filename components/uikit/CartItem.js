import { Image, Text, TouchableOpacity, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import tw from "twrnc";

export default function CartItem(props) {
  return (
    <View
      // key={props.index}
      style={tw`flex items-center w-full border-t border-[#AFAFAF]`}
    >
      <View style={tw`flex-row justify-between items-center py-5 w-[90%]`}>
        <View style={tw`flex-row grow items-center`}>
          <Image style={tw`h-25 w-25 mr-5`} source={{ uri: props.url }} />
          <View style={tw`w-[35%]`}>
            <View style={tw`flex-row items-center w-full`}>
              <Text style={tw`text-4 font-bold opacity-70 w-[50%]`}>
                Size :
              </Text>
              <Text style={tw`text-4 font-medium opacity-70 w-[50%]`}>
                {props.product.size.name}
              </Text>
            </View>
            <View style={tw`flex-row items-center w-full`}>
              <Text style={tw`text-4 font-bold opacity-70 w-[50%]`}>
                Frame :
              </Text>
              <Text style={tw`text-4 font-medium opacity-70 w-[50%]`}>
                {props.product.frame.name}
              </Text>
            </View>
            <View style={tw`flex-row items-center w-full`}>
              <Text style={tw`text-4 font-bold opacity-70 w-[50%]`}>
                Finish :
              </Text>
              <Text style={tw`text-4 font-medium opacity-70 w-[50%]`}>
                {props.product.finish.name}
              </Text>
            </View>
            <View style={tw`flex-row items-center w-full`}>
              <Text style={tw`text-4 font-bold opacity-70 w-[50%]`}>
                Total :
              </Text>
              <Text style={tw`text-4 font-medium opacity-70 w-[50%]`}>
                {props.price}€
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={tw` flex justify-center items-center bg-red-700 rounded-4 h-[7.5] w-[7.5] border-[#161E44] mx-0	  `}
          onPress={() => props.onPress(props.index)}
        >
          <FontAwesome
            style={tw`pl-0.5`}
            name="times"
            size={20}
            color="white"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
