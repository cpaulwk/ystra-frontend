import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import tw from "twrnc";
import React, { useState } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function Adress({ navigation }) {
  const [canReturn, setCanReturn] = useState(false);
  const handleReturn = () => {
    setCanReturn(false);
    navigation.navigate("TabNavigator", { screen: "Gallery" });
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
        console.log("toto", user.basket);
      });
    navigation.navigate("TabNavigator", { screen: "Payment" });
  };
  return (
    <View
      style={tw`flex-1 justify-between items-center w-full h-full bg-[#F2EFEA] 	`}
    >
      <View style={styles.switch}>
        <View style={tw`flex-row justify-center items-center w-full`}>
          <Text
            style={tw`flex flex-row items-center text-6 font-bold opacity-70 mt-0 top-[-30%]`}
          >
            My Account{" "}
          </Text>
        </View>
      </View>
      <View style={tw`flex items-center w-full px-[1%] bg-[#F2EFEA]	`}>
        <View style={tw`flex items-center mt-4.5 w-[87%]`}>
          <View style={tw`flex-row items-center mt-5 mb-2  `}>
            <TextInput
              placeholder="Street name"
              value={streetName}
              style={tw`border border-[#9ca3af] bg-white p-3 pl-13 opacity-90 w-full rounded-2.5 text-4`}
              onChangeText={(value) => setStreetName(value)}
            />
          </View>
          <View style={tw`flex-row items-center mt-5 mb-2 `}>
            <TextInput
              placeholder="Additional address information"
              value={streetName2}
              style={tw`border border-[#9ca3af] bg-white p-3 pl-13 opacity-90 w-full rounded-2.5 text-4`}
              onChangeText={(value) => setStreetName2(value)}
            />
          </View>
          <View style={tw`flex-row items-center mt-5 mb-2`}>
            <TextInput
              placeholder="State"
              value={state}
              style={tw`border border-[#9ca3af] bg-white p-3 pl-13 opacity-90 w-full rounded-2.5 text-4`}
              onChangeText={(value) => setState(value)}
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
      <View style={tw`flex items-center mb-[10%] w-full px-[1%] 	`}>
        <TouchableOpacity
          style={tw`flex justify-center items-center bg-black rounded-1.75 opacity-90 h-13 w-[110%] mb-15 bg-[#F2EFEA] 
          border-b-2 border-[#AFAFAF] border-t-2`}
          onPress={() => handleOrder()}
        >
          <Text style={tw`text-4 text-red-600 font-semibold  `}>
            Delete account
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    height: "100%",
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
  switch: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#F2EFEA",
    paddingBottom: 20,
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
