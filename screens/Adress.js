import {
  Keyboard,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { useDispatch } from "react-redux";
import tw from "twrnc";
import React, { useState } from "react";
import { addAdress } from "../reducers/order";
import useForm from "../hooks/useForm";
import Header from "../components/uikit/Header";
import FormInputField from "../components/uikit/FormInputField";

export default function Adress({ navigation }) {
  const dispatch = useDispatch();
  const [canReturn, setCanReturn] = useState(false);
  const { form, handleForm } = useForm();

  const handleReturn = () => {
    setCanReturn(false);
    navigation.navigate("Cart");
  };

  const handleAdress = (e) => {
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

    navigation.navigate("OrderSummary");
  };

  const addressField = [
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

  const fieldContainers = addressField.map((item, index, array) => {
    if (!item.position) {
      return (
        <View key={index} style={tw`flex w-full m-1`}>
          <FormInputField
            key={item.name}
            placeholder={item.placeholder}
            name={item.name}
            width="full"
            onChangeText={handleForm}
          />
        </View>
      );
    } else if (item.position[1] === 1) {
      return (
        <View key={index} style={tw`flex-row justify-between w-full m-1`}>
          <FormInputField
            key={item.name}
            placeholder={item.placeholder}
            name={item.name}
            width="[48%]"
            onChangeText={handleForm}
          />
          <FormInputField
            key={array[index + 1].name}
            placeholder={array[index + 1].placeholder}
            name={array[index + 1].name}
            width="[48%]"
            onChangeText={handleForm}
          />
        </View>
      );
    }
  });

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={tw`flex items-center w-full h-full bg-[#F2EFEA]`}>
        <Header
          doesContainReturnButtonComponent={true}
          onPress={handleReturn}
          title="Shipping Address"
        />
        <View style={tw`flex-1 justify-between w-full`}>
          <View>
            <ScrollView style={tw`bg-white`}>
              <View style={tw`flex items-center`}>
                <View style={tw`flex items-center w-[90%] py-10`}>
                  {fieldContainers}
                </View>
              </View>
            </ScrollView>
          </View>

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
      </View>
    </TouchableWithoutFeedback>
  );
}
