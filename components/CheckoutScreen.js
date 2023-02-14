import { useStripe,StripeProvider } from "@stripe/stripe-react-native";
import { useState,useEffect } from "react";
import { Button, TouchableOpacity, View,Text, Alert } from "react-native";
import { Screen } from "react-native-screens";
import tw from 'twrnc';
import { useSelector } from "react-redux";
import { BACKEND_URL } from "@env";

export default function CheckoutScreen({navigation}) {
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loading, setLoading] = useState(false);

    const user= useSelector((state)=> state.user.value)
    const total = user.basket.reduce((accu, current) => accu + current.price, 0);
  
//const API_URL='http://192.168.1.17:3000/payement';
    const API_URL=`${BACKEND_URL}/payement`;

    const fetchPaymentSheetParams = async () => {

      console.log('URL',`${BACKEND_URL}/payement`)
      const response = await fetch(`${API_URL}/payment-sheet`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: (total * 100),
          email: user.email 
        })
      });

      console.log('response --->')
      const { paymentIntent, ephemeralKey, customer} = await response.json();
      console.log('response --->',paymentIntent, ephemeralKey, customer)
      return {
        paymentIntent,
        ephemeralKey,
        customer,
      };
    };
  
    const initializePaymentSheet = async () => {
      const {
        paymentIntent,
        ephemeralKey,
        customer,
        publishableKey,
      } = await fetchPaymentSheetParams();

      console.log('publishableKey',ephemeralKey, publishableKey)
      console.log('customer', customer)
  
      const { error } = await initPaymentSheet({
        merchantDisplayName: "Ystra, Inc.",
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
        //methods that complete payment after a delay, like SEPA Debit and Sofort.
        allowsDelayedPaymentMethods: true,
        defaultBillingDetails: {
          name: 'Jane Doe',
        }

      });
      if (!error) {
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
        console.log('Success', 'Your order is confirmed!')
        Alert.alert('Success', 'Your order is confirmed!');
        navigation.navigate("OrderConfirmation");
      }
    };
  
    useEffect(() => {
      initializePaymentSheet();
    }, []);
  
    return (
      <StripeProvider publishableKey="pk_test_51Ma3OsFo81GGwjYJ2jgvbWDBVfs1qDX95WhLoTvTQ3Fx5CAgCgTmfpWpzU2L0RdZUWvbExD5CnMVXno9vxfGYmAA001xlVdXRt">
      <Screen  style={tw `flex-1 justify-center  content-center`}>
        <Button
          variant="primary"
          disabled={!loading}
          title={`Checkout ${total}€`}
          onPress={openPaymentSheet}
        />       
      </Screen>
      </StripeProvider>
    );
  }