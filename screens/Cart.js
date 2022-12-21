import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import tw from "twrnc";
import React, { useState } from "react";

export default function Basket({ navigation }) {
  const user = useSelector((state) => state.user.value);
  console.log("Boucif --->", user.basket);
  const showCart = user.basket.map((element, index) => {
    console.log("ok", element);
    return (
      <View style={tw`border flex-row items-center py-5`} key={index}>
        <Image style={tw`h-25 w-25`} source={{ uri: element.url }} />
        <View>
          <Text style={tw`text-4 font-bold opacity-70`}>
            Size : {element.product.size.name}
          </Text>
          <Text style={tw`text-4  font-bold opacity-70`}>
            Frame {element.product.frame.name}:
          </Text>
          <Text style={tw`text-4  font-bold opacity-70`}>
            Finish {element.product.finish.name}:
          </Text>
        </View>
        <Text style={tw`text-4  font-bold opacity-70`}>
          Total {element.price}:
        </Text>
      </View>
    );
  });
  return (
    <View style={tw`flex-1 bg-[#F2EFEA]`}>
      <View style={tw`flex justify-center items-center `}>
        <View style={tw`flex items-center mt-[35%]`}>
          <Text style={tw`text-12 mb-[10%] font-bold opacity-70`}>
            Buy Prints
          </Text>
        </View>
        <ScrollView>
          <View style={tw`w-80  h-80 border-t-2 border-[#AFAFAF]`}>
            {showCart}
          </View>
        </ScrollView>

        <View style={tw`absolute justify-center flex-row w-full`}>
          <TouchableOpacity
            style={tw` flex justify-center items-center bg-[#2C6DB4] rounded-1.75 h-15 w-[85%] mt-200 border-[#161E44]`}
            onPress={() => navigation.navigate("Adress")}>
            <Text style={tw`font-medium	 text-2xl text-[#FFFF]`}>
              {`PAY : ${user.basket.reduce(
                (accu, current) => accu + current.price,
                0
              )}€`}
            </Text>
          </TouchableOpacity>
        </View>
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
  );
}
