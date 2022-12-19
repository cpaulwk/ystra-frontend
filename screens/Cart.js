import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import tw from "twrnc";
import React, { useState } from "react";

export default function Basket({ navigation }) {
  return (
    <View style={tw`bg-[#F2EFEA] w-full h-full `}>
      <View style={tw`flex justify-center items-center `}>
        <View style={tw`flex items-center mt-[35%]`}>
          <Text style={tw`text-12 mb-[10%] font-bold opacity-70`}>
            Buy Prints
          </Text>
        </View>
        <View style={tw` w-full  h-50 border-t-2 border-[#AFAFAF]`}>
          <Image
            source={require("../assets/img-Ng8OjQ4XBHSSd2KXIdvKgOJD.png")} // UTILISER USESELECTOR POUR DYNAMISER URL DE L'IMAGE
            style={tw`mt-12  h-25 w-25`}
          />
          <Text style={tw`text-4 font-bold opacity-70`}>Size :</Text>
          <Text style={tw`text-4  font-bold opacity-70`}>Frame :</Text>
          <Text style={tw`text-4  font-bold opacity-70`}>Finish :</Text>
        </View>
        <View style={tw` w-full  h-50 border-t-2 border-[#AFAFAF]`}>
          <Image
            source={require("../assets/img-Ng8OjQ4XBHSSd2KXIdvKgOJD.png")} // UTILISER USESELECTOR POUR DYNAMISER URL DE L'IMAGE
            style={tw`mt-12  h-25 w-25`}
          />
        </View>
        <View style={tw` w-full  h-50 border-t-2 border-[#AFAFAF]`}>
          <Image
            source={require("../assets/img-Ng8OjQ4XBHSSd2KXIdvKgOJD.png")} // UTILISER USESELECTOR POUR DYNAMISER URL DE L'IMAGE
            style={tw`mt-12  h-25 w-25`}
          />
        </View>
        <View>
          {/* <View
            style={tw`absolute mt-148 justify-center flex-row w-full pt-16`}>
            <TouchableOpacity
              style={tw` flex justify-center items-center bg-[#2C6DB4] rounded-1.75 h-15 w-[85%]  border-[#161E44]`}
              onPress={() => navigation.navigate("Cart")}>
              <Text style={tw`font-medium		 text-2xl text-[#FFFF]`}>
                Add to Cart
              </Text>
            </TouchableOpacity>
          </View> */}
        </View>
      </View>
    </View>
  );
}
