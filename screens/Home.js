import { useState } from "react";
import {
  ImageBackground,
  KeyboardAvoidingView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import tw from "twrnc";
import { useSelector, useDispatch } from "react-redux";
import { addItem } from "../reducers/user";
// import { enableES5 } from "immer";

import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

export default function Home({ navigation }) {
  const [textQuery, setTextQuery] = useState("");
  const [resultQuery, setResultQuery] = useState([]);
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  // const BackAddress='https://ystra-backend.vercel.app';
  const BackAddress = "http://192.168.1.17:3000";
  // ,{
  //   //   method: 'GET',
  //   //   headers: {
  //   //     'Content-Type': 'application/json'
  //   // },
  //   //   body:JSON.stringify({token:user.token,queryKey:textQuery}),
  //   //   }
  const handleSearch = () => {
    if (!user.token || !textQuery) {
      return;
    }

    console.log(user.token, textQuery);

    fetch(`${BackAddress}/renderimages/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: user.token,
        queryKey: textQuery,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Boucif", data);
        setResultQuery(data.data);
      });
  };

  // async function shareAsync(url, options = {}){
  //   if (!Sharing || !Sharing.shareAsync) {
  //     throw new UnavailabilityError('Sharing', 'shareAsync');
  //   }
  //   console.log('ok')
  //   return await Sharing.shareAsync('./ff.png');
  // }

  const handleSelected = (itemId, isLiked) => {
    console.log("ID", itemId);
    fetch(`${BackAddress}/renderimages/checked`, {
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
          const x = resultQuery.map((x) => {
            if (x._id === itemId) {
              x.isSelected = isLiked;
            }
            return x;
          });

          resultQueryx = x;
          setResultQuery(x);
          console.log(resultQueryx);
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

  //console.log("resultQuery", resultQuery);
  const imageIA = resultQuery.map((elem, index) => {
    return (
      <View style={tw`items-center w-[48%] h-[48%]`} key={index}>
        {/* <Image source={ require('../assets/homescreen-background.jpg') } style={styles.photo}></Image> */}
        <ImageBackground
          style={tw`flex-row justify-end h-full w-full`}
          resizeMode="cover"
          source={{ uri: elem.url }}
        >
          <View style={tw`flex justify-between mr-2 my-2`}>
            <TouchableOpacity
              onPress={() => handleSharing(elem.url)}
              style={tw`border flex justify-center items-center bg-white opacity-70 rounded-50 w-8 h-8 pl-0.8 pt-0.2`}
            >
              <FontAwesome
                name="share-square-o"
                // size={20}
                selectionColor="red"
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleSelected(elem._id, !elem.isSelected)}
              style={tw`border flex justify-center items-center bg-white opacity-70 rounded-50 w-8 h-8 pl-0.2 pt-0.2`}
            >
              <FontAwesome
                name="heart"
                // size={20}
                color={elem.isSelected ? "red" : "black"}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleBasket(elem._id, elem.url)}
              style={tw`border flex justify-center items-center bg-white opacity-70 rounded-50 w-8 h-8 pl-0.5 pt-0.2`}
            >
              <FontAwesome
                name="shopping-basket"
                // size={20}
                selectionColor="red"
              />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  });
  // const goTab=()=>{
  //   navigation.navigate('TabNavigator');
  // }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={tw`flex-1 items-center justify-center h-[100%] w-[100%]`}
    >
      <View style={tw`flex-row  items-end justify-center w-full h-[25%] `}>
        <View style={tw`flex-row items-center justify-end w-[90%]`}>
          <TextInput
            style={tw`border h-11 px-1 border-[#AFAFAF] rounded-1 bg-white w-full `}
            placeholder="Enter any words here..."
            autoCapitalize="none" // https://reactnative.dev/docs/textinput#autocapitalize
            value={textQuery}
            onChangeText={(value) => setTextQuery(value)}
          />
          <TouchableOpacity
            style={tw`flex justify-center items-center absolute h-10 w-10`}
            onPress={() => handleSearch()}
          >
            <FontAwesome
              // size="25"
              style={tw`absolute`}
              name="search"
              selectionColor="red"
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={tw`flex-1 items-center w-[90%] mt-[10%]`}>
        <View
          style={tw`flex-row flex-wrap justify-around content-around w-full aspect-square`}
        >
          {imageIA}
        </View>
      </View>

      <TouchableOpacity onPress={() => handleSearch()} style={tw`my-[5%]`}>
        {/* <FontAwesome size={40} name="refresh" /> */}
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  },
  searchSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    backgroundColor: "#fff",
    borderColor: "red",
    borderWidth: 1,
    width: "100%",
    height: "25%",
  },
  input: {
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 2,
  },

  searchIcon: {
    padding: 10,
    right: 30,
    backgroundColor: "#ffffff",
    opacity: 0.9,
  },
  galleryContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: "#F2EFEA",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
  },
  photoContainer: {
    alignItems: "center",
  },
  photo: {
    margin: 10,
    width: 150,
    height: 150,
  },
});
