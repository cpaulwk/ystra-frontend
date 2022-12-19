import {KeyboardAvoidingView, View,Text,TouchableOpacity,StyleSheet, TextInput,Image } from "react-native";
import { useSelector } from "react-redux";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import BoxArrowUpIcon from "react-native-bootstrap-icons/icons/box-arrow-up";
import BasketFillIcon from "react-native-bootstrap-icons/icons/basket-fill";
import tw from "twrnc";


export default function Basket({ navigation }) {
    const user=useSelector(state=> state.user.value)

    const tabShop= user.basket.map((data,index)=>{
        return(
            <View style={tw `items-center`} key={index}>
            {/* <Image source={ require('../assets/homescreen-background.jpg') } style={styles.photo}></Image> */}
            <View >
            <Image source={ {uri:data.url} } style={tw `w-40 h-40 m-1`}></Image>
            <Text>Price {data.price}</Text>
            <Text>quantity {data.quantity}</Text>
 
            </View>
  
            
          </View>
        )
    })
    return (
        <View>
            <Text>Basket</Text>
            {tabShop}
        </View>
    );
}