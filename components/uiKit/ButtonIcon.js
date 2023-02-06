import {TouchableOpacity} from 'react-native';
import tw from "twrnc";
import FontAwesome from "react-native-vector-icons/FontAwesome";


//export default function BtnIcon(props){
export default function ButtonIcon (props){

    return(
        <TouchableOpacity
        style={tw`border flex justify-center items-center bg-white opacity-70 rounded-50 w-8 h-8 pl-0.2 pt-0.2`}
        >
            <FontAwesome
                onPress={() => props.onPress()}
                name={props.name}
                size={props.size || 20}
                style={props.style || null}
                selectionColor={props.selectionColor || null}                
            />
        </TouchableOpacity>
    )

}