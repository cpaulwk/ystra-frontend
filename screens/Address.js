import { Keyboard, View, TouchableWithoutFeedback } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import tw from "twrnc";
import { useState, useEffect } from "react";
import { addAddress } from "../reducers/order";
import { previousScreen } from "../reducers/user";
import useForm from "../hooks/useForm";
import Header from "../components/organisms/Header";
import FormInputField from "../components/atoms/FormInputField";
import ButtonWithText from "../components/atoms/ButtonWithText";

export default function Address({ navigation }) {
  const dispatch = useDispatch();
  const order = useSelector((state) => state.order.value);
  const [canReturn, setCanReturn] = useState(false);
  const { form, handleForm, updateForm } = useForm();

  useEffect(() => {
    const { addressDelivery } = order;
    if (addressDelivery) {
      const retainedAddress = {
        addressName:
          !addressDelivery.firstName && !addressDelivery.lastName
            ? undefined
            : `${addressDelivery.firstName ? addressDelivery.firstName : ""} ${
                addressDelivery.lastName ? addressDelivery.lastName : ""
              }`,
        firstName: addressDelivery.firstName,
        lastName: addressDelivery.lastName,
        streetName1: addressDelivery.streetName1,
        streetName2: addressDelivery.streetName2,
        zipCode: addressDelivery.zipCode,
        city: addressDelivery.city,
        state: addressDelivery.state,
        country: addressDelivery.country,
        phoneNumber: "",
        isForBilling: false,
        isForDelivery: true,
        isDefault: false,
        isDeleted: false,
      };
      updateForm(retainedAddress);
    }
  }, []);

  const handleReturn = () => {
    setCanReturn(false);
    dispatch(previousScreen("Address"));
    navigation.navigate("Cart");
  };

  const handleAddress = (e) => {
    const deliveryAddress = {
      addressName:
        !e.firstName && !e.lastName
          ? undefined
          : `${e.firstName ? e.firstName : ""} ${e.lastName ? e.lastName : ""}`,
      firstName: e.firstName,
      lastName: e.lastName,
      streetName1: e.streetName1,
      streetName2: e.streetName2,
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
    dispatch(addAdrdess(deliveryAddress));
    // dispatch(clearAddress());
    dispatch(previousScreen("Address"));

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
    { name: "streetName1", placeholder: "Street name", type: "text" },
    {
      name: "streetName2",
      placeholder: "Additional address information",
      type: "text",
    },
    {
      name: "zipCode",
      placeholder: "Zip code",
      type: "text",
      position: [2, 1],
    },
    { name: "city", placeholder: "City", type: "text", position: [2, 2] },
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
            value={order.addressDelivery[item.name]}
            // value={form !== {} ? form[item.name] : ""}
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
            value={order.addressDelivery[item.name]}
            // value={form !== {} ? form[item.name] : ""}
          />
          <FormInputField
            key={array[index + 1].name}
            placeholder={array[index + 1].placeholder}
            name={array[index + 1].name}
            width="[48%]"
            onChangeText={handleForm}
            value={order.addressDelivery[array[index + 1].name]}
            // value={form !== {} ? form[array[index + 1].name] : ""}
          />
        </View>
      );
    }
  });

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={tw`flex items-center h-full bg-[#F2EFEA]`}>
        <Header
          doesContainReturnButtonComponent={true}
          onPress={handleReturn}
          title="Shipping Address"
        />
        <View style={tw`shrink items-center w-full bg-white`}>
          <View style={tw`flex items-center w-[90%] py-10`}>
            {fieldContainers}
          </View>
        </View>
        {/* Buttons */}
        <View style={tw`flex-1 justify-end items-center mt-5 mb-10  w-[80%]`}>
          <ButtonWithText
            color="[#2C6DB4]"
            onPress={() => handleAddress(form)}
            text="Confirm address"
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
