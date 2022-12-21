import { View, Text, Image, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import tw from "twrnc";
import React, { useEffect, useState } from "react";
import { addBasketItem } from "../reducers/user";
import ChevronLeftIcon from "react-native-bootstrap-icons/icons/chevron-left";

export default function Basket({ navigation }) {
  const [selectedOptButton, setSelecteOptdButton] = useState("size");
  const [selectedSize, setselectedSize] = useState("S");
  const [selectedFrame, setselectedFrame] = useState("none");
  const [selectedFinish, setselectedFinish] = useState("none");
  const [total, setTotal] = useState(0);
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

  const handleBasket = (itemId, itemUrl) => {
    dispatch(addBasketItem(user.newItem));
    navigation.navigate("TabNavigator", { screen: "Cart" });
  };

  let showImage = (
    <View>
      <Text>No selected item</Text>
    </View>
  );
  if (user.newItem) {
    showImage = (
      <View>
        <Image style={tw`h-50 w-50`} source={{ uri: user.newItem.url }} />
      </View>
    );
  }

  return (
    <View style={tw`flex-1 items-center w-full h-full pt-40`}>
      <TouchableOpacity
        style={tw`absolute flex justify-center items-center z-100 top-10 bottom-10 bg-[#AFAFAF] h-15 w-15 rounded-6 left-[5%] top-[8%]`}
        onPress={() => navigation.navigate("TabNavigator", { screen: "Home" })}>
        <ChevronLeftIcon fill="black" />
      </TouchableOpacity>
      {showImage}
      <View
        style={tw`border flex-row justify-center items-center w-66 h-11 rounded-1 border-[#161E44] bg-[#FFFF]  mt-9.5`}>
        {/* GOLD FRAME */}
        <View style={selectedFrame !== "gold" ? { display: "none" } : {}}>
          <Image
            style={tw`h-60 w-60 absolute mt--70`}
            source={require("../assets/goldframe.png")}
          />
        </View>
        {/* >WOOD FRAME */}

        <View style={selectedFrame !== "wood" ? { display: "none" } : {}}>
          <Image
            style={tw`h-60 w-60 absolute mt--70`}
            source={require("../assets/woodframe.png")}
          />
        </View>
        {/* >GLOSSY EFFECT */}
        <View style={selectedFinish !== "gloss" ? { display: "none" } : {}}>
          <Image
            style={tw`h-50 w-50 absolute mt--60  mr-8	opacity-70	`}
            source={require("../assets/glossfinish.png")}
          />
        </View>
        {/* >MATTE EFFECT */}

        <View style={selectedFinish !== "matte" ? { display: "none" } : {}}>
          <Image
            style={tw`h-50 w-50 absolute mt--70 opacity-70`}
            source={require("../assets/mattefinish.jpg")}
          />
        </View>

        <TouchableOpacity
          style={[
            tw`flex-1 justify-center items-center rounded-1`,
            selectedOptButton === "size"
              ? tw`bg-[#161E44] w-full h-full`
              : tw`bg-[#FFFFFF] w-full h-full`,
          ]}
          onPress={() => setSelecteOptdButton("size")}>
          <Text
            style={[
              tw`text-2xl font-normal`,
              selectedOptButton === "size"
                ? tw`text-[#FFFFFF]`
                : tw`text-[#161E44]`,
            ]}>
            Size
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            tw`flex-1 justify-center items-center rounded-1`,
            selectedOptButton === "frame"
              ? tw`bg-[#161E44] h-full w-full`
              : tw`bg-[#FFFFFF] h-full w-full`,
          ]}
          onPress={() => setSelecteOptdButton("frame")}>
          <Text
            style={[
              tw`text-2xl font-normal`,
              selectedOptButton === "frame"
                ? tw`text-[#FFFFFF]`
                : tw`text-[#161E44]`,
            ]}>
            Frame
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            tw`flex-1 justify-center items-center rounded-1`,
            selectedOptButton === "finish"
              ? tw`bg-[#161E44] h-full w-full`
              : tw`bg-[#FFFFFF] h-full w-full`,
          ]}
          onPress={() => setSelecteOptdButton("finish")}>
          <Text
            style={[
              tw`text-2xl font-normal`,
              selectedOptButton === "finish"
                ? tw`text-[#FFFFFF]`
                : tw`text-[#161E44]`,
            ]}>
            Finish
          </Text>
        </TouchableOpacity>
      </View>
      {selectedOptButton === "size" && (
        <View style={tw`justify-center flex-row w-full pt-5`}>
          <TouchableOpacity
            style={[
              tw`flex border-2 justify-center items-center rounded-1.75 h-10 w-[12.5%]  border-[#161E44]`,
              selectedSize === "S" ? tw`bg-[#161E44]` : tw`bg-[#ffff]`,
            ]}
            onPress={() => setselectedSize("S")}>
            <Text
              style={[
                tw`font-black text-3xl`,
                selectedSize === "S" ? tw`text-[#FFFF]` : tw`text-[#161E44]`,
              ]}>
              S
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              tw`flex ml-2 border-2 justify-center  items-center rounded-1.75 h-10 w-[12.5%]  ml-9 mr-7 border-[#161E44]`,
              selectedSize === "M" ? tw`bg-[#161E44]` : tw`bg-[#ffff]`,
            ]}
            onPress={() => setselectedSize("M")}>
            <Text
              style={[
                tw`font-black text-3xl`,
                selectedSize === "M" ? tw`text-[#FFFF]` : tw`text-[#161E44]`,
              ]}>
              M
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              tw`flex ml-2 border-2 justify-center items-center rounded-1.75 h-10 w-[12.5%]  border-[#161E44]`,
              selectedSize === "L" ? tw`bg-[#161E44]` : tw`bg-[#ffff]`,
            ]}
            onPress={() => setselectedSize("L")}>
            <Text
              style={[
                tw`font-black text-3xl`,
                selectedSize === "L" ? tw`text-[#FFFF]` : tw`text-[#161E44]`,
              ]}>
              L
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {selectedOptButton === "frame" && (
        <View style={tw`justify-center flex-row w-full pt-5`}>
          <TouchableOpacity
            style={[
              tw`flex border-2 justify-center items-center rounded-1.75 h-10 w-[12.5%]  border-[#161E44]`,
              selectedFrame === "none" ? tw`bg-[#161E44]` : tw`bg-[#ffff]`,
            ]}
            onPress={() => setselectedFrame("none")}>
            <Text
              style={[
                tw`font-black `,
                selectedFrame === "none"
                  ? tw`text-[#FFFF]`
                  : tw`text-[#161E44]`,
              ]}>
              None
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              tw`flex ml-2 border-2 justify-center  items-center rounded-1.75 h-10 w-[12.5%]  ml-9 mr-7 border-[#161E44]`,
              selectedFrame === "wood" ? tw`bg-[#161E44]` : tw`bg-[#ffff]`,
            ]}
            onPress={() => setselectedFrame("wood")}>
            <Text
              style={[
                tw`font-black`,
                selectedFrame === "wood"
                  ? tw`text-[#FFFF]`
                  : tw`text-[#161E44]`,
              ]}>
              Wood
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              tw`flex ml-2 border-2 justify-center items-center rounded-1.75 h-10 w-[12.5%]  border-[#161E44]`,
              selectedFrame === "gold" ? tw`bg-[#161E44]` : tw`bg-[#ffff]`,
            ]}
            onPress={() => setselectedFrame("gold")}>
            <Text
              style={[
                tw`font-black`,
                selectedFrame === "gold"
                  ? tw`text-[#FFFF]`
                  : tw`text-[#161E44]`,
              ]}>
              Gold
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {selectedOptButton === "finish" && (
        <View style={tw`justify-center flex-row w-full pt-5`}>
          <TouchableOpacity
            style={[
              tw`flex border-2 justify-center items-center rounded-1.75 h-10 w-[12.5%]  border-[#161E44]`,
              selectedFinish === "none" ? tw`bg-[#161E44]` : tw`bg-[#ffff]`,
            ]}
            onPress={() => setselectedFinish("none")}>
            <Text
              style={[
                tw`font-black`,
                selectedFinish === "none"
                  ? tw`text-[#FFFF]`
                  : tw`text-[#161E44]`,
              ]}>
              None
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              tw`flex ml-2 border-2 justify-center  items-center rounded-1.75 h-10 w-[12.5%]  ml-9 mr-7 border-[#161E44]`,
              selectedFinish === "gloss" ? tw`bg-[#161E44]` : tw`bg-[#ffff]`,
            ]}
            onPress={() => setselectedFinish("gloss")}>
            <Text
              style={[
                tw`font-black `,
                selectedFinish === "gloss"
                  ? tw`text-[#FFFF]`
                  : tw`text-[#161E44]`,
              ]}>
              Gloss
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              tw`flex ml-2 border-2 justify-center items-center rounded-1.75 h-10 w-[12.5%]  border-[#161E44]`,
              selectedFinish === "matte" ? tw`bg-[#161E44]` : tw`bg-[#ffff]`,
            ]}
            onPress={() => setselectedFinish("matte")}>
            <Text
              style={[
                tw`font-black`,
                selectedFinish === "matte"
                  ? tw`text-[#FFFF]`
                  : tw`text-[#161E44]`,
              ]}>
              Matte
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={tw`flex pt-12`}>
        <Text>{`${total}€`}</Text>
      </View>
      <View style={tw`absolute mt-148 justify-center flex-row w-full pt-16`}>
        <TouchableOpacity
          style={tw` flex justify-center items-center bg-[#2C6DB4] rounded-1.75 h-15 w-[85%]  border-[#161E44]`}
          onPress={() => handleBasket()}>
          <Text style={tw`font-medium		 text-2xl text-[#FFFF]`}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
// border-2 border-orange-800
