import { View, TouchableOpacity, Image, Modal, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import tw from "twrnc";
import { addItem, previousScreen } from "../reducers/user";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { BACKEND_URL } from "@env";
import SwitchControl from "../components/uikit/SwitchControl";
import CardsGallery from "../components/uikit/CardsGallery";
import Header from "../components/uikit/Header";

export default function Gallery({ navigation }) {
  const user = useSelector((state) => state.user.value);
  const isFocused = useIsFocused();
  const [galleryImages, setGalleryImages] = useState([]);
  const [isFavoriteView, setIsFavoriteView] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState({
    visible: false,
    url: "",
  });
  const dispatch = useDispatch();

  console.log("user => ", user);
  console.log("user.changeItem => ", user.changeItem);

  useEffect(() => {
    fetch(`${BACKEND_URL}/gallery/all/${user.token}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setGalleryImages(data.Images);
        }
      });
  }, [isFocused]);

  const handleSwitchGallery = (data) => {
    setIsFavoriteView(data);
  };

  const handleSharing = async (url) => {
    const downloadPath = FileSystem.cacheDirectory + "Ystra.jpg";
    const downloadedFile = await FileSystem.downloadAsync(url, downloadPath);

    if (downloadedFile.status != 200) {
      console.log("Error downloadedFile");
    }
    const { uri: localUrl } = await FileSystem.downloadAsync(url, downloadPath);

    Sharing.shareAsync(localUrl);
  };

  const handleSelected = (itemId, isLiked) => {
    fetch(`${BACKEND_URL}/renderimages/checked`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: user.token,
        imageId: itemId,
        isLiked: isLiked,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          const tabTemp = galleryImages.map((item) => {
            const index = item.imageResult.findIndex((y) => y._id === itemId);
            if (index > -1) item.imageResult[index].isChecked = isLiked;
            return item;
          });
          setGalleryImages(tabTemp);
        }
      });
  };

  const handleBasket = (itemId, itemUrl) => {
    const shopp = {
      imageResult_id: itemId,
      url: itemUrl,
      price: 10,
      product: {
        size: null,
        finish: null,
        frame: null,
      },
      quantity: 1,
    };
    dispatch(addItem(shopp));
    dispatch(previousScreen("Gallery"));
    navigation.navigate("Basket");
  };

  const handleModal = (val) => {
    setIsModalVisible(val);
  };

  const showCards = (item) => (
    <CardsGallery
      key={item._id}
      item={item}
      handleShowModal={handleModal}
      handleSharing={handleSharing}
      handleBasket={handleBasket}
      handleSelected={handleSelected}
    />
  );

  const tempGallery = galleryImages
    .map((element) =>
      element.imageResult
        .filter((item) => item.isChecked === isFavoriteView)
        .map(showCards)
    )
    .flat();
  console.log("galleryImages => ", galleryImages);
  console.log("tempGallery => ", tempGallery);
  // La méthode flat() permet de créer un nouveau tableau contenant les éléments des sous-tableaux du tableau passé en argument

  return (
    <View style={tw`flex-1 bg-[#F2EFEA] items-center`}>
      <Modal
        style={tw`bg-black w-full h-full`}
        visible={isModalVisible.visible}
        animationType="fade"
        transparent
      >
        <TouchableOpacity
          style={tw`flex-1 w-full justify-center items-center`}
          onPress={() => setIsModalVisible({ visible: false, url: "" })}
        >
          <View style={tw`bg-black h-full w-full opacity-95`}></View>
          <Image
            style={tw`absolute w-[90%] aspect-square`}
            source={{ uri: isModalVisible.url }}
          />
        </TouchableOpacity>
      </Modal>

      <Header doesContainReturnButtonComponent={false} title="Gallery" />

      <SwitchControl
        handleSwitchParent={handleSwitchGallery}
        currentValue={isFavoriteView}
        title="Show liked only"
      />

      <ScrollView style={tw`w-full mt-2`}>
        <View style={tw`flex-col-reverse items-center`}>{tempGallery}</View>
      </ScrollView>
    </View>
  );
}
