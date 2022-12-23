import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import tw from "twrnc";

// import { enableES5 } from "immer";

export default function OrderConfirmation({ navigation }) {
  const dispatch = useDispatch();
  const handlePayment = (itemId, itemUrl) => {
    navigation.navigate("TabNavigator", { screen: "Home" });
  };

  return (
    <View style={tw`bg-[#F2EFEA] flex-1 items-center`}>
      <View style={styles.header}>
        <Text style={tw`text-10 font-bold`}>Congratulations!</Text>
      </View>
      <View style={tw`flex-1 justify-between w-full`}>
        <View style={tw`flex items-center`}>
          <View style={tw`flex w-[80%] mt-[25%]`}>
            <Text style={tw`text-6.5 font-medium`}>Your command</Text>
            <Text style={tw`text-6.5 font-medium`}>
              nº{" "}
              <Text style={tw`text-6.5 text-[#76CA66] font-medium`}>
                1234567890{" "}
              </Text>
              is confirmed
            </Text>
            <Text style={tw`text-6.5 font-medium mt-[20%]`}>
              An order confirmation has been sent to your email inbox.
            </Text>
          </View>
        </View>
        <View style={tw`flex-row justify-center w-full mb-[20%]`}>
          <TouchableOpacity
            style={tw` flex justify-center items-center bg-[#2C6DB4] rounded-1.75 h-15 w-[85%]  border-[#161E44]`}
            onPress={() => handlePayment()}
          >
            <Text style={tw`font-medium		 text-2xl text-[#FFFF]`}>
              Return to Home
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#F2EFEA",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    height: "20%",
    width: "100%",
    paddingBottom: 20,
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
