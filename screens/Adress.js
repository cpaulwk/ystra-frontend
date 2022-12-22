import {
  Keyboard,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Switch,
  ScrollView,
  TextInput,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import tw from "twrnc";
import React, { useState } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { addAdress } from "../reducers/order";

export default function Adress({ navigation }) {
  const dispatch = useDispatch();
  const [canReturn, setCanReturn] = useState(false);
  const handleReturn = () => {
    setCanReturn(false);
    navigation.navigate("Cart");
  };
  const user = useSelector((state) => state.user.value);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [streetName, setStreetName] = useState("");
  const [streetName2, setStreetName2] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");

  const handleAdress = () => {
    const deliveryAdress = {
      addressName: `${firstName} ${lastName}`,
      street: streetName,
      zipCode: zipCode,
      city: city,
      state: state,
      country: country,
      phoneNumber: "",
      isForBilling: false,
      isForDelivery: true,
      isDefault: false,
      isDeleted: false,
    };
    dispatch(addAdress(deliveryAdress));

    navigation.navigate("CreditCards");
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View
        style={tw`flex-1 justify-between items-center w-full h-full bg-[#F2EFEA] 	`}
      >
        <TouchableOpacity
          style={tw`absolute flex justify-center items-center z-100 top-10 bottom-10 bg-[#AFAFAF] h-15 w-15 rounded-6 left-[5%] top-[8%] opacity-50`}
          onPress={() => handleReturn()}
        >
          <FontAwesome name="chevron-left" size={20} />
        </TouchableOpacity>
        <View style={styles.header}>
          <View style={tw`flex-row justify-center items-center w-full`}>
            <Text style={tw`text-6 font-bold opacity-70`}>
              Shipping Address
            </Text>
          </View>
        </View>
        <View style={tw`flex items-center w-full px-[1%] bg-[#F2EFEA]	`}>
          <View style={tw`flex items-center w-[90%]`}>
            <View style={tw`flex-row justify-between w-full`}>
              <View style={tw`flex-row items-center w-[45%]`}>
                <TextInput
                  placeholder="Firstname  "
                  value={firstName}
                  style={tw`border border-[#9ca3af] bg-white p-3 pl-5 opacity-90 w-full rounded-2.5 text-4`}
                  onChangeText={(value) => setFirstName(value)}
                />
              </View>
              <View style={tw`flex-row items-center w-[45%]`}>
                <TextInput
                  placeholder="Lastname"
                  value={lastName}
                  style={tw`border border-[#9ca3af] bg-white p-3 pl-5 opacity-90 w-full rounded-2.5 text-4`}
                  onChangeText={(value) => setLastName(value)}
                />
              </View>
            </View>

            <View style={tw`flex-row items-center mt-7`}>
              <TextInput
                placeholder="Street name"
                value={streetName}
                style={tw`border border-[#9ca3af] bg-white p-3 pl-5 opacity-90 w-full rounded-2.5 text-4`}
                onChangeText={(value) => setStreetName(value)}
              />
            </View>
            <View style={tw`flex-row items-center mt-7`}>
              <TextInput
                placeholder="Additional address information"
                value={streetName2}
                style={tw`border border-[#9ca3af] bg-white p-3 pl-5 opacity-90 w-full rounded-2.5 text-4`}
                onChangeText={(value) => setStreetName2(value)}
              />
            </View>
            <View style={tw`flex-row justify-between items-center w-full mt-7`}>
              <View style={tw`flex-row items-center w-[45%]`}>
                <TextInput
                  placeholder="City"
                  value={city}
                  style={tw`border border-[#9ca3af] bg-white p-3 pl-5 opacity-90 w-full rounded-2.5  text-4`}
                  onChangeText={(value) => setCity(value)}
                />
              </View>
              <View style={tw`flex-row items-center w-[45%]`}>
                <TextInput
                  placeholder="Zip code"
                  value={zipCode}
                  style={tw`border border-[#9ca3af] bg-white p-3 pl-5 opacity-90 w-full rounded-2.5 text-4`}
                  onChangeText={(value) => setZipCode(value)}
                  keyboardType="numeric"
                />
              </View>
            </View>
            <View style={tw`flex-row items-center mt-7`}>
              <TextInput
                placeholder="State"
                value={state}
                style={tw`border border-[#9ca3af] bg-white p-3 pl-5 opacity-90 w-full rounded-2.5 text-4`}
                onChangeText={(value) => setState(value)}
              />
            </View>
            <View style={tw`flex-row items-center mt-7`}>
              <TextInput
                placeholder="Country"
                value={country}
                style={tw`border border-[#9ca3af] bg-white p-3 pl-5 opacity-90 w-full rounded-2.5 text-4`}
                onChangeText={(value) => setCountry(value)}
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
        <View style={tw`flex-row justify-center w-full mb-[20%]`}>
          <TouchableOpacity
            style={tw` flex justify-center items-center bg-[#2C6DB4] rounded-1.75 h-15 w-[85%]  border-[#161E44]`}
            onPress={() => handleAdress()}
          >
            <Text style={tw`font-medium text-2xl text-[#FFFF]`}>
              Confirm address
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
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
