import {
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  View,
} from "react-native";
import tw from "twrnc";

export default function ModalQuantityList({
  handleSelectedQuantity,
  selectedImage,
  setOpenModal,
}) {
  const quantityList = (number) => {
    let newList = [];
    for (let i = 1; i <= number; i++) {
      newList.push(
        <TouchableOpacity
          key={i}
          activeOpacity={1}
          style={tw`flex items-center border-t border-[#AFAFAF] w-full py-2`}
          onPress={() => handleSelectedQuantity(i, selectedImage)}
        >
          <Text style={tw`text-4 font-medium opacity-70`}>{i}</Text>
        </TouchableOpacity>
      );
    }
    return newList;
  };

  return (
    <View
      style={tw`absolute border flex justify-center items-center w-full h-full`}
    >
      <TouchableWithoutFeedback onPress={() => setOpenModal(false)}>
        <View style={tw`absolute w-full h-full bg-black opacity-70`}></View>
      </TouchableWithoutFeedback>
      <View style={tw`flex w-[40%] items-center bg-white rounded-4 py-2`}>
        <Text style={tw`mb-2 text-4 font-bold opacity-70`}>Quantity</Text>
        <ScrollView style={tw`w-full`}>
          <View style={tw`flex items-center`}>{quantityList(5)}</View>
        </ScrollView>
      </View>
    </View>
  );
}
