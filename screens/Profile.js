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
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { logout } from "../reducers/user";
import { BACKEND_URL } from "@env";

export default function Adress({ navigation }) {
  console.log("backend =>", BACKEND_URL);
  const [canReturn, setCanReturn] = useState(false);
  const [choiceMode, setChoiceMode] = useState("ALL");
  const [listOrder, setListOrder] = useState([]);
  const [acccount, setAccount] = useState([]);
  const [headerTitle, setHeaderTitle] = useState("Settings");
  const dispatch = useDispatch();

  const handleReturn = () => {
    setHeaderTitle("Settings");
    setCanReturn(false);
    setChoiceMode("ALL");
  };

  const handleLogOut = () => {
    dispatch(logout());
    navigation.navigate("Welcome");
  };
  const user = useSelector((state) => state.user.value);


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
    <View style={tw`flex-1 items-center h-full w-full`}>
      <TouchableOpacity
        onPress={() => handleAccount()}
        style={tw`border-b border-[#AFAFAF] flex justify-center items-center h-[15%] w-full bg-white`}
      >
        <View style={tw`flex-row justify-between items-center w-[90%]`}>
          <Text style={tw`text-5 font-bold opacity-70 w-[50%] ml-5`}>
            My Account
          </Text>
          <View style={tw`flex-row justify-end items-center`}>
            <FontAwesome
              style={tw`mr-5`}
              name="user-circle-o"
              size={35}
              selectionColor="red"
            />
            <FontAwesome name="chevron-right" size={20} selectionColor="red" />
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handleOrder()}
        style={tw`border-b border-[#AFAFAF] flex justify-center items-center h-[15%] w-full bg-white`}
      >
        <View style={tw`flex-row justify-between items-center w-[90%]`}>
          <Text style={tw`text-5 font-bold opacity-70 w-[50%] ml-5`}>
            My Orders
          </Text>
          <View style={tw`flex-row justify-end items-center`}>
            <FontAwesome
              style={tw`mr-5`}
              name="file-text-o"
              size={35}
              selectionColor="red"
            />
            <FontAwesome name="chevron-right" size={20} selectionColor="red" />
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={tw`border-b border-[#AFAFAF] flex justify-center items-center h-[15%] w-full bg-white`}
      >
        <View style={tw`flex-row justify-between items-center w-[90%]`}>
          <Text style={tw`text-5 font-bold opacity-70 w-[50%] ml-5`}>
            My Address
          </Text>
          <View style={tw`flex-row justify-end items-center`}>
            <FontAwesome
              style={tw`mr-5`}
              name="home"
              size={35}
              selectionColor="red"
            />
            <FontAwesome name="chevron-right" size={20} selectionColor="red" />
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={tw`border-b border-[#AFAFAF] flex justify-center items-center h-[15%] w-full bg-white`}
      >
        <View style={tw`flex-row justify-between items-center w-[90%]`}>
          <Text style={tw`text-5 font-bold opacity-70 w-[50%] ml-5`}>
            My Payment
          </Text>
          <View style={tw`flex-row justify-end items-center`}>
            <FontAwesome
              style={tw`mr-5`}
              name="credit-card"
              size={35}
              selectionColor="red"
            />
            <FontAwesome name="chevron-right" size={20} selectionColor="red" />
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={tw`border-b border-[#AFAFAF] flex justify-center items-center h-[15%] w-full bg-white`}
      >
        <View style={tw`flex-row justify-between items-center w-[90%]`}>
          <Text style={tw`text-5 font-bold opacity-70 w-[50%] ml-5`}>
            My Credits
          </Text>
          <View style={tw`flex-row justify-end items-center`}>
            <FontAwesome5
              style={tw`mr-5`}
              name="coins"
              size={35}
              selectionColor="red"
            />
            <FontAwesome name="chevron-right" size={20} selectionColor="red" />
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={tw`border-b border-[#AFAFAF] flex justify-center items-center h-[15%] w-full bg-white`}
      >
        <View style={tw`flex-row justify-between items-center w-[90%]`}>
          <Text style={tw`text-5 font-bold opacity-70 w-[50%] ml-5`}>Help</Text>
          <View style={tw`flex-row justify-end items-center`}>
            <FontAwesome
              style={tw`mr-5`}
              name="question-circle-o"
              size={35}
              selectionColor="red"
            />
            <FontAwesome name="chevron-right" size={20} selectionColor="red" />
          </View>
        </View>
      </TouchableOpacity>
      <View style={tw`flex-1 justify-center items-center w-full`}>
        <TouchableOpacity
          onPress={() => handleLogOut()}
          style={tw`border-2 border-[#BA0000] flex justify-center items-center h-12 rounded-2`}
        >
          <Text style={tw`text-5 text-[#BA0000] font-bold opacity-70 px-8`}>
            Log out
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const handleOrder = () => {
    setHeaderTitle("My Orders");
    LoadOrder();
    setChoiceMode("ORDER");
    setCanReturn(true);
  };

  const LoadOrder = () => {
    console.log("LoadOrder");
    fetch(`${BACKEND_URL}/orders/all/${user.token}`)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setListOrder(data.allOrders);
          console.log("listOrder =>", listOrder);
        }
      });
  };

  if (choiceMode === "ORDER") {
    const orderMap = listOrder.map((elem, index) => {
      const orderDate = elem.purchaseDate.slice(0, 10);
      // {elem.orderNumber}
      // {elem.purchaseDate}
      // {elem.totalPrice}
      return (
        <TouchableOpacity
          key={index}
          style={tw`border-b border-[#AFAFAF] flex-row justify-between items-center h-20 w-full bg-white px-5`}
        >
          <View style={tw`flex-row items-center h-full py-3`}>
            <View style={tw`flex justify-between h-full`}>
              <Text style={tw`text-4.5 font-bold opacity-70`}>Order:</Text>
              <Text style={tw`text-4.5 font-bold opacity-70`}>Date:</Text>
            </View>
            <View style={tw`flex justify-between h-full ml-2`}>
              <Text style={tw`text-4.5 font-bold opacity-50 mr-5`}>
                {elem.orderNumber}
              </Text>
              <Text style={tw`text-4.5 font-bold opacity-50 mr-5`}>
                {orderDate}
              </Text>
            </View>
          </View>
          <View style={tw`flex-row justify-end items-center`}>
            <Text style={tw`text-4.5 font-bold text-[#76CA66] mr-5`}>
              {elem.totalPrice}€
            </Text>
            <FontAwesome name="chevron-right" size={17} selectionColor="red" />
          </View>
        </TouchableOpacity>
      );
    });

    showSetting = (
      <ScrollView style={tw`h-full w-full`}>
        <View style={tw`flex items-center h-full w-full`}>{orderMap}</View>
      </ScrollView>
    );
  }

  const handleAccount = () => {
    setHeaderTitle("My Account");
    LoadAccount();
    setChoiceMode("ACCOUNT");
    setCanReturn(true);
  };

  const LoadAccount = () => {
    fetch(`${BACKEND_URL}/users/infos/${user.token}`)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setAccount(data.user);
          console.log("data.user =>", data.user);
        }
      });
  };

  if (choiceMode === "ACCOUNT") {
    // const orderMap = (
    //   <View style={tw`border h-30 w-full`}>
    //     <Text> {acccount.username} </Text>
    //     <Text> {acccount.email} </Text>
    //     <Text> {acccount.password} </Text>
    //   </View>
    // );

    const safePassword = () => {
      return "**********";
    };

    showSetting = (
      <View style={tw`border flex items-center h-full w-full`}>
        <TouchableOpacity
          onPress={() => handleAccount()}
          style={tw`border-b border-[#AFAFAF] flex justify-center items-center h-[8%] w-full bg-white`}
        >
          <View style={tw`flex-row justify-between items-center w-[90%]`}>
            <Text style={tw`text-4.5 font-bold opacity-70 w-[50%] `}>
              Username
            </Text>
            <View style={tw`flex-row justify-end items-center`}>
              <Text style={tw`text-4.5 opacity-50 mr-5`}>
                {acccount.username}
              </Text>
              <FontAwesome
                name="chevron-right"
                size={17}
                selectionColor="red"
              />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleAccount()}
          style={tw`border-b border-[#AFAFAF] flex justify-center items-center h-[8%] w-full bg-white`}
        >
          <View style={tw`flex-row justify-between items-center w-[90%]`}>
            <Text style={tw`text-4.5 font-bold opacity-70 w-[50%] `}>
              Email
            </Text>
            <View style={tw`flex-row justify-end items-center`}>
              <Text style={tw`text-4.5 opacity-50 mr-5`}>{acccount.email}</Text>
              <FontAwesome
                name="chevron-right"
                size={17}
                selectionColor="red"
              />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleAccount()}
          style={tw`border-b border-[#AFAFAF] flex justify-center items-center h-[8%] w-full bg-white`}
        >
          <View style={tw`flex-row justify-between items-center w-[90%]`}>
            <Text style={tw`text-4.5 font-bold opacity-70 w-[50%] `}>
              Password
            </Text>
            <View style={tw`flex-row justify-end items-center`}>
              <Text style={tw`text-4.5 opacity-50 mr-5`}>{safePassword()}</Text>
              <FontAwesome
                name="chevron-right"
                size={17}
                selectionColor="red"
              />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleAccount()}
          style={tw`border-t border-b border-[#AFAFAF] flex justify-center items-center h-[8%] w-full bg-white mt-5`}
        >
          <Text style={tw`text-4.5 text-[#BA0000] font-bold opacity-70`}>
            Delete account
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View
      style={tw`flex-1 justify-between items-center w-full h-full bg-[#F2EFEA] 	`}
    >
      {canReturn && (
        <TouchableOpacity
          style={tw`absolute flex justify-center items-center z-100 top-10 bottom-10 bg-[#AFAFAF] h-15 w-15 rounded-6 left-[5%] top-[7%] opacity-50`}
          onPress={() => handleReturn()}
        >
          <FontAwesome name="chevron-left" size={20} />
        </TouchableOpacity>
      )}
      <View style={styles.header}>
        <Text style={tw`text-6 font-bold opacity-70`}>{headerTitle}</Text>
      </View>
      {showSetting}
    </View>
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
