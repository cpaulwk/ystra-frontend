import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import tw from "twrnc";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { removeBasketItem } from "../reducers/user";
import ButtonWithText from "../components/uikit/ButtonWithText";
import Header from "../components/uikit/Header";

export default function Basket({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const total = user.basket.reduce((accu, current) => accu + current.price, 0);
  console.log("Boucif --->", user.basket);

  const handleDelete = (index) => {
    dispatch(removeBasketItem(index));
  };

  // MAP
  const showCart = user.basket.map((element, index) => {
    console.log("ok", element);

    return (
      <View
        key={index}
        style={tw`flex items-center w-full border-t border-[#AFAFAF]`}
      >
        <View style={tw`flex-row justify-between items-center py-5 w-[90%]`}>
          <View style={tw`flex-row grow items-center`} key={index}>
            <Image style={tw`h-25 w-25 mr-5`} source={{ uri: element.url }} />
            <View style={tw`w-[35%]`}>
              <View style={tw`flex-row items-center w-full`}>
                <Text style={tw`text-4 font-bold opacity-70 w-[50%]`}>
                  Size :
                </Text>
                <Text style={tw`text-4 font-medium opacity-70 w-[50%]`}>
                  {element.product.size.name}
                </Text>
              </View>
              <View style={tw`flex-row items-center w-full`}>
                <Text style={tw`text-4 font-bold opacity-70 w-[50%]`}>
                  Frame :
                </Text>
                <Text style={tw`text-4 font-medium opacity-70 w-[50%]`}>
                  {element.product.frame.name}
                </Text>
              </View>
              <View style={tw`flex-row items-center w-full`}>
                <Text style={tw`text-4 font-bold opacity-70 w-[50%]`}>
                  Finish :
                </Text>
                <Text style={tw`text-4 font-medium opacity-70 w-[50%]`}>
                  {element.product.finish.name}
                </Text>
              </View>
              <View style={tw`flex-row items-center w-full`}>
                <Text style={tw`text-4 font-bold opacity-70 w-[50%]`}>
                  Total :
                </Text>
                <Text style={tw`text-4 font-medium opacity-70 w-[50%]`}>
                  {element.price}€
                </Text>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={tw` flex justify-center items-center bg-red-700 rounded-4 h-[7.5] w-[7.5] border-[#161E44] mx-0	  `}
            onPress={() => handleDelete(index)}
            // onPress={() => navigation.navigate("Adress")}
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
  });

  return (
    <View style={tw`flex-1 bg-[#F2EFEA] items-center`}>
      <Header doesContainReturnButtonComponent={false} title="Buy Prints" />
      <ScrollView style={tw`w-full bg-white`}>
        <View style={tw`flex items-center border-b border-[#AFAFAF]`}>
          {showCart}
        </View>
      </ScrollView>

      <View style={tw`w-[80%] mt-5`}>
        <View
          style={tw`flex-row bg-[#F4F3EE] justify-between rounded-2 border border-[#AFAFAF] mb-5 p-5`}
        >
          <Text style={tw`text-6 font-medium`}>Total:</Text>
          <Text style={tw`text-6 font-medium`}>{`${total}€`}</Text>
        </View>
        <View style={tw`flex-row justify-center pb-[10%]`}>
          <ButtonWithText
            color="[#2C6DB4]"
            onPress={() => navigation.navigate("Adress")}
            text="Pay"
          />
        </View>
      </View>
    </View>
  );
}
