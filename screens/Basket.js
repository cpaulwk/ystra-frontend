import { View, Text, Image, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import tw from "twrnc";
import React, { useEffect, useState } from "react";
import {
  addBasketItem,
  cancelChangeItem,
  updateChangedItem,
  cleanPreviousScreen,
} from "../reducers/user";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function Basket({ navigation }) {
  const [selectedOptButton, setSelecteOptdButton] = useState("size");
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
    // const priceSize = user.basket ? user.basket : products.find(
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
    // console.log(selectedFinish, selectedFrame, selectedSize);
    // console.log(
    //   priceSize?.priceProduct +
    //     priceFrame?.priceProduct +
    //     priceFinish?.priceProduct
    // );
    setTotal(
      priceSize?.priceProduct +
        priceFrame?.priceProduct +
        priceFinish?.priceProduct
    );
  }, [selectedFinish, selectedFrame, selectedSize]);

  const handleReturn = () => {
    setCanReturn(false);
    dispatch(cancelChangeItem());
    dispatch(cleanPreviousScreen());

    // Dirty navigation??
    navigation.navigate("TabNavigator", { screen: `${user.previousScreen}` });
    navigation.navigate(`${user.previousScreen}`);
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
  // if (user.newItem) {
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
      <TouchableOpacity
        style={tw`absolute flex justify-center items-center z-100 top-10 bottom-10 bg-[#AFAFAF] h-15 w-15 rounded-6 left-[5%] top-[8%] opacity-50`}
        onPress={() => handleReturn()}
      >
        <FontAwesome name="chevron-left" size={20} />
      </TouchableOpacity>
      <View style={tw`flex-1 justify-around items-center w-full pt-40`}>
        <View style={tw`flex justify-center items-center rounded-1 w-full`}>
          {showImage}
          {/* DARK FRAME */}
          <View
            style={selectedFrame == "dark" ? tw`absolute z-100` : tw`hidden`}
          >
            <View style={tw`h-78 w-78 border-[2]`}></View>
          </View>

          {/* LIGHT FRAME */}
          <View
            style={selectedFrame == "light" ? tw`absolute z-100` : tw`hidden`}
          >
            <View style={tw`h-78 w-78 border-[2] border-[#f9e8d5]`}></View>
          </View>

          {/* >GLOSSY EFFECT */}
          <View
            style={
              selectedFinish == "gloss" ? tw`absolute opacity-20` : tw`hidden`
            }
          >
            <Image
              style={tw`h-78 w-78`}
              source={require("../assets/glossfinish.png")}
            />
          </View>
          {/* >MATTE EFFECT */}

          <View
            style={
              selectedFinish == "matte" ? tw`absolute opacity-20` : tw`hidden`
            }
          >
            <Image
              style={tw`h-78 w-78`}
              source={require("../assets/mattefinish.jpg")}
            />
          </View>
        </View>
        <View
          style={tw`flex-row justify-center items-center border-[1.5px] border-[#161E44] bg-white rounded-1 h-11 w-[70%] mt-20`}
        >
          <TouchableOpacity
            style={[
              tw`flex-1 justify-center items-center rounded-r`,
              selectedOptButton === "size"
                ? tw`bg-[#161E44] w-full h-full border border-[#161E44]`
                : tw`w-full h-full`,
            ]}
            onPress={() => setSelecteOptdButton("size")}
          >
            <Text
              style={[
                tw`text-2xl font-medium`,
                selectedOptButton === "size"
                  ? tw`text-[#FFFFFF]`
                  : tw`text-[#161E44]`,
              ]}
            >
              Size
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              tw`flex-1 justify-center items-center rounded-1`,
              selectedOptButton === "frame"
                ? tw`bg-[#161E44] w-full h-full border border-[#161E44]`
                : tw`w-full h-full`,
            ]}
            onPress={() => setSelecteOptdButton("frame")}
          >
            <Text
              style={[
                tw`text-2xl font-medium`,
                selectedOptButton === "frame"
                  ? tw`text-[#FFFFFF]`
                  : tw`text-[#161E44]`,
              ]}
            >
              Frame
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              tw`flex-1 justify-center items-center rounded-l`,
              selectedOptButton === "finish"
                ? tw`bg-[#161E44] w-full h-full border border-[#161E44]`
                : tw`w-full h-full`,
            ]}
            onPress={() => setSelecteOptdButton("finish")}
          >
            <Text
              style={[
                tw`text-2xl font-medium`,
                selectedOptButton === "finish"
                  ? tw`text-[#FFFFFF]`
                  : tw`text-[#161E44]`,
              ]}
            >
              Finish
            </Text>
          </TouchableOpacity>
        </View>
        <View style={tw`w-full my-10 w-[70%]`}>
          {selectedOptButton === "size" && (
            <View style={tw`flex-row justify-around`}>
              <TouchableOpacity
                style={[
                  tw`flex border-[1.5px] justify-center items-center rounded-1.75 h-12 aspect-square border-[#161E44]`,
                  selectedSize === "S" ? tw`bg-[#161E44]` : tw`bg-[#ffff]`,
                ]}
                onPress={() => setselectedSize("S")}
              >
                <Text
                  style={[
                    tw`font-black text-3xl`,
                    selectedSize === "S"
                      ? tw`text-[#FFFF]`
                      : tw`text-[#161E44]`,
                  ]}
                >
                  S
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  tw`flex border-[1.5px] justify-center items-center rounded-1.75 h-12 aspect-square border-[#161E44]`,
                  selectedSize === "M" ? tw`bg-[#161E44]` : tw`bg-[#ffff]`,
                ]}
                onPress={() => setselectedSize("M")}
              >
                <Text
                  style={[
                    tw`font-black text-3xl`,
                    selectedSize === "M"
                      ? tw`text-[#FFFF]`
                      : tw`text-[#161E44]`,
                  ]}
                >
                  M
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  tw`flex border-[1.5px] justify-center items-center rounded-1.75 h-12 aspect-square border-[#161E44]`,
                  selectedSize === "L" ? tw`bg-[#161E44]` : tw`bg-[#ffff]`,
                ]}
                onPress={() => setselectedSize("L")}
              >
                <Text
                  style={[
                    tw`font-black text-3xl`,
                    selectedSize === "L"
                      ? tw`text-[#FFFF]`
                      : tw`text-[#161E44]`,
                  ]}
                >
                  L
                </Text>
              </TouchableOpacity>
            </View>
          )}
          {selectedOptButton === "frame" && (
            <View style={tw`flex-row justify-around`}>
              <TouchableOpacity
                style={[
                  tw`flex border-[1.5px] justify-center items-center rounded-1.75 h-12 w-[20%] border-[#161E44]`,
                  selectedFrame === "none" ? tw`bg-[#161E44]` : tw`bg-[#ffff]`,
                ]}
                onPress={() => setselectedFrame("none")}
              >
                <Text
                  style={[
                    tw`font-black `,
                    selectedFrame === "none"
                      ? tw`text-[#FFFF]`
                      : tw`text-[#161E44]`,
                  ]}
                >
                  None
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  tw`flex border-[1.5px] justify-center items-center rounded-1.75 h-12 w-[20%] border-[#161E44]`,
                  selectedFrame === "dark" ? tw`bg-[#161E44]` : tw`bg-[#ffff]`,
                ]}
                onPress={() => setselectedFrame("dark")}
              >
                <Text
                  style={[
                    tw`font-black`,
                    selectedFrame === "dark"
                      ? tw`text-[#FFFF]`
                      : tw`text-[#161E44]`,
                  ]}
                >
                  Dark
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  tw`flex border-[1.5px] justify-center items-center rounded-1.75 h-12 w-[20%] border-[#161E44]`,
                  selectedFrame === "light" ? tw`bg-[#161E44]` : tw`bg-[#ffff]`,
                ]}
                onPress={() => setselectedFrame("light")}
              >
                <Text
                  style={[
                    tw`font-black`,
                    selectedFrame === "light"
                      ? tw`text-[#FFFF]`
                      : tw`text-[#161E44]`,
                  ]}
                >
                  Light
                </Text>
              </TouchableOpacity>
            </View>
          )}
          {selectedOptButton === "finish" && (
            <View style={tw`flex-row justify-around`}>
              <TouchableOpacity
                style={[
                  tw`flex border-[1.5px] justify-center items-center rounded-1.75 h-12 w-[20%] border-[#161E44]`,
                  selectedFinish === "none" ? tw`bg-[#161E44]` : tw`bg-[#ffff]`,
                ]}
                onPress={() => setselectedFinish("none")}
              >
                <Text
                  style={[
                    tw`font-black`,
                    selectedFinish === "none"
                      ? tw`text-[#FFFF]`
                      : tw`text-[#161E44]`,
                  ]}
                >
                  None
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  tw`flex border-[1.5px] justify-center items-center rounded-1.75 h-12 w-[20%] border-[#161E44]`,
                  selectedFinish === "gloss"
                    ? tw`bg-[#161E44]`
                    : tw`bg-[#ffff]`,
                ]}
                onPress={() => setselectedFinish("gloss")}
              >
                <Text
                  style={[
                    tw`font-black `,
                    selectedFinish === "gloss"
                      ? tw`text-[#FFFF]`
                      : tw`text-[#161E44]`,
                  ]}
                >
                  Gloss
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  tw`flex border-[1.5px] justify-center items-center rounded-1.75 h-12 w-[20%] border-[#161E44]`,
                  selectedFinish === "matte"
                    ? tw`bg-[#161E44]`
                    : tw`bg-[#ffff]`,
                ]}
                onPress={() => setselectedFinish("matte")}
              >
                <Text
                  style={[
                    tw`font-black`,
                    selectedFinish === "matte"
                      ? tw`text-[#FFFF]`
                      : tw`text-[#161E44]`,
                  ]}
                >
                  Matte
                </Text>
              </TouchableOpacity>
            </View>
          )}
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
            {user.changeItem ? "Update Item" : "Add to Cart"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
