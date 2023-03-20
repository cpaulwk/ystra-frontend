import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import tw from "twrnc";
import ButtonIcon from "./ButtonIcon";

export default function CardsGallery({
  handleShowModal,
  item,
  handleSharing,
  handleBasket,
  handleSelected,
  isHome,
}) {
  return (
    <View
      style={
        isHome ? tw`h-[48%] w-[48%]` : tw`border h-50 w-[95%] m-1 rounded-2.5`
      }
    >
      <TouchableOpacity
        onPress={() => handleShowModal({ visible: true, url: item.url })}
        style={styles.card}
      >
        <Image
          style={
            isHome
              ? tw`flex-row justify-end h-full w-full`
              : tw`rounded-2.5 border border-[#AFAFAF] flex-row justify-end h-full w-full`
          }
          resizeMode="cover"
          source={{ uri: item.url }}
        />
      </TouchableOpacity>

      <View style={tw`absolute right-3 flex justify-around h-full`}>
        <ButtonIcon
          onPress={handleSharing.bind(this, item.url)}
          name="share-square-o"
          size={20}
          style={tw`pt-0.8 pl-0.5`}
        />

        <ButtonIcon
          onPress={handleSelected.bind(this, item._id, !item.isChecked)}
          name={item.isChecked && !isHome ? "times" : "heart"}
          size={20}
          style={item.isChecked ? tw`pl-0.4` : tw`pt-0.4 pl-0.2`}
          likedColor={item.isChecked ? "#EE0B4F" : "black"}
        />

        <ButtonIcon
          onPress={handleBasket.bind(this, item._id, item.url)}
          name="shopping-basket"
          size={20}
          style={tw`pl-0.2`}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    height: "100%",
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
