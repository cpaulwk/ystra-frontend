import { useStripe, StripeProvider } from "@stripe/stripe-react-native";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import tw from "twrnc";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { removeBasketItem } from "../reducers/user";
import ButtonWithText from "../components/uikit/ButtonWithText";
import ReturnButton from "../components/uikit/ReturnButton";
import { BACKEND_URL } from "@env";
import { removeOrder } from "../reducers/order";
import { cleanBasket } from "../reducers/user";
import { useState, useEffect } from "react";

export default function OrderSummary({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const order = useSelector((state) => state.order.value);
  const total = user.basket.reduce((accu, current) => accu + current.price, 0);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [canReturn, setCanReturn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState("1");
  const [openModal, setOpenModal] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  console.log("Boucif --->", user.basket);

  const handleReturn = () => {
    setCanReturn(false);
    navigation.navigate("Adress");
  };

  const handleDelete = (index) => {
    dispatch(removeBasketItem(index));
  };

  const changeQuantity = () => {
    setQuantity("1");
    setOpenModal(true);
  };

  const confirmOrder = async () => {
    if (!user.token) {
      return;
    }

    navigation.navigate("OrderConfirmation");
    return;

    // Dispatch order to the redux store in Gallery and Home (results)
    fetch(`${BACKEND_URL}/orders/new`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(order),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("toto", data);
        if (data.result) {
          console.log("data =>", data);
          console.log("I got here");
          dispatch(removeOrder());
          dispatch(cleanBasket());

          navigation.navigate("OrderConfirmation");
        }
      });
  };

  const handleSelectedQuantity = (value) => {
    console.log(value);
    setQuantity(value);
    setOpenModal(false);
  };

  const quantityList = (number) => {
    let newList = [];
    for (let i = 1; i <= number; i++) {
      newList.push(
        <TouchableOpacity
          activeOpacity={1}
          style={tw`flex items-center border-t border-[#AFAFAF] w-full py-2`}
          onPress={() => handleSelectedQuantity(i)}
        >
          <Text style={tw`text-4 font-medium opacity-70`}>{i}</Text>
        </TouchableOpacity>
      );
    }
    return newList;
  };
  // MAP
  const showCart = user.basket.map((element, index) => {
    console.log("ok", element);

    // Order item component
    return (
      <View
        key={index}
        style={tw`flex items-center w-full border-t border-[#AFAFAF]`}
      >
        <View style={tw`flex-row justify-between items-center w-[90%]`}>
          <View style={tw`flex-row grow items-center h-full`} key={index}>
            <Image
              style={tw`h-25 w-25 mr-5 my-5`}
              source={{ uri: element.url }}
            />
            <View style={tw`flex justify-between h-full`}>
              <View style={tw`flex w-[60%] justify-between mt-5`}>
                <View style={tw`flex-row items-center w-full`}>
                  <Text style={tw`text-4 font-bold opacity-70 w-[50%]`}>
                    Size :
                  </Text>
                  <Text style={tw`text-4 font-medium opacity-70 w-[50%]`}>
                    {element.product.size.name}
                  </Text>
                </View>
                <View style={tw`flex-row items-center w-full`}>
                  <Text style={tw`text-4 font-bold opacity-70 w-[50%]`}>
                    Frame :
                  </Text>
                  <Text style={tw`text-4 font-medium opacity-70 w-[50%]`}>
                    {element.product.frame.name}
                  </Text>
                </View>
                <View style={tw`flex-row items-center w-full`}>
                  <Text style={tw`text-4 font-bold opacity-70 w-[50%]`}>
                    Finish :
                  </Text>
                  <Text style={tw`text-4 font-medium opacity-70 w-[50%]`}>
                    {element.product.finish.name}
                  </Text>
                </View>
                <View style={tw`flex-row items-center w-full`}>
                  <Text style={tw`text-4 font-bold opacity-70 w-[50%]`}>
                    Price :
                  </Text>
                  <Text style={tw`text-4 font-medium opacity-70 w-[50%]`}>
                    {element.price}€
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={tw`border flex-row justify-between items-center h-[8] w-[23] bg-white rounded-2 my-2`}
                onPress={changeQuantity}
              >
                <View style={tw`flex-row pl-2`}>
                  <Text style={tw`text-4 font-bold opacity-70`}>Qty: </Text>
                  <Text style={tw`text-4 font-medium opacity-70`}>
                    {quantity}
                  </Text>
                </View>
                <FontAwesome
                  style={tw`pr-2`}
                  name="chevron-down"
                  size={15}
                  color="black"
                />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            style={tw` flex justify-center items-center bg-red-700 rounded-4 h-[7.5] w-[7.5] border-[#161E44] mx-0	  `}
            onPress={() => handleDelete(index)}
            // onPress={() => navigation.navigate("Adress")}
          >
            <FontAwesome
              style={tw`pl-0.5`}
              name="times"
              size={20}
              color="white"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
    // return (
    //   <View
    //     key={index}
    //     style={tw`flex items-center w-full border-t border-[#AFAFAF]`}
    //   >
    //     <View
    //       style={tw`border flex-row justify-between items-center py-5 w-[90%]`}
    //     >
    //       <View style={tw`flex-row grow items-center`} key={index}>
    //         <Image style={tw`h-25 w-25 mr-5`} source={{ uri: element.url }} />
    //         <View style={tw`w-[35%]`}>
    //           <View style={tw`flex-row items-center w-full`}>
    //             <Text style={tw`text-4 font-bold opacity-70 w-[50%]`}>
    //               Size :
    //             </Text>
    //             <Text style={tw`text-4 font-medium opacity-70 w-[50%]`}>
    //               {element.product.size.name}
    //             </Text>
    //           </View>
    //           <View style={tw`flex-row items-center w-full`}>
    //             <Text style={tw`text-4 font-bold opacity-70 w-[50%]`}>
    //               Frame :
    //             </Text>
    //             <Text style={tw`text-4 font-medium opacity-70 w-[50%]`}>
    //               {element.product.frame.name}
    //             </Text>
    //           </View>
    //           <View style={tw`flex-row items-center w-full`}>
    //             <Text style={tw`text-4 font-bold opacity-70 w-[50%]`}>
    //               Finish :
    //             </Text>
    //             <Text style={tw`text-4 font-medium opacity-70 w-[50%]`}>
    //               {element.product.finish.name}
    //             </Text>
    //           </View>
    //           <View style={tw`flex-row items-center w-full`}>
    //             <Text style={tw`text-4 font-bold opacity-70 w-[50%]`}>
    //               Total :
    //             </Text>
    //             <Text style={tw`text-4 font-medium opacity-70 w-[50%]`}>
    //               {element.price}€
    //             </Text>
    //           </View>
    //         </View>
    //       </View>
    //       <TouchableOpacity
    //         style={tw` flex justify-center items-center bg-red-700 rounded-4 h-[7.5] w-[7.5] border-[#161E44] mx-0	  `}
    //         onPress={() => handleDelete(index)}
    //         // onPress={() => navigation.navigate("Adress")}
    //       >
    //         <FontAwesome
    //           style={tw`pl-0.5`}
    //           name="times"
    //           size={20}
    //           color="white"
    //         />
    //       </TouchableOpacity>
    //     </View>
    //   </View>
    // );
  });

  const API_URL = `${BACKEND_URL}/payement`;

  const fetchPaymentSheetParams = async () => {
    console.log("URL", `${BACKEND_URL}/payement`);
    const response = await fetch(`${API_URL}/payment-sheet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: total * 100,
        email: user.email,
      }),
    });

    console.log("response --->");
    const { paymentIntent, ephemeralKey, customer } = await response.json();
    console.log("response --->", paymentIntent, ephemeralKey, customer);
    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };

  const initializePaymentSheet = async () => {
    const { paymentIntent, ephemeralKey, customer, publishableKey } =
      await fetchPaymentSheetParams();

    console.log("publishableKey", ephemeralKey, publishableKey);
    console.log("customer", customer);

    const { error } = await initPaymentSheet({
      merchantDisplayName: "Ystra, Inc.",
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: "Jane Doe",
      },
    });
    if (!error) {
      // The Proceed to payment button is activated
      // setActiveButtonColor("blue");
      setLoading(true);
    }
  };

  const openPaymentSheet0 = async () => {
    // see below
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      console.log(`Error code: ${error.code}`, error.message);
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      console.log("Success", "Your order is confirmed!");
      Alert.alert("Success", "Your order is confirmed!");
      navigation.navigate("OrderConfirmation");
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);
  return (
    <StripeProvider publishableKey="pk_test_51Ma3OsFo81GGwjYJ2jgvbWDBVfs1qDX95WhLoTvTQ3Fx5CAgCgTmfpWpzU2L0RdZUWvbExD5CnMVXno9vxfGYmAA001xlVdXRt">
      <View style={tw`flex-1 bg-[#F2EFEA] items-center`}>
        <ReturnButton withHeader={true} onPress={handleReturn} />
        <View style={styles.header}>
          <Text style={tw`text-6 font-bold opacity-70`}>Order Summary</Text>
        </View>
        <ScrollView style={tw`w-full bg-white`}>
          <View style={tw`flex items-center border-b border-[#AFAFAF]`}>
            {showCart}
          </View>
        </ScrollView>

        <View style={tw`w-[80%] mt-5`}>
          <View
            style={tw`flex-row bg-[#F4F3EE] justify-between rounded-2 border border-[#AFAFAF] mb-5 p-5`}
          >
            <Text style={tw`text-6 font-medium`}>Total:</Text>
            <Text style={tw`text-6 font-medium`}>{`${total}€`}</Text>
          </View>
          <View style={tw`flex-row justify-center pb-[10%]`}>
            <ButtonWithText
              color="[#2C6DB4]"
              disabled={!loading}
              onPress={openPaymentSheet}
              text="Proceed to payment"
            />
          </View>
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
      {openModal && (
        <View
          style={tw`absolute flex justify-center items-center w-full h-full`}
        >
          <TouchableWithoutFeedback onPress={() => setOpenModal(false)}>
            <View style={tw`absolute w-full h-full bg-black opacity-70`}></View>
          </TouchableWithoutFeedback>
          <View
            style={tw`flex h-[70%] w-[40%] items-center bg-white rounded-4 py-2`}
          >
            <Text style={tw`mb-2 text-4 font-bold opacity-70`}>Quantity</Text>
            <ScrollView style={tw`w-full`}>
              <View style={tw`flex items-center`}>{quantityList(5)}</View>
            </ScrollView>
          </View>
        </View>
      )}
    </StripeProvider>
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
