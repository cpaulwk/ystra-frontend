import {
  View,
  Text,
  Image,
  Keyboard,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import tw from "twrnc";
import React, { useEffect, useState } from "react";
import {
  addBasket,
  addToken,
  addTotal,
  addpayment,
  removeOrder,
} from "../reducers/order";
import { cleanBasket } from "../reducers/user";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { BACKEND_URL } from "@env";

export default function Basket({ navigation }) {
  const dispatch = useDispatch();
  const [selectedOptButton, setSelecteOptdButton] = useState("size");
  const [selectedSize, setselectedSize] = useState("S");
  const [selectedFrame, setselectedFrame] = useState("none");
  const [selectedFinish, setselectedFinish] = useState("none");
  const [canReturn, setCanReturn] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [name, setName] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cryptogram, setCryptogram] = useState("");
  const [selectedCard, setSelectedCard] = useState("");
  const products = useSelector((state) => state.product.products);

  const user = useSelector((state) => state.user.value);
  const order = useSelector((state) => state.order.value);
  const total = user.basket.reduce((accu, current) => accu + current.price, 0);

  const handleReturn = () => {
    setCanReturn(false);
    navigation.navigate("Adress");
  };

  const showDate = (date) => {
    if (date.length < 2) {
      return `${date.substring(0, 2)}/`;
    } else {
      return `${date.substring(0, 2)}/${date.substring(2)}`;
    }
  };

  const showCardNumber = (cardNumber) => {
    switch (true) {
      case cardNumber.length < 5:
        return cardNumber;

      case cardNumber.length < 9:
        return `${cardNumber.substring(0, 4)} ${cardNumber.substring(5, 9)}`;

      case cardNumber.length < 13:
        return `${cardNumber.substring(0, 4)} ${cardNumber.substring(
          5,
          9
        )} ${cardNumber.substring(8, 12)}`;

      default:
        return `${cardNumber.substring(0, 4)} ${cardNumber.substring(
          5,
          9
        )} ${cardNumber.substring(8, 12)} ${cardNumber.substring(13)}`;
    }
  };

  const initOrder = () => {
    dispatch(addBasket(user.basket));
    dispatch(addToken(user.token));

    const totalPrice = user.basket.reduce(
      (accu, current) => accu + current.price,
      0
    );
    dispatch(addTotal(totalPrice));
  };

  useEffect(() => {
    initOrder();
  }, []);

  const confirmOrder = async () => {
    if (!user.token) {
      return;
    }

    console.log("Kylian", order.token);
    fetch(`${BACKEND_URL}/orders/new`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(order),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("toto", data);
        if (data.result) {
          dispatch(removeOrder());
          dispatch(cleanBasket());

          navigation.navigate("OrderConfirmation");
        }
      });
  };

  let showImage = (
    <View>
      <Text>No selected item</Text>
    </View>
  );
  if (user.newItem) {
    showImage = (
      <View>
        <Image style={tw`h-60 w-60`} source={{ uri: user.newItem.url }} />
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={tw`flex-1 justify-between items-center`}>
        <TouchableOpacity
          style={tw`absolute flex justify-center items-center z-100 top-10 bottom-10 bg-[#AFAFAF] h-15 w-15 rounded-6 left-[5%] top-[7%] opacity-50`}
          onPress={() => handleReturn()}
        >
          <FontAwesome name="chevron-left" size={20} />
        </TouchableOpacity>
        <View style={styles.header}>
          <Text style={tw`text-6 font-bold opacity-70`}>Add payment</Text>
        </View>
        <View style={tw`flex-1 items-center w-full`}>
          {/* CREDIT CARD IMAGE */}
          <View
            style={tw`flex justify-end items-center w-95 h-60 rounded-5 bg-[#111827] pb-8 px-5 mt-5`}
          >
            <View style={tw`flex-row items-center w-full pl-7 mb-5`}>
              <Text style={tw`text-white text-7`}>
                {showCardNumber(cardNumber)}
              </Text>
            </View>
            <Text style={tw`text-white text-5 pl-7`}>
              {showDate(expirationDate)}
            </Text>
            <View style={tw`flex-row items-center w-full`}>
              <Text style={tw`text-white text-5`}>{name}</Text>
            </View>
            <View style={tw`absolute flex justify-end items-end h-full w-full`}>
              <Image
                style={
                  selectedCard == "visa"
                    ? tw`absolute h-11.88 w-21.17 bottom-3`
                    : tw`hidden`
                }
                source={require("../assets/visa-card.jpg")}
                resizeMode="cover"
              />
              <Image
                style={
                  selectedCard == "mastercard"
                    ? tw`absolute h-11.88 w-19.23 bottom-3`
                    : tw`hidden`
                }
                resizeMode="cover"
                source={require("../assets/mastercard.png")}
              />
            </View>
          </View>

          {/* TEXT FIELDS */}
          <View style={tw`my-10 w-[90%] my-5`}>
            <View style={tw`flex-row justify-between items-center`}>
              <View
                style={tw`flex-row justify-around items-center h-11.5 w-[45%] ml-3`}
              >
                <TouchableOpacity onPress={() => setSelectedCard("visa")}>
                  <Image
                    style={tw`h-8.42 w-15`}
                    source={require("../assets/visa-card.jpg")}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelectedCard("mastercard")}>
                  <Image
                    style={tw`h-9.27 w-15`}
                    source={require("../assets/mastercard.png")}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={tw`bg-[#2C6DB4] flex justify-center items-center h-11.5 w-[45%] rounded-2.5 text-4 `}
              >
                <Text style={tw`text-5 text-white font-medium `}>Paypal</Text>
              </TouchableOpacity>
            </View>
            <View style={tw`flex-row justify-end items-center mt-5`}>
              <TextInput
                placeholder="Card Number"
                value={cardNumber}
                style={tw`border border-[#9ca3af] bg-white p-3 pl-5 opacity-90 w-full rounded-2.5 text-4`}
                onChangeText={(value) => setCardNumber(value)}
                textContentType="creditCardNumber"
                maxLength={17}
              />
              <View
                style={tw`absolute border-l border-[#AFAFAF] flex justify-center items-center h-full aspect-square`}
              >
                <FontAwesome name="credit-card" size={20} />
              </View>
            </View>
            <View style={tw`flex-row justify-between items-center mt-5`}>
              <TextInput
                placeholder="Name"
                value={name}
                style={tw`border border-[#9ca3af] bg-white p-3 pl-5 opacity-90 w-full rounded-2.5 text-4 w-[45%]`}
                onChangeText={(value) => setName(value)}
              />
              <TextInput
                placeholder="Date"
                value={expirationDate}
                style={tw`border border-[#9ca3af] bg-white p-3 pl-5 opacity-90 w-full rounded-2.5 text-4 w-[25%]`}
                onChangeText={(value) => setExpirationDate(value)}
                keyboardType="numeric"
                maxLength={4}
              />
              <TextInput
                placeholder="CVC"
                value={cryptogram}
                style={tw`border border-[#9ca3af] bg-white p-3 pl-5 opacity-90 w-full rounded-2.5 text-4 w-[25%]`}
                onChangeText={(value) => setCryptogram(value)}
                keyboardType="numeric"
                maxLength={3}
              />
            </View>
          </View>
        </View>
        <View
          style={tw`flex-row bg-[#F4F3EE] justify-between w-[80%] rounded-2 border border-[#AFAFAF] p-5 mb-5`}
        >
          <Text style={tw`text-6 font-medium`}>Total:</Text>
          <Text style={tw`text-6 font-medium`}>{`${total}€`}</Text>
        </View>
        <View style={tw`flex-row justify-center w-full mb-[20%]`}>
          <TouchableOpacity
            style={tw` flex justify-center items-center bg-[#2C6DB4] rounded-1.75 h-15 w-[85%] border-[#161E44]`}
            onPress={() => confirmOrder()}
          >
            <Text style={tw`font-medium text-2xl text-[#FFFF]`}>
              Confirm payment
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
