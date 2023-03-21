import { useStripe, StripeProvider } from "@stripe/stripe-react-native";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import ButtonWithText from "../components/uikit/ButtonWithText";
import Header from "../components/uikit/Header";
import CartItem from "../components/uikit/CartItem";
import ModalQuantityList from "../components/uikit/ModalQuantityList";
import { BACKEND_URL } from "@env";
import { removeOrder } from "../reducers/order";
import {
  changeItem,
  changeItemQuantity,
  cleanBasket,
  removeBasketItem,
  previousScreen,
} from "../reducers/user";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function OrderSummary({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const order = useSelector((state) => state.order.value);
  const total = user.basket.reduce(
    (accu, current) => accu + current.price * current.quantity,
    0
  );
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [canReturn, setCanReturn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState("1");
  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    if (!total || !user.basket) {
      setLoading(false);
    } else {
      setLoading(true);
    }
    reloadPaymentSheet();
  }, [total]);

  const handleReturn = () => {
    setCanReturn(false);
    navigation.navigate("Adress");
  };

  const handleDelete = (index) => {
    dispatch(removeBasketItem(index));
  };

  const handleEdit = (itemId, itemUrl) => {
    const targetItemInfo = user.basket.find(
      (item) => item.imageResult_id === itemId
    );
    const itemToChange = {
      imageResult_id: itemId,
      url: itemUrl,
      price: targetItemInfo.price,
      product: {
        size: targetItemInfo.product.size,
        finish: targetItemInfo.product.finish,
        frame: targetItemInfo.product.frame,
      },
      quantity: targetItemInfo.quantity,
    };
    dispatch(changeItem(itemToChange));
    dispatch(previousScreen("OrderSummary"));
    navigation.navigate("Basket");
  };

  const changeQuantity = (image) => {
    setOpenModal(true);
    setSelectedImage(image);
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

  const handleSelectedQuantity = (value, image) => {
    setQuantity(value);
    setOpenModal(false);
    dispatch(changeItemQuantity({ quantity: value, imageResult_id: image }));
  };

  const addressBlock = (
    <TouchableOpacity
      onPress={() => { }}
      style={tw`border-t border-b border-[#AFAFAF] flex justify-center items-center h-[15%] w-full bg-white mb-5`}
    >
      <View style={tw`flex-row justify-between items-center w-[90%]`}>
        <View style={tw`flex justify-center`}>
          <Text style={tw`text-5 font-bold opacity-70 ml-5`}>
            {order.addressDelivery.addressName}
          </Text>
          <Text style={tw`text-5 font-bold opacity-70 ml-5`}>
            {order.addressDelivery.street}
          </Text>
          <Text style={tw`text-5 font-bold opacity-70 ml-5`}>
            {order.addressDelivery.zipCode}{" "}
            {order.addressDelivery.city ? order.addressDelivery.city + "," : ""}{" "}
            {order.addressDelivery.country}
          </Text>
        </View>
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
  );

  const showCart = user.basket.map((element, index) => {
    return (
      <CartItem
        {...element}
        key={index}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        index={index}
        changeQuantity={changeQuantity}
        handleSelectedQuantity={handleSelectedQuantity}
      />
    );
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

    // console.log("response --->");
    const { paymentIntent, ephemeralKey, customer } = await response.json();
    // console.log("response --->", paymentIntent, ephemeralKey, customer);
    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };

  const initializePaymentSheet = async () => {
    const { paymentIntent, ephemeralKey, customer, publishableKey } =
      await fetchPaymentSheetParams();

    // console.log("publishableKey", ephemeralKey, publishableKey);
    // console.log("customer", customer);

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

  const reloadPaymentSheet = () => {
    setLoading(false);
    initializePaymentSheet();
  };

  const openPaymentSheet0 = async () => {
    // see below
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      // console.log(`Error code: ${error.code}`, error.message);
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      // console.log("Success", "Your order is confirmed!");
      Alert.alert("Success", "Your order is confirmed!");
      navigation.navigate("OrderConfirmation");
    }
  };

  return (
    <StripeProvider publishableKey="pk_test_51Ma3OsFo81GGwjYJ2jgvbWDBVfs1qDX95WhLoTvTQ3Fx5CAgCgTmfpWpzU2L0RdZUWvbExD5CnMVXno9vxfGYmAA001xlVdXRt">
      <View style={tw`flex bg-[#F2EFEA] h-full w-full items-center`}>
        <Header
          doesContainReturnButtonComponent={true}
          onPress={handleReturn}
          title="Order Summary"
        />
        <View style={tw`flex-1 items-center w-full`}>
          <View style={tw`flex-row items-center w-full mb-2 mt-7`}>
            <Text style={tw`text-5 font-bold opacity-70 ml-5`}>
              Shipping Address
            </Text>
          </View>
          {addressBlock}
          <ScrollView style={tw`w-full bg-white`}>
            <View
              style={tw`flex-col-reverse items-center border-b border-[#AFAFAF]`}
            >
              {showCart}
            </View>
          </ScrollView>

          <View style={tw`flex w-[80%] mt-5 mb-10`}>
            <View
              style={tw`flex bg-[#F4F3EE] justify-between rounded-2 border border-[#AFAFAF] mb-5 px-5 py-3`}
            >
              <View
                style={tw`flex-row justify-between items-center w-full mb-2`}
              >
                <Text style={tw`text-6 font-medium`}>Shipping fee:</Text>
                <Text style={tw`text-6 font-medium`}>Free</Text>
              </View>
              <View style={tw`flex-row justify-between items-center w-full`}>
                <Text style={tw`text-6 font-medium`}>Total:</Text>
                <Text style={tw`text-6 font-medium`}>{`${total}€`}</Text>
              </View>
            </View>
            <View style={tw`flex-row justify-center`}>
              <ButtonWithText
                color="[#2C6DB4]"
                disabled={!loading}
                onPress={openPaymentSheet}
                text="Proceed to payment"
              />
            </View>
          </View>
        </View>
      </View>
      {openModal && (
        <ModalQuantityList
          quantityList={5}
          handleSelectedQuantity={handleSelectedQuantity}
          setOpenModal={setOpenModal}
          changeItemQuantity={changeItemQuantity}
          selectedImage={selectedImage}
        />
      )}
    </StripeProvider>
  );
}
