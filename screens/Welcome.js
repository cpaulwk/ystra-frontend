import {
    Button,
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    ImageBackground,
    TextInput,
    Alert,
    Image,
  } from "react-native";
  
  import { useState, useEffect } from "react";
  import { useDispatch } from "react-redux";
  import {login} from "../reducers/user";

export default function Welcome({navigation}) {
  const dispatch=useDispatch();
 
    const goTab=()=>{
      navigation.navigate('TabNavigator');
      dispatch(login({userName:'boucif',token:'D6S9LufPKUv9irpPwJiivxig91Wk7Azr'}))
    }
    return (
        <View style={styles.container}>
            <Text>Home</Text>

            <TouchableOpacity
            style={styles.bluebutton}
            onPress={() => {
              goTab(); // OUVRE API LOGIN GOOGLE
            }}>
            <Text style={styles.textbutton}> Login with Google</Text>
          </TouchableOpacity>
        </View>
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
      justifyContent: "space-between",
    },
    contents: {
      flex: "column",
      alignItems: "center",
      justifyContent: "space-between",
      height: "100%",
    },
    backgroundimage: {
      width: "104%",
      height: "100%",
      flex: 1,
      justifyContent: "center",
    },
    logo: {
      width: 150,
      height: 150,
    },

  });
  

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       height: "100%",
//       width: "100%",
//       alignItems: "center",
//       justifyContent: "center",
//       alignContent: "center",
//       justifyContent: "space-between",
//     },
//     textbutton: {
//       fontWeight: "600",
//       fontSize: 16,
//       color: "white",
//       textAlign: "center",
//     },
//     bluebutton: {
//       opacity: 0.93,
//       marginTop: 20,
//       backgroundColor: "#2C6DB4",
//       borderWidth: 0,
//       borderRadius: 10,
//       padding: 15,
//       width: 350,
//     },
  
//   });
  