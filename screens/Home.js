import {
  ActivityIndicator,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import CardsGallery from "../components/molecules/CardsGallery";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Swiper from "react-native-swiper";
import tw from "twrnc";
import { addItem, previousScreen } from "../reducers/user";
import { addProduct } from "../reducers/product";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { BACKEND_URL } from "@env";

// import { enableES5 } from "immer";

import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

export default function Home({ navigation }) {
  const [textQuery, setTextQuery] = useState("");
  const [resultQuery, setResultQuery] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState({
    visible: false,
    url: "",
  });
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`${BACKEND_URL}/products/all/${user.token}`)
      // fetch(`http://192.168.1.14:3000/products/all/${user.token}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(addProduct(data.Products));
        }
      });
  }, []);

  //console.log(products)
  // ,{
  //   //   method: 'GET',
  //   //   headers: {
  //   //     'Content-Type': 'application/json'
  //   // },
  //   //   body:JSON.stringify({token:user.token,queryKey:textQuery}),
  //   //   }
  const handleSearch = () => {
    setIsLoading(true);
    setIsSearching(true);
    if (!user.token || !textQuery) {
      setIsLoading(false);
      setIsSearching(false);
      return;
    }

    fetch(`${BACKEND_URL}/renderimages`, {
      // fetch(`http://192.168.1.14:3000/renderimages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: user.token,
        queryKey: textQuery,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsSearching(data.result ? true : false);
        setResultQuery(data.result ? data.data : []);
        setIsLoading(false);
      })
      .catch((error) => console.log("error =>", error));
  };

  // async function shareAsync(url, options = {}){
  //   if (!Sharing || !Sharing.shareAsync) {
  //     throw new UnavailabilityError('Sharing', 'shareAsync');
  //   }
  //   console.log('ok')
  //   return await Sharing.shareAsync('./ff.png');
  // }

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
          const x = resultQuery.map((item) => {
            if (item._id === itemId) {
              item.isChecked = isLiked;
            }
            return item;
          });

          setResultQuery(x);
        }
      });
  };

  const handleSharing = async (url) => {
    // Here is how to share a file from a remote url: download it first! :)

    //const downloadPath = FileSystem.bundleDirectory  + 'Ystra.jpg';
    //const downloadPath2 = FileSystem.documentDirectory  + 'Ystra.jpg';
    const downloadPath = FileSystem.cacheDirectory + "Ystra.jpg";
    const downloadedFile = await FileSystem.downloadAsync(url, downloadPath);

    if (downloadedFile.status != 200) {
      console.log("Error downloadedFile");
      //handleError();
    }
    // 1 - download the file to a local cache directory
    const { uri: localUrl } = await FileSystem.downloadAsync(url, downloadPath);

    Sharing.shareAsync(localUrl);
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
    dispatch(previousScreen("Home"));
    navigation.navigate("Basket");
  };

  let resultQueryx = [
    {
      url: "https://res.cloudinary.com/dlydp2bz3/image/upload/v1671466378/jxrzkdyvjtuff8s3ddq3.png",
      _id: "63a08d89d83e44674a0d7fe0",
      isSelected: false,
    },
    {
      url: "https://res.cloudinary.com/dlydp2bz3/image/upload/v1671466378/vasoosiww88wr833usnk.png",
      _id: "63a08d89d83e44674a0d7fe3",
      isSelected: false,
    },
    {
      url: "https://res.cloudinary.com/dlydp2bz3/image/upload/v1671466378/jxrzkdyvjtuff8s3ddq3.png",
      _id: "63a08d89d83e44674a0d7fe0",
      isSelected: false,
    },
    {
      url: "https://res.cloudinary.com/dlydp2bz3/image/upload/v1671466378/vasoosiww88wr833usnk.png",
      _id: "63a08d89d83e44674a0d7fe3",
      isSelected: false,
    },
  ];

  const handleShowModal = (val) => {
    setIsModalVisible(val);
  };

  const imageIA = resultQuery.map((item, index) => {
    return (
      <CardsGallery
        key={item._id}
        item={item}
        isHome={true}
        handleShowModal={handleShowModal}
        handleSharing={handleSharing}
        handleBasket={handleBasket}
        handleSelected={handleSelected}
      />
    );
  });
  // const goTab=()=>{
  //   navigation.navigate('TabNavigator');
  // }
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={tw`bg-[#F2EFEA] flex-1 items-center justify-center h-[100%] w-[100%]`}
      >
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
          <View style={tw`flex-row items-center justify-end w-[90%]`}>
            <TextInput
              style={tw`border h-11 px-1 border-[#AFAFAF] rounded-1 bg-white w-full `}
              placeholder="Enter any words here..."
              autoCapitalize="none" // https://reactnative.dev/docs/textinput#autocapitalize
              value={textQuery}
              onChangeText={(value) => setTextQuery(value)}
              returnKeyType="search"
              onSubmitEditing={handleSearch}
            />
            <TouchableOpacity
              style={tw`flex justify-center items-center absolute h-10 w-10`}
              onPress={() => handleSearch()}
            >
              <FontAwesome
                size={25}
                style={tw`absolute`}
                name="search"
                selectionColor="#BA0000"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={tw`flex-1 items-center w-[90%] mt-[10%]`}>
          {isLoading && (
            <View style={tw`flex-1 justify-center items-center`}>
              <ActivityIndicator size="large" />
            </View>
          )}
          {!isSearching && (
            <View>
              <Swiper
                showsButtons={false}
                showsPagination={false}
                loop={true}
                autoplay={true}
                autoplayTimeout={2}
              >
                <View
                  style={tw` px-1 border-red-600 flex items-center h-full w-full`}
                >
                  <Image
                    style={tw`h-70 w-70 border-8`}
                    source={require("../assets/SlideShowImage1.png")}
                  />
                  <Text style={tw` text-2xl	font-semibold text-justify	w-65	`}>
                    “City of paris with the style of Yoshitaka Amano"
                  </Text>
                </View>
                <View
                  style={tw` px-1 border-red-600 flex items-center h-full w-full`}
                >
                  <Image
                    style={tw`h-70 w-70 border-8`}
                    source={require("../assets/SlideShowImage2.jpeg")}
                  />
                  <Text style={tw`text-2xl	font-semibold text-justify	w-65	`}>
                    “a bowl of soup that is a portal to another dimension as
                    digital art
                  </Text>
                </View>
                <View
                  style={tw` px-1 border-red-600 flex items-center h-full w-full`}
                >
                  <Image
                    style={tw`h-70 w-70 border-8`}
                    source={require("../assets/SlideShowImage3.webp")}
                  />
                  <Text style={tw`text-2xl	font-semibold text-justify	w-65	`}>
                    “A futuristic cyborg poster hanging in a neon lit subway
                    station"
                  </Text>
                </View>
                <View
                  style={tw` px-1 border-red-600 flex items-center h-full w-full`}
                >
                  <Image
                    style={tw`h-70 w-70 border-8`}
                    source={require("../assets/SlideShowImage4.webp")}
                  />
                  <Text style={tw`text-2xl	font-semibold text-justify	w-65	`}>
                    “A hand-drawn sailboat circled by birds on the sea at
                    sunrise"
                  </Text>
                </View>
                <View
                  style={tw` px-1 border-red-600 flex items-center h-full w-full`}
                >
                  <Image
                    style={tw`h-70 w-70 border-8`}
                    source={require("../assets/SlideShowImage5.webp")}
                  />
                  <Text style={tw`text-2xl	font-semibold text-justify	w-65	`}>
                    “A photo of an astronaut riding a horse"
                  </Text>
                </View>
                <View
                  style={tw` px-1 border-red-600 flex items-center h-full w-full`}
                >
                  <Image
                    style={tw`h-70 w-70 border-8`}
                    source={require("../assets/SlideShowImage6.webp")}
                  />
                  <Text style={tw`text-2xl	font-semibold text-justify	w-65	`}>
                    “A synthwave style sunset above the reflecting water of the
                    sea, digital art"
                  </Text>
                </View>
                <View
                  style={tw` px-1 border-red-600 flex items-center h-full w-full`}
                >
                  <Image
                    style={tw`h-70 w-70 border-8`}
                    source={require("../assets/SlideShowImage7.jpeg")}
                  />
                  <Text style={tw`text-2xl	font-semibold text-justify	w-65	`}>
                    “An astronaut riding a horse in a photorealistic"
                  </Text>
                </View>
                <View
                  style={tw` px-1 border-red-600 flex items-center h-full w-full`}
                >
                  <Image
                    style={tw`h-70 w-70 border-8`}
                    source={require("../assets/SlideShowImage8.jpeg")}
                  />
                  <Text style={tw`text-2xl	font-semibold text-justify	w-65	`}>
                    “Banksy meets DALL-E"
                  </Text>
                </View>
                <View
                  style={tw` px-1 border-red-600 flex items-center h-full w-full`}
                >
                  <Image
                    style={tw`h-70 w-70 border-8`}
                    source={require("../assets/SlideShowImage9.jpeg")}
                  />
                  <Text style={tw`text-2xl	font-semibold text-justify	w-65	`}>
                    “White surfaces design explorations"
                  </Text>
                </View>
              </Swiper>
            </View>
          )}
          {!isLoading && (
            <View
              style={tw`flex-row flex-wrap justify-around content-around w-full aspect-square`}
            >
              {imageIA}
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#F2EFEA",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "25%",
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
