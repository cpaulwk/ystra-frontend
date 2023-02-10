import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useState } from "react";
import tw from "twrnc";
import ButtonIcon from "./ButtonIcon";

export default function CardsGallery(props) {
  const [isModalVisible, setIsModalVisible] = useState({
    visible: false,
    url: "",
  });

  const { handleShowModal, item, handleSharing, handleBasket, handleSelected } =
    props;
  //console.log(item);

  return (
    <View style={tw`h-50 w-[95%] m-1 rounded-2.5`} key={item._id}>
      <TouchableOpacity
        onPress={() => handleShowModal({ visible: true, url: item.url })}
        style={styles.card}
      >
        <Image
          style={tw`rounded-2.5 border border-[#AFAFAF] flex-row justify-end h-full w-full`}
          resizeMode="cover"
          source={{ uri: item.url }}
        />
      </TouchableOpacity>

      <View style={tw`absolute right-1 flex justify-around h-full mr-2`}>
        <ButtonIcon
          onPress={handleSharing.bind(this, item.url)}
          url={props.item.url}
          name="share-square-o"
          size={20}
          selectionColor="red"
        />

        <ButtonIcon
          onPress={handleSelected.bind(this, item._id, !item.isChecked)}
          name={item.isChecked ? "times" : "heart"}
          style={tw`mb-0.5`}
          size={20}
        />

        <ButtonIcon
          onPress={handleBasket.bind(this, item._id, item.url)}
          name="shopping-basket"
          size={20}
          selectionColor="red"
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
