import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import tw from "twrnc";
import React, { useState } from "react";

export default function Adress({ navigation }) {
  const user = useSelector((state) => state.user.value);
  const [adressInput, setsAdressInput] = useState({
    firstName: "",
    lastName: "",
    streetName: "",
    streetName2: "",
    city: "",
    zipCode: "",
    state: "",
    country: "",
    offer: false,
  });
  const handleOrder = () => {
    if (!user.token) {
      return;
    }
    const BackAddress = "http://192.168.10.173:3000";
    // const order = new FormData();
    // order.append("orders", user.basket[0].product);
    fetch(`${BackAddress}/orders/new`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("toto", data);
      });
  };
  return (
    <View style={tw`flex-1 justify-between items-center w-full h-full`}>
      {/* Text and Fields */}
      <View style={tw`flex items-center w-full px-[1%]`}>
        <Text
          style={tw`flex flex-row items-center text-10 font-bold opacity-70 mt-7.5`}
        >
          Keep your own art
        </Text>
        <View style={tw`flex items-center mt-4.5 w-[90%]`}>
          <View style={tw`flex-row items-center mt-5 mb-2`}>
            <TextInput
              placeholder="firstName"
              value={adressInput.firstName}
              style={tw`border border-[#9ca3af] bg-white p-3 pl-13 opacity-90 w-full rounded-2.5 text-4`}
            />
          </View>
          <View style={tw`flex-row items-center mt-5 mb-2`}>
            <TextInput
              placeholder="lastName"
              value={adressInput.lastName}
              style={tw`border border-[#9ca3af] bg-white p-3 pl-13 opacity-90 w-full rounded-2.5 text-4`}
            />
          </View>
          <View style={tw`flex-row items-center mt-5 mb-2`}>
            <TextInput
              placeholder="streetName"
              value={adressInput.streetName}
              style={tw`border border-[#9ca3af] bg-white p-3 pl-13 opacity-90 w-full rounded-2.5 text-4`}
            />
          </View>
          <View style={tw`flex-row items-center mt-5 mb-2`}>
            <TextInput
              placeholder="streetName2"
              value={adressInput.streetName2}
              style={tw`border border-[#9ca3af] bg-white p-3 pl-13 opacity-90 w-full rounded-2.5 text-4`}
            />
          </View>
          <View style={tw`flex-row w-100`}>
            <View style={tw`flex-row items-center mt-5 mb-2 w-40`}>
              <TextInput
                placeholder="city"
                value={adressInput.city}
                style={tw`border border-[#9ca3af] bg-white p-3 pl-13 opacity-90 w-full rounded-2.5 text-4`}
              />
            </View>
            <View style={tw`flex-row items-center mt-5 mb-2 w-40`}>
              <TextInput
                placeholder="zipCode"
                value={adressInput.zipCode}
                style={tw`border border-[#9ca3af] bg-white p-3 pl-13 opacity-90 w-full rounded-2.5 text-4`}
              />
            </View>
          </View>
          <View style={tw`flex-row items-center mt-5 mb-2`}>
            <TextInput
              placeholder="state"
              value={adressInput.state}
              style={tw`border border-[#9ca3af] bg-white p-3 pl-13 opacity-90 w-full rounded-2.5 text-4`}
            />
          </View>
          <View style={tw`flex-row items-center mt-5 mb-2`}>
            <TextInput
              placeholder="country"
              value={adressInput.country}
              style={tw`border border-[#9ca3af] bg-white p-3 pl-13 opacity-90 w-full rounded-2.5 text-4`}
            />
          </View>

          {/* <View style={tw`flex-row items-center w-full h-7`}>
            {isBadUserInput && (
              <Text style={tw`text-4 text-[#BA0000]`}>{errorMessage}</Text>
            )}
          </View> */}
        </View>
      </View>

      {/* Buttons */}
      <View style={tw`flex items-center mb-[20%] w-full px-[1%]`}>
        <TouchableOpacity
          style={tw`flex justify-center items-center bg-black rounded-1.75 opacity-90 h-13 w-[90%] mb-15`}
          onPress={() => handleOrder()}
        >
          <Text style={tw`text-4 text-white font-semibold`}>
            Confirm Adress
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
