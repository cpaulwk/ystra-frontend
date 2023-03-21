import { View, Text, Image } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import tw from "twrnc";
import React, { useEffect, useState } from "react";
import {
  addBasketItem,
  cancelChangeItem,
  updateChangedItem,
  cleanPreviousScreen,
} from "../reducers/user";
import ReturnButton from "../components/uikit/ReturnButton";
import ProductButton from "../components/uikit/ProductButton";
import CustomizationButton from "../components/uikit/CustomizationButton";
import ImageFinish from "../components/uikit/ImageFinish";
import ImageFrame from "../components/uikit/ImageFrame";
import ButtonWithText from "../components/uikit/ButtonWithText";

export default function Basket({ navigation }) {
  const [selectedOptButton, setSelectedOptButton] = useState("size");
  const [selectedSize, setselectedSize] = useState("S");
  const [selectedFrame, setselectedFrame] = useState("none");
  const [selectedFinish, setselectedFinish] = useState("none");
  const [total, setTotal] = useState(0);
  const [canReturn, setCanReturn] = useState(false);

  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    if (user.changeItem) {
      setselectedSize(user.changeItem.product.size.name);
      setselectedFrame(user.changeItem.product.frame.name);
      setselectedFinish(user.changeItem.product.finish.name);
    }
  }, []);

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
    setTotal(
      priceSize?.priceProduct +
        priceFrame?.priceProduct +
        priceFinish?.priceProduct
    );
  }, [selectedFinish, selectedFrame, selectedSize]);

  const imageFrame = <ImageFrame selectedFrame={selectedFrame} />;

  const imageFinish = <ImageFinish selectedFinish={selectedFinish} />;

  const customizationButtonList = ["size", "frame", "finish"];

  const customizationButtons = customizationButtonList.map((item) => {
    return (
      <CustomizationButton
        key={item}
        item={item}
        selectedOptButton={selectedOptButton}
        setSelectedOptButton={setSelectedOptButton}
      />
    );
  });

  const productButtonList = {
    size: ["S", "M", "L"],
    frame: ["none", "dark", "light"],
    finish: ["none", "gloss", "matte"],
  };

  const productButtons = productButtonList[selectedOptButton].map((item) => {
    return (
      <ProductButton
        key={item}
        item={item}
        selectedOptButton={selectedOptButton}
        selectedSize={selectedSize}
        selectedFrame={selectedFrame}
        selectedFinish={selectedFinish}
        setselectedSize={setselectedSize}
        setselectedFrame={setselectedFrame}
        setselectedFinish={setselectedFinish}
      />
    );
  });

  const handleReturn = () => {
    setCanReturn(false);
    dispatch(cancelChangeItem());
    dispatch(cleanPreviousScreen());

    // Dirty navigation??
    navigation.navigate("TabNavigator", { screen: `${user.previousScreen}` });
    navigation.navigate(`${user.previousScreen}`);
  };

  const handleBasket = () => {
    const priceSize = products.find(
      (item) => item.nameProduct === selectedSize && item.typeProduct === "size"
    );
    const priceFrame = products.find(
      (item) =>
        item.nameProduct === selectedFrame && item.typeProduct === "frame"
    );
    const priceFinish = products.find(
      (item) =>
        item.nameProduct === selectedFinish && item.typeProduct === "finish"
    );

    let additem = Object.assign(
      {},
      user.changeItem ? user.changeItem : user.newItem
    );

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
    additem.price = total;
    console.log("additem => ", additem);
    if (user.changeItem) {
      dispatch(updateChangedItem(additem));
    } else {
      dispatch(addBasketItem(additem));
    }
    // console.log("user.basket => ", user.basket);
    dispatch(cleanPreviousScreen());

    navigation.navigate("TabNavigator", { screen: `${user.previousScreen}` });
    navigation.navigate(`${user.previousScreen}`);
  };

  let showImage = (
    <View>
      <Text>No selected item</Text>
    </View>
  );
  if (user.newItem || user.changeItem) {
    showImage = (
      <View>
        <Image
          style={tw`h-75 w-75`}
          source={{
            uri: user.changeItem ? user.changeItem.url : user.newItem.url,
          }}
        />
      </View>
    );
  }

  return (
    <View style={tw`flex-1 justify-between items-center`}>
      <ReturnButton withoutHeader={true} onPress={handleReturn} />
      <View style={tw`flex-1 justify-around items-center w-full pt-40`}>
        <View style={tw`flex justify-center items-center rounded-1 w-full`}>
          {showImage}

          {imageFrame}

          {imageFinish}
        </View>

        <View
          style={tw`flex-row justify-center items-center border-[1.5px] border-[#161E44] bg-white rounded-1 h-11 w-[70%] mt-20`}
        >
          {customizationButtons}
        </View>

        <View style={tw`w-full my-10 w-[70%]`}>
          <View style={tw`flex-row justify-around`}>{productButtons}</View>
        </View>

        <View style={tw`flex w-[80%] mt-5 mb-10`}>
          <View
            style={tw`flex-row bg-[#F4F3EE] justify-between rounded-2 border border-[#AFAFAF] mb-5 p-5`}
          >
            <Text style={tw`text-6 font-medium`}>Total:</Text>
            <Text style={tw`text-6 font-medium`}>{`${total}€`}</Text>
          </View>
          <ButtonWithText
            color="[#2C6DB4]"
            onPress={handleBasket}
            text={user.changeItem ? "Update Item" : "Add to Cart"}
          />
        </View>
      </View>
    </View>
  );
}
