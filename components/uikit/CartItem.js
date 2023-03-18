import { Image, Text, TouchableOpacity, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import ButtonIcon from "./ButtonIcon";
import tw from "twrnc";

export default function CartItem(props) {
  return (
    <View
      // key={props.index}
      style={tw`flex items-center w-full h-35 border-t border-[#AFAFAF]`}
    >
      <View style={tw`flex-row justify-between items-center p-3 w-full h-full`}>
        <View style={tw`flex-row items-center`}>
          <Image
            style={tw`h-30 aspect-square mr-5`}
            source={{ uri: props.url }}
          />
          <View style={tw`flex justify-between`}>
            <View style={tw`flex`}>
              <View style={tw`flex-row items-center`}>
                <Text style={tw`text-4 font-bold opacity-70 w-[40%]`}>
                  Size :
                </Text>
                <Text style={tw`text-4 font-medium opacity-70`}>
                  {props.product.size.name}
                </Text>
              </View>
              <View style={tw`flex-row items-center`}>
                <Text style={tw`text-4 font-bold opacity-70 w-[40%]`}>
                  Frame :
                </Text>
                <Text style={tw`text-4 font-medium opacity-70`}>
                  {props.product.frame.name}
                </Text>
              </View>
              <View style={tw`flex-row items-center`}>
                <Text style={tw`text-4 font-bold opacity-70 w-[40%]`}>
                  Finish :
                </Text>
                <Text style={tw`text-4 font-medium opacity-70`}>
                  {props.product.finish.name}
                </Text>
              </View>
              <View style={tw`flex-row items-center`}>
                <Text style={tw`text-4 font-bold opacity-70 w-[40%]`}>
                  Price :
                </Text>
                <Text style={tw`text-4 font-medium opacity-70`}>
                  {props.price * props.quantity}€
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={tw`border flex-row justify-between items-center h-[8] w-[23] bg-white rounded-2 mt-2`}
              onPress={() => props.changeQuantity(props.imageResult_id)}
            >
              <View style={tw`flex-row pl-2`}>
                <Text style={tw`text-4 font-bold opacity-70`}>Qty: </Text>
                <Text style={tw`text-4 font-medium opacity-70`}>
                  {props.quantity}
                </Text>
              </View>
              <FontAwesome
                style={tw`pr-2`}
                name="chevron-down"
                size={15}
                color="black"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={tw`flex justify-between h-full`}>
          <ButtonIcon
            onPress={() => props.handleEdit(props.imageResult_id, props.url)}
            name="edit"
            isCartItem={true}
            size={25}
            style={tw`pt-0.8 pl-0.5`}
          />

          <ButtonIcon
            onPress={() => props.handleDelete(props.index)}
            name="trash"
            isCartItem={true}
            size={25}
            style={tw`pl-0.2`}
            color="#b91c1c"
          />
        </View>
      </View>
    </View>
  );
}
