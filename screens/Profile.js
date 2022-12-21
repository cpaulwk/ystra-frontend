import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import tw from "twrnc";
import React, { useEffect, useState } from "react";
import { addBasketItem } from "../reducers/user";
import FontAwesome from "react-native-vector-icons/FontAwesome";
export default function Profile() {
  return (
    <View style={tw`h-full w-full border-[1.5px] border-[#161E44]`}>
      <View>
        <View style={tw`flex-row items-center mt-5 mb-2`}>
          <TextInput
            placeholder="lastName"
            //   value={}
            style={tw`border border-[#9ca3af] bg-white p-3 pl-13 opacity-90 w-full rounded-2.5 text-4`}
          />
        </View>
        <View style={tw`flex-row items-center mt-5 mb-2`}>
          <TextInput
            placeholder="streetName"
            //   value={}
            style={tw`border border-[#9ca3af] bg-white p-3 pl-13 opacity-90 w-full rounded-2.5 text-4`}
          />
        </View>
        <View style={tw`flex-row items-center mt-5 mb-2`}>
          <TextInput
            placeholder="streetName2"
            //   value={}
            style={tw`border border-[#9ca3af] bg-white p-3 pl-13 opacity-90 w-full rounded-2.5 text-4`}
          />
        </View>
      </View>
    </View>
  );
}
