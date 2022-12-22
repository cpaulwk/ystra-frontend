import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import tw from "twrnc";
import React, { useEffect, useState } from "react";
import { addBasketItem } from "../reducers/user";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function Basket({ navigation }) {
  const [selectedOptButton, setSelecteOptdButton] = useState("size");
  const [selectedSize, setselectedSize] = useState("S");
  const [selectedFrame, setselectedFrame] = useState("none");
  const [selectedFinish, setselectedFinish] = useState("none");
  const [total, setTotal] = useState(0);
  const [canReturn, setCanReturn] = useState(false);
  const products = useSelector((state) => state.product.products);

  const user = useSelector((state) => state.user.value);
  // const imageResult = useSelector((state) => state.imageResult.value);

  const dispatch = useDispatch();

  useEffect(() => {
    const priceSize = products.find(
      (elem) => elem.nameProduct === selectedSize && elem.typeProduct === "size"
    );
    const priceFrame = products.find(
      (elem) =>
        elem.nameProduct === selectedFrame && elem.typeProduct === "frame"
    );
    const priceFinish = products.find(
      (elem) =>
        elem.nameProduct === selectedFinish && elem.typeProduct === "finish"
    );
    console.log(selectedFinish, selectedFrame, selectedSize);
    console.log(
      priceSize?.priceProduct +
        priceFrame?.priceProduct +
        priceFinish?.priceProduct
    );
    setTotal(
      priceSize?.priceProduct +
        priceFrame?.priceProduct +
        priceFinish?.priceProduct
    );
  }, [selectedFinish, selectedFrame, selectedSize]);

  const handleReturn = () => {
    setCanReturn(false);
    navigation.navigate("Adress");
  };

  const handleBasket = (itemId, itemUrl) => {
    const priceSize = products.find(
      (elem) => elem.nameProduct === selectedSize && elem.typeProduct === "size"
    );
    const priceFrame = products.find(
      (elem) =>
        elem.nameProduct === selectedFrame && elem.typeProduct === "frame"
    );
    const priceFinish = products.find(
      (elem) =>
        elem.nameProduct === selectedFinish && elem.typeProduct === "finish"
    );
    console.log("1", priceSize);

    let additem = Object.assign({}, user.newItem);
    console.log("2", additem);

    additem.product = {
      size: {
        productID: priceSize?._id,
        name: priceSize?.nameProduct,
        price: priceSize?.priceProduct,
        variation: priceSize?.variationProduct,
      },
      finish: {
        productID: priceFinish?._id,
        name: priceFinish?.nameProduct,
        price: priceFinish?.priceProduct,
        variation: priceFinish?.variationProduct,
      },
      frame: {
        productID: priceFrame?._id,
        name: priceFrame?.nameProduct,
        price: priceFrame?.priceProduct,
        variation: priceFrame?.variationProduct,
      },
    };
    console.log("3", additem);
    console.log("total", total);
    additem.price = total;
    dispatch(addBasketItem(additem));

    navigation.navigate("OrderConfirmation");
  };

  let showImage = (
    <View>
      <Text>No selected item</Text>
    </View>
  );
  if (user.newItem) {
    showImage = (
      <View>
        <Image style={tw`h-60 w-60`} source={{ uri: user.newItem.url }} />
      </View>
    );
  }

  return (
    <View style={tw`flex-1 justify-between items-center`}>
      <TouchableOpacity
        style={tw`absolute flex justify-center items-center z-100 top-10 bottom-10 bg-[#AFAFAF] h-15 w-15 rounded-6 left-[5%] top-[8%] opacity-50`}
        onPress={() => handleReturn()}
      >
        <FontAwesome name="chevron-left" size={20} />
      </TouchableOpacity>
      <View style={styles.header}>
        <Text style={tw`text-6 font-bold opacity-70`}>Add payment</Text>
      </View>
      <View style={tw`flex-1 justify-around items-center w-full pt-40`}>
        <View
          style={tw`flex justify-end items-center w-95 h-60 rounded-5 bg-[#111827] pb-8 px-5`}
        >
          <Text style={tw`text-white text-7 mb-5`}>XXXX-XXXX-XXXX-XXXX</Text>
          <Text style={tw`text-white text-5 pl-7`}>XX/XX</Text>
          <View style={tw`flex-row items-center w-full`}>
            <Text style={tw`text-white text-5`}>NAME</Text>
          </View>
        </View>
        <View style={tw` border w-full my-10 w-[70%]`}>
          <TextInput />
          <Text>Hello</Text>
        </View>

        <View
          style={tw`flex-row bg-[#F4F3EE] justify-between w-[80%] rounded-2 border border-[#AFAFAF] mb-10 p-5`}
        >
          <Text style={tw`text-6 font-medium`}>Total:</Text>
          <Text style={tw`text-6 font-medium`}>{`${total}€`}</Text>
        </View>
      </View>

      <View style={tw`flex-row justify-center w-full mb-[20%]`}>
        <TouchableOpacity
          style={tw` flex justify-center items-center bg-[#2C6DB4] rounded-1.75 h-15 w-[85%]  border-[#161E44]`}
          onPress={() => handleBasket()}
        >
          <Text style={tw`font-medium text-2xl text-[#FFFF]`}>
            Confirm payment
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    zIndex: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#F2EFEA",
    paddingBottom: 25,
    height: "15%",
    width: "100%",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.8,
    shadowRadius: 5.3,

    elevation: 18,
  },
});
