import { useState } from "react";
import {KeyboardAvoidingView, View,Text,TouchableOpacity,StyleSheet, TextInput,Image } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import BoxArrowUpIcon from "react-native-bootstrap-icons/icons/box-arrow-up";
import BasketFillIcon from "react-native-bootstrap-icons/icons/basket-fill";
import tw from "twrnc";
import { useSelector,useDispatch } from "react-redux";
import {addItem} from '../reducers/user';
// import { enableES5 } from "immer";

import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

export default function Home() {
  const [textQuery,setTextQuery]=useState('');
  const [resultQuery,setResultQuery]=useState([]);
  const user= useSelector(state=> state.user.value);
  const dispatch = useDispatch();

  // const BackAddress='https://ystra-backend.vercel.app';
  const BackAddress='http://192.168.1.17:3000';
  // ,{
  //   //   method: 'GET',
  //   //   headers: { 
  //   //     'Content-Type': 'application/json'
  //   // },
  //   //   body:JSON.stringify({token:user.token,queryKey:textQuery}),
  //   //   }
  const handleSearch=()=>{

    console.log(user.token,textQuery)

      fetch(`${BackAddress}/renderimages/`,{
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: user.token,
          queryKey: textQuery,
        }),
      }).then(response=> response.json())
        .then(data=>{
            console.log('Boucif',data)
            setResultQuery(data.data);
        })
  }

  // async function shareAsync(url, options = {}){
  //   if (!Sharing || !Sharing.shareAsync) {
  //     throw new UnavailabilityError('Sharing', 'shareAsync');
  //   }
  //   console.log('ok')
  //   return await Sharing.shareAsync('./ff.png');
  // }

  const handleSelected=(itemId)=>{
    console.log ('ID',itemId)
    fetch(`${BackAddress}/renderimages/checked`,{
      method:"POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: user.token,
        imageId: itemId,
      }),
    }).then(response=> response.json())
      .then(data=>{
        if(data.result){
          const x= resultQuery.map((x)=>{
            if(x._id===itemId){x.isSelected = true}
            return x;
          }
          )
          
          resultQueryx=x
          setResultQuery(x);
          console.log(resultQueryx);
        }

      })

  }



const handleSharing=async(url)=>{
  // Here is how to share a file from a remote url: download it first! :)


  //const downloadPath = FileSystem.bundleDirectory  + 'Ystra.jpg';
  //const downloadPath2 = FileSystem.documentDirectory  + 'Ystra.jpg';
  const downloadPath = FileSystem.cacheDirectory + 'Ystra.jpg';
  const downloadedFile = await FileSystem.downloadAsync(url, downloadPath);

if (downloadedFile.status != 200) {
  console.log ('Error downloadedFile')
  //handleError();
}
  // 1 - download the file to a local cache directory
  const { uri: localUrl } = await FileSystem.downloadAsync(url, downloadPath);

  Sharing.shareAsync(localUrl)
}


  const handelBasket=(itemId,itemUrl)=>{
    const shopp= {
      imageResult_id: itemId,
      url:itemUrl,
      price: 10, 
      product: {
                  size: null,
                  finish: null,
                  frame :null,
              },  
      quantity: 1,
      };
      dispatch(addItem(shopp));
  }

  
  let resultQueryx= [
    {
      url: "http://res.cloudinary.com/dlydp2bz3/image/upload/v1671319927/kggojbovj2mrohbyesmk.png",
      _id: "639e5179eaf11f2680ab0753",
      isSelected:false

    },
    {
      url: "http://res.cloudinary.com/dlydp2bz3/image/upload/v1671319927/umd0leqqguklz8yzt5vr.png",
      _id: "639e5179eaf11f2680ab0754",
      isSelected:false
    }
  ]


    console.log('resultQuery',resultQuery)
    const imageIA= resultQueryx?.map((elem,index)=>{
      return(
        <View style={tw `items-center`} key={index}>
          {/* <Image source={ require('../assets/homescreen-background.jpg') } style={styles.photo}></Image> */}
          <View style={ tw `` }>
          <Image source={ {uri:elem.url} } style={tw `w-40 h-40 m-1`}></Image>
          <View style={tw ` flex justify-center items-center bg-white opacity-50 absolute right-2 top-2 rounded-50 w-6 h-6 `}>
          <BoxArrowUpIcon size={25} color={elem.isSelected? 'red' : 'black'}  onPress={()=> handleSelected(elem._id)}/>
          </View>
          
          <View style={tw ` flex justify-center items-center bg-white opacity-50 absolute right-2 bottom-2 rounded-50 w-6 h-6 `}>
          <BasketFillIcon size={25} color={'black'} onPress={()=> handelBasket(elem._id,elem.url)} />
          <BasketFillIcon size={25} color={'black'}  onPress={() => handleSharing(elem.url)} />
          </View>

          </View>

          
        </View>
      )
    })
    // const goTab=()=>{
    //   navigation.navigate('TabNavigator');
    // }
    return (
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={tw`flex-1 items-center justify-center h-[100%] w-[100%]`}>
        <View style={tw `flex-row  items-end justify-center w-full h-[25%] ` }> 

        <View style={tw `flex-row items-center justify-end w-[90%]`}>
        <TextInput
          style={tw `border px-1 border-[#AFAFAF] rounded-1 bg-white w-full `}
          placeholder="Enter any words here..."
          autoCapitalize="none" // https://reactnative.dev/docs/textinput#autocapitalize
          // keyboardType="email-address" // https://reactnative.dev/docs/textinput#keyboardtype
          // textContentType="password" // https://reactnative.dev/docs/textinput#textcontenttype-ios
          // autoComplete="password" // https://reactnative.dev/docs/textinput#autocomplete-android
          value={textQuery}
          onChangeText={(value)=> setTextQuery(value)}
          />
          <FontAwesome style={tw `absolute right-2 `} name={'search'} selectionColor="red" onPress={()=>handleSearch()}/>

        </View>

          
        </View>
        <View style={tw `flex-1 flex-wrap direction-row justify-center `}>
          {imageIA}
        </View>

        <FontAwesome name="plus-circle" style={tw `m-10`}></FontAwesome>

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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: '#fff',
    borderColor:"red",
    borderWidth:1,
    width:"100%",
    height:"25%"
},
  input:{
    width:"80%",
    borderColor:"gray",
    borderWidth:1,
    borderRadius:5,
    padding:2,
  },
  
searchIcon: {
    padding: 10,
    right:30,
    backgroundColor:"#ffffff",
    opacity:0.9
},
galleryContainer: {
  flex:1,
  width:"100%",
  backgroundColor:'#F2EFEA',
  flexWrap: 'wrap',
  flexDirection: 'row',
  justifyContent: 'center',
},
photoContainer: {
  alignItems: 'center',
},
photo: {
  margin: 10,
  width: 150,
  height: 150,
},

});
