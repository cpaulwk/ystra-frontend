import { View,Text } from "react-native";

import { useSelector } from "react-redux";


export default function Gallery({ navigation }) {
    
    const user=useSelector(state=> state.user.value);

    return (
        <View>
            <Text>Gallery</Text>
            <Text>{user.userName}  {user.token}</Text>
        </View>
    );
}