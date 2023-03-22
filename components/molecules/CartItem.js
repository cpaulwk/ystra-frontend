import { Image, Text, TouchableOpacity, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import ButtonIcon from "../atoms/ButtonIcon";
import tw from "twrnc";

export default function CartItem({
  url,
  product,
  price,
  quantity,
  changeQuantity,
  imageResult_id,
  handleEdit,
  handleDelete,
  index,
}) {
  return (
    <View style={tw`flex items-center w-full h-35 border-t border-[#AFAFAF]`}>
      <View style={tw`flex-row justify-between items-center p-3 w-full h-full`}>
        <View style={tw`flex-row items-center`}>
          <Image style={tw`h-30 aspect-square mr-5`} source={{ uri: url }} />
          <View style={tw`flex justify-between`}>
            <View style={tw`flex`}>
              <View style={tw`flex-row items-center`}>
                <Text style={tw`text-4 font-bold opacity-70 w-[40%]`}>
                  Size :
                </Text>
                <Text style={tw`text-4 font-medium opacity-70`}>
                  {product.size.name}
                </Text>
              </View>
              <View style={tw`flex-row items-center`}>
                <Text style={tw`text-4 font-bold opacity-70 w-[40%]`}>
                  Frame :
                </Text>
                <Text style={tw`text-4 font-medium opacity-70`}>
                  {product.frame.name}
                </Text>
              </View>
              <View style={tw`flex-row items-center`}>
                <Text style={tw`text-4 font-bold opacity-70 w-[40%]`}>
                  Finish :
                </Text>
                <Text style={tw`text-4 font-medium opacity-70`}>
                  {product.finish.name}
                </Text>
              </View>
              <View style={tw`flex-row items-center`}>
                <Text style={tw`text-4 font-bold opacity-70 w-[40%]`}>
                  Price :
                </Text>
                <Text style={tw`text-4 font-medium opacity-70`}>
                  {price * quantity}€
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={tw`border flex-row justify-between items-center h-[8] w-[23] bg-white rounded-2 mt-2`}
              onPress={() => changeQuantity(imageResult_id)}
            >
              <View style={tw`flex-row pl-2`}>
                <Text style={tw`text-4 font-bold opacity-70`}>Qty: </Text>
                <Text style={tw`text-4 font-medium opacity-70`}>
                  {quantity}
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
            onPress={() => handleEdit(imageResult_id, url)}
            name="edit"
            isCartItem={true}
            size={25}
            style={tw`pt-0.8 pl-0.5`}
          />

          <ButtonIcon
            onPress={() => handleDelete(index)}
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
