import {
  Keyboard,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  TextInput,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import tw from "twrnc";
import React, { useState } from "react";
import { addAdress } from "../reducers/order";
import useForm from "../hooks/useForm";
import Header from "../components/uikit/Header";

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
  const { form, handleForm, bind } = useForm();

  const handleAdress = (e) => {
    console.log("form", e);
    const deliveryAdress = {
      addressName: `${e.firstName} ${e.lastName}`,
      street: e.streetName,
      zipCode: e.zipCode,
      city: e.city,
      state: e.state,
      country: e.country,
      phoneNumber: "",
      isForBilling: false,
      isForDelivery: true,
      isDefault: false,
      isDeleted: false,
    };
    dispatch(addAdress(deliveryAdress));

    // navigation.navigate("CreditCards");
    navigation.navigate("OrderSummary");
  };

  const adressField = [
    {
      name: "firstName",
      placeholder: "Firstname",
      type: "text",
      position: [1, 1],
    },
    {
      name: "lastName",
      placeholder: "Lastname",
      type: "text",
      position: [1, 2],
    },
    { name: "streetName", placeholder: "Street name", type: "text" },
    {
      name: "streetName2",
      placeholder: "Additional address information",
      type: "text",
    },
    { name: "city", placeholder: "City", type: "text", position: [2, 1] },
    {
      name: "zipCode",
      placeholder: "Zip code",
      type: "text",
      position: [2, 2],
    },
    { name: "state", placeholder: "State", type: "text" },
    { name: "country", placeholder: "Country", type: "text" },
  ];

  console.log("useForm", form);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={tw`flex-1  items-center w-full h-full bg-[#F2EFEA] 	`}>
        <Header
          doesContainReturnButtonComponent={true}
          onPress={handleReturn}
          title="Shipping Address"
        />
        <ScrollView style={tw`w-full bg-white`}>
          <View style={tw`flex items-center border-[#AFAFAF] w-full`}>
            <View style={tw`flex  w-[90%] `}>
              {adressField.map((data) => {
                // console.log(data);
                return (
                  <View key={data.name} style={tw`flex-row items-center m-1 `}>
                    <TextInput
                      placeholder={data.placeholder}
                      name={data.name}
                      style={tw`border border-[#9ca3af] bg-white p-3 pl-5 opacity-90 w-full rounded-2.5 text-4`}
                      onChangeText={(e) => handleForm(data.name, e)}
                      // {...bind}
                    />
                  </View>
                );
              })}
            </View>
          </View>
        </ScrollView>

        {/* Buttons */}
        <View style={tw`flex-row justify-center mb-[10%]`}>
          <TouchableOpacity
            style={tw` flex justify-center items-center bg-[#2C6DB4] rounded-1.75 h-15 w-[85%]  border-[#161E44]`}
            onPress={() => handleAdress(form)}
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
