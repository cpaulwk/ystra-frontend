import {
  ScrollView,
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
  const [choiceMode, setChoiceMode] = useState("ALL");
  const [listOrder, setListOrder] = useState([]);
  const [acccount, setAccount] = useState([]);

  const handleReturn = () => {
    setCanReturn(false);
    navigation.navigate("TabNavigator", { screen: "Gallery" });
  };
  const user = useSelector((state) => state.user.value);

  const BackAddress1 = "https://ystra-backend.vercel.app";
  const LoadORder = () => {
    console.log("LoadORder");
    fetch(`${BackAddress1}/orders/${user.token}`)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setListOrder(data.allOrders);
          console.log("ok", listOrder);
        }
      });
  };

  // const LoadOrder = () => {
  //   if (!user.token) {
  //     return;
  //   }
  //   const BackAddress = "http://192.168.10.173:3000";
  //   // const order = new FormData();
  //   // order.append("orders", user.basket[0].product);
  //   fetch(`${BackAddress}/orders/new`, {
  //     method: "POST",
  //     headers: { "Content-type": "application/json" },
  //     body: JSON.stringify(user),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("toto", user.basket);
  //     });
  //   navigation.navigate("TabNavigator", { screen: "Payment" });
  // };

  let showSetting = (
    <View style={tw`flex items-center w-full border-t border-[#AFAFAF]`}>
      <View style={tw`flex-row items-center py-5 w-[90%]`}>
        <View style={tw`w-[90%]`}>
          <View style={tw`flex-row items-center w-full`}>
            <Text style={tw`text-4 font-bold opacity-70 w-[50%]`}>
              My Account
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => handleAccount()}
          style={tw`border flex justify-center items-center bg-white opacity-70 rounded-50 w-8 h-8 pl-0.8 pt-0.2`}
        >
          <FontAwesome name="share-square-o" size={20} selectionColor="red" />
        </TouchableOpacity>
      </View>

      <View style={tw`flex-row items-center py-5 w-[90%]`}>
        <View style={tw`w-[90%]`}>
          <View style={tw`flex-row items-center w-full`}>
            <Text style={tw`text-4 font-bold opacity-70 w-[50%]`}>
              My Orders
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => handleOrder()}
          style={tw`border flex justify-center items-center bg-white opacity-70 rounded-50 w-8 h-8 pl-0.8 pt-0.2`}
        >
          <FontAwesome name="share-square-o" size={20} selectionColor="red" />
        </TouchableOpacity>
      </View>

      <View style={tw`flex-row items-center py-5 w-[90%]`}>
        <View style={tw`w-[90%]`}>
          <View style={tw`flex-row items-center w-full`}>
            <Text style={tw`text-4 font-bold opacity-70 w-[50%]`}>
              My Address
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={tw`border flex justify-center items-center bg-white opacity-70 rounded-50 w-8 h-8 pl-0.8 pt-0.2`}
        >
          <FontAwesome name="share-square-o" size={20} selectionColor="red" />
        </TouchableOpacity>
      </View>

      <View style={tw`flex-row items-center py-5 w-[90%]`}>
        <View style={tw`w-[90%]`}>
          <View style={tw`flex-row items-center w-full`}>
            <Text style={tw`text-4 font-bold opacity-70 w-[50%]`}>
              My Payement
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={tw`border flex justify-center items-center bg-white opacity-70 rounded-50 w-8 h-8 pl-0.8 pt-0.2`}
        >
          <FontAwesome name="share-square-o" size={20} selectionColor="red" />
        </TouchableOpacity>
      </View>

      <View style={tw`flex-row items-center py-5 w-[90%]`}>
        <View style={tw`w-[90%]`}>
          <View style={tw`flex-row items-center w-full`}>
            <Text style={tw`text-4 font-bold opacity-70 w-[50%]`}>
              My Credits
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={tw`border flex justify-center items-center bg-white opacity-70 rounded-50 w-8 h-8 pl-0.8 pt-0.2`}
        >
          <FontAwesome name="share-square-o" size={20} selectionColor="red" />
        </TouchableOpacity>
      </View>

      <View style={tw`flex-row items-center py-5 w-[90%]`}>
        <View style={tw`w-[90%]`}>
          <View style={tw`flex-row items-center w-full`}>
            <Text style={tw`text-4 font-bold opacity-70 w-[50%]`}>Help</Text>
          </View>
        </View>
        <TouchableOpacity
          style={tw`border flex justify-center items-center bg-white opacity-70 rounded-50 w-8 h-8 pl-0.8 pt-0.2`}
        >
          <FontAwesome name="share-square-o" size={20} selectionColor="red" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const handleOrder = () => {
    LoadORder();
    setChoiceMode("ORDER");
  };

  if (choiceMode === "ORDER") {
    const orderMap = listOrder.map((elem, index) => {
      return (
        <View key={index} style={tw`flex-row`}>
          <Text> {elem.orderNumber} </Text>
          <Text> {elem.purchaseDate} </Text>
        </View>
      );
    });

    showSetting = (
      <View style={tw`flex items-center w-full border-t border-[#AFAFAF]`}>
        <View style={tw`flex-row items-center py-5 w-[90%]`}>
          <View style={tw`w-[90%]`}>
            <View style={tw`flex-row items-center w-full`}>
              <Text style={tw`text-4 font-bold opacity-70 w-[50%]`}>
                My Orders
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => setChoiceMode("ALL")}
            style={tw`border flex justify-center items-center bg-white opacity-70 rounded-50 w-8 h-8 pl-0.8 pt-0.2`}
          >
            <FontAwesome name="share-square-o" size={20} selectionColor="red" />
          </TouchableOpacity>
        </View>

        {orderMap}
      </View>
    );
  }

  const handleAccount = () => {
    LoadAccount();
    setChoiceMode("ACCOUNT");
  };

  const LoadAccount = () => {
    fetch(`${BackAddress1}/users/${user.token}`)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setAccount(data.user);
          console.log("ok", listOrder);
        }
      });
  };

  if (choiceMode === "ACCOUNT") {
    const orderMap = (
      <View style={tw`flex-1`}>
        <Text> {acccount.username} </Text>
        <Text> {acccount.email} </Text>
        <Text> {acccount.password} </Text>
      </View>
    );

    showSetting = (
      <View style={tw`flex items-center w-full border-t border-[#AFAFAF]`}>
        <View style={tw`flex-row items-center py-5 w-[90%]`}>
          <View style={tw`w-[90%]`}>
            <View style={tw`flex-row items-center w-full`}>
              <Text style={tw`text-4 font-bold opacity-70 w-[50%]`}>
                My Account
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => setChoiceMode("ALL")}
            style={tw`border flex justify-center items-center bg-white opacity-70 rounded-50 w-8 h-8 pl-0.8 pt-0.2`}
          >
            <FontAwesome name="share-square-o" size={20} selectionColor="red" />
          </TouchableOpacity>
        </View>

        {orderMap}
      </View>
    );
  }

  return (
    <View
      style={tw`flex-1 justify-between items-center w-full h-full bg-[#F2EFEA] 	`}
    >
      <View style={styles.switch}>
        <View style={tw`flex-row justify-center items-center w-full`}>
          <Text
            style={tw`flex flex-row items-center text-6 font-bold opacity-70 mt-0 top-[-30%]`}
          >
            Setting
          </Text>
        </View>
      </View>

      <ScrollView style={tw`w-full bg-white`}>
        <View style={tw`flex items-center border-b border-[#AFAFAF]`}>
          {showSetting}
        </View>
      </ScrollView>
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
