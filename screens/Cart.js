import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import tw from "twrnc";
import { changeItemQuantity, removeBasketItem } from "../reducers/user";
import ButtonWithText from "../components/uikit/ButtonWithText";
import Header from "../components/uikit/Header";
import CartItem from "../components/uikit/CartItem";
import ModalQuantityList from "../components/uikit/ModalQuantityList";
import { useState, useEffect } from "react";

export default function Basket({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const total = user.basket.reduce(
    (accu, current) => accu + current.price * current.quantity,
    0
  );
  const [quantity, setQuantity] = useState("1");
  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [cartItemInfo, setCartItemInfo] = useState([]);

  const handleDelete = (index) => {
    dispatch(removeBasketItem(index));
  };

  const changeQuantity = (image) => {
    setOpenModal(true);
    setSelectedImage(image);
  };

  const updateItemInfo = (value, image) => {
    setCartItemInfo(
      cartItemInfo.filter((item) => {
        item.imageResult_id = image;
      })
    );
  };
  const handleSelectedQuantity = (value, image) => {
    console.log("value =>", value);
    setQuantity(value);
    setOpenModal(false);
    dispatch(changeItemQuantity({ quantity: value, imageResult_id: image }));
    console.log("user.basket =>", user.basket);
  };

  // MAP
  const showCart = user.basket.map((element, index) => {
    return (
      <CartItem
        {...element}
        key={index}
        onPress={handleDelete}
        index={index}
        changeQuantity={changeQuantity}
        handleSelectedQuantity={handleSelectedQuantity}
      />
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
      {openModal && (
        <ModalQuantityList
          quantityList={5}
          handleSelectedQuantity={handleSelectedQuantity}
          setOpenModal={setOpenModal}
          changeItemQuantity={changeItemQuantity}
          selectedImage={selectedImage}
        />
      )}
    </View>
  );
}
