import { View, Text, ScrollView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import tw from "twrnc";
import { removeBasketItem } from "../reducers/user";
import ButtonWithText from "../components/uikit/ButtonWithText";
import Header from "../components/uikit/Header";
import CartItem from "../components/uikit/CartItem";

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
    console.log("element =>", element);

    return (
      <CartItem {...element} key={index} onPress={handleDelete} index={index} />
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
