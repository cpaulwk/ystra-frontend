import { View, Text, Image, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import tw from "twrnc";
import React, { useState } from "react";

export default function Basket({ navigation }) {
  const [selectedOptButton, setSelecteOptdButton] = useState();
  const [selectedSize, setselectedSize] = useState("S");
  const [selectedFrame, setselectedFrame] = useState("none");
  const [selectedFinish, setselectedFinish] = useState("none");

  const user = useSelector((state) => state.user.value);
  // const imageResult = useSelector((state) => state.imageResult.value);

  return (
    <View style={tw`flex-1 items-center  w-full h-full pt-40`}>
      <View>
        <Image
          source={require("../assets/img-Ng8OjQ4XBHSSd2KXIdvKgOJD.png")} // UTILISER USESELECTOR POUR DYNAMISER URL DE L'IMAGE
          style={tw``}
        />
        <Image
          source={require("../assets/goldframe.png")}
          style={tw`absolute h-60 w-60 mt--1`}
        />
      </View>

      <View
        style={tw`w-66 h-11 border-8 rounded-1 border-[#161E44] bg-[#FFFF]  mt-9.5 relative`}
      />

      <View
        style={tw` justify-center flex-row  w-[100%] pt-114

absolute`}>
        <TouchableOpacity
          style={[
            tw`flex justify-center items-center`,
            selectedOptButton === "size"
              ? tw`bg-[#161E44] w-[23%] h-10  `
              : tw`bg-[#FFFF] w-[23%] h-10 `,
          ]}
          onPress={() => setSelecteOptdButton("size")}>
          <Text
            style={[
              tw`text-2xl font-normal`,
              selectedOptButton === "size"
                ? tw`text-[#FFFF]`
                : tw`text-[#161E44]`,
            ]}>
            Size
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            tw`flex justify-center items-center`,
            selectedOptButton === "frame"
              ? tw`bg-[#161E44] w-[23%]`
              : tw`bg-[#FFFF] w-[23%]`,
          ]}
          onPress={() => setSelecteOptdButton("frame")}>
          <Text
            style={[
              tw`text-2xl font-normal`,
              selectedOptButton === "frame"
                ? tw`text-[#FFFF]`
                : tw`text-[#161E44]`,
            ]}>
            Frame
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            tw`flex justify-center items-center`,
            selectedOptButton === "finish"
              ? tw`bg-[#161E44] w-[23%]`
              : tw`bg-[#FFFF] w-[23%]`,
          ]}
          onPress={() => setSelecteOptdButton("finish")}>
          <Text
            style={[
              tw`text-2xl font-normal`,
              selectedOptButton === "finish"
                ? tw`text-[#FFFF]`
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
        <Text>
          {user.userName} {user.token}
          {"€"}
        </Text>
      </View>
      <View style={tw`absolute mt-148 justify-center flex-row w-full pt-16`}>
        <TouchableOpacity
          style={tw` flex justify-center items-center bg-[#2C6DB4] rounded-1.75 h-15 w-[85%]  border-[#161E44]`}
          onPress={() => navigation.navigate("Cart")}>
          <Text style={tw`font-medium		 text-2xl text-[#FFFF]`}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
// border-2 border-orange-800
