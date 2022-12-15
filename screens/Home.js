import { useState } from "react";
import {KeyboardAvoidingView, View,Text,TouchableOpacity,StyleSheet, TextInput,Image } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector } from "react-redux";

export default function Home() {
  const [textQuery,setTextQuery]=useState('');
  const [resultQuery,setResultQuery]=useState();
  const user= useSelector(state=> state.user.value);


  // ,{
  //   //   method: 'GET',
  //   //   headers: { 
  //   //     'Content-Type': 'application/json'
  //   // },
  //   //   body:JSON.stringify({token:user.token,queryKey:textQuery}),
  //   //   }
  const handleSearch=()=>{
      fetch(`http://192.168.10.173:3000/gallery/all/${user.token}`).then(response=> response.json())
        .then(data=>{
            // console.log('Boucif',data)
            setResultQuery(data);
        })
  }
    
    const imageIA= resultQuery?.Images.map((elem,index)=>{
      console.log('Boucif ==>',elem.imageResult[0].url)
      return(
        <View style={styles.photoContainer} key={index}>
          <Image source={ require('../assets/homescreen-background.jpg') } style={styles.photo}></Image>
          {/* <Image source={ {uri:elem.imageResult[0].url} } style={styles.photo}></Image> */}
        </View>
      )
    })
    // const goTab=()=>{
    //   navigation.navigate('TabNavigator');
    // }
    return (
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <View style={styles.searchSection}> 
          <TextInput
          style={styles.input}
          placeholder="Enter any words here..."
          autoCapitalize="none" // https://reactnative.dev/docs/textinput#autocapitalize
          // keyboardType="email-address" // https://reactnative.dev/docs/textinput#keyboardtype
          // textContentType="password" // https://reactnative.dev/docs/textinput#textcontenttype-ios
          // autoComplete="password" // https://reactnative.dev/docs/textinput#autocomplete-android
          value={textQuery}
          onChangeText={(value)=> setTextQuery(value)}
          />
              <FontAwesome style={styles.searchIcon} name={'search'} selectionColor="red" onPress={()=>handleSearch()}/>

          
        </View>
        <View style={styles.galleryContainer}>
          {imageIA}
        </View>

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
  backgroundColor:'yellow',
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
