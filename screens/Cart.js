import { View, Text, ScrollView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import tw from "twrnc";
import {
  changeItem,
  changeItemQuantity,
  removeBasketItem,
  previousScreen,
} from "../reducers/user";
import ButtonWithText from "../components/uikit/ButtonWithText";
import Header from "../components/uikit/Header";
import CartItem from "../components/uikit/CartItem";
import ModalQuantityList from "../components/uikit/ModalQuantityList";
import { useState, useEffect } from "react";

export default function Cart({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const product = useSelector((state) => state.product.products);
  const total = user.basket.reduce(
    (accu, current) => accu + current.price * current.quantity,
    0
  );
  const [quantity, setQuantity] = useState("1");
  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [cartItemInfo, setCartItemInfo] = useState([]);
  const [disableButton, setDisableButton] = useState(false);

  useEffect(() => {
    if (!total || !user.basket) {
      setDisableButton(true);
    } else {
      setDisableButton(false);
    }
  }, [total]);

  const handleDelete = (index) => {
    dispatch(removeBasketItem(index));
  };

  const handleEdit = (itemId, itemUrl) => {
    const targetItemInfo = user.basket.find(
      (item) => item.imageResult_id === itemId
    );
    const itemToChange = {
      imageResult_id: itemId,
      url: itemUrl,
      price: targetItemInfo.price,
      product: {
        size: targetItemInfo.product.size,
        finish: targetItemInfo.product.finish,
        frame: targetItemInfo.product.frame,
      },
      quantity: targetItemInfo.quantity,
    };
    dispatch(changeItem(itemToChange));
    dispatch(previousScreen("Cart"));
    navigation.navigate("Basket");
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
    setQuantity(value);
    setOpenModal(false);
    dispatch(changeItemQuantity({ quantity: value, imageResult_id: image }));
  };

  // MAP
  const showCart = user.basket.map((element, index) => {
    return (
      <CartItem
        {...element}
        key={index}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
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
        <View
          style={tw`flex-col-reverse items-center border-b border-[#AFAFAF]`}
        >
          {showCart}
        </View>
      </ScrollView>

      <View style={tw`flex w-[80%] mt-5 mb-8`}>
        <View
          style={tw`flex-row bg-[#F4F3EE] justify-between rounded-2 border border-[#AFAFAF] mb-5 p-5`}
        >
          <Text style={tw`text-6 font-medium`}>Total:</Text>
          <Text style={tw`text-6 font-medium`}>{`${total}€`}</Text>
        </View>
        <ButtonWithText
          color="[#2C6DB4]"
          onPress={() => navigation.navigate("Adress")}
          text="Pay"
          disabled={disableButton}
        />
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
