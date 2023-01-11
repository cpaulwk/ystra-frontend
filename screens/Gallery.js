import {
  ImageBackground,
  KeyboardAvoidingView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  Modal,
  Switch,
  ScrollView,
  SafeAreaView,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import tw from "twrnc";
import { addItem } from "../reducers/user";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { BACKEND_URL } from "@env";

export default function Gallery({ navigation }) {
  console.log("Gallery =>", BACKEND_URL);
  const user = useSelector((state) => state.user.value);
  const isFocused = useIsFocused();
  const [galleryImages, setGalleryImages] = useState([]);
  const [isFavoriteView, setIsFavoriteView] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState({
    visible: false,
    url: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`${BACKEND_URL}/gallery/all/${user.token}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          console.log("data.images", data.Images);
          setGalleryImages(data.Images);
        }
      });
  }, [isFocused]);

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
    console.log("ID", itemId);
    fetch(`${BACKEND_URL}/renderimages/liked`, {
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
          const x = galleryImages.map((x) => {
            for (let i = 0; i < x.imageResult.length; i++) {
              if (x.imageResult[i]._id === itemId) {
                x.imageResult[i].isChecked = isLiked;
              }
            }
            return x;
          });

          // resultQueryx = x;
          setGalleryImages(x);
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
    navigation.navigate("Basket");
  };

  let tempGallery = [];
  const gallery = galleryImages.reverse().forEach((element) => {
    //Images.imageResult
    tempGallery.push(
      element.imageResult.map((item, index) => {
        if (item.isChecked === isFavoriteView) {
          return (
            <View style={tw`h-50 w-[95%] m-1 rounded-2.5`} key={index}>
              {/* <Image source={ require('../assets/homescreen-background.jpg') } style={styles.photo}></Image> */}
              <TouchableOpacity
                onPress={() =>
                  setIsModalVisible({ visible: true, url: item.url })
                }
                style={styles.card}
              >
                <Image
                  style={tw`rounded-2.5 border border-[#AFAFAF] flex-row justify-end h-full w-full`}
                  resizeMode="cover"
                  source={{ uri: item.url }}
                />
              </TouchableOpacity>
              <View
                style={tw`absolute right-1 flex justify-around h-full mr-2 my-2`}
              >
                <TouchableOpacity
                  style={tw`border flex justify-center items-center bg-white opacity-70 rounded-50 w-8 h-8 pl-0.8 pt-0.2`}
                >
                  <FontAwesome
                    onPress={() => handleSharing(item.url)}
                    name="share-square-o"
                    size={20}
                    selectionColor="red"
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={tw`border flex justify-center items-center bg-white opacity-70 rounded-50 w-8 h-8 pl-0.2 pt-0.2`}
                >
                  <FontAwesome
                    onPress={() => handleSelected(item._id, !item.isChecked)}
                    style={tw`mb-0.5`}
                    name={item.isChecked ? "times" : "heart"}
                    size={20}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={tw`border flex justify-center items-center bg-white opacity-70 rounded-50 w-8 h-8 pl-0.5 pt-0.2`}
                >
                  <FontAwesome
                    onPress={() => handleBasket(item._id, item.url)}
                    name="shopping-basket"
                    size={20}
                    selectionColor="red"
                  />
                </TouchableOpacity>
              </View>
            </View>
          );
        }
      })
    );
  });

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

      <View style={styles.header}>
        <Text style={tw`text-6 font-bold opacity-70`}>Gallery</Text>
      </View>

      <View style={tw`flex-row justify-end items-center w-full px-5 mt-5`}>
        <Text style={tw`mr-2 font-bold`}>Show liked only</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#76CA66" }}
          thumbColor={isFavoriteView ? "#f4f3f4" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => {
            setIsFavoriteView(!isFavoriteView);
            console.log(isFavoriteView);
          }}
          value={isFavoriteView}
        />
      </View>
      <ScrollView style={tw`w-full pt-4`}>
        <View style={tw`flex-1 items-center`}>{tempGallery}</View>
      </ScrollView>
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
