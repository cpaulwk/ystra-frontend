import { TouchableOpacity, View , Text} from "react-native";
import  {StripeProvider} from '@stripe/stripe-react-native';
import tw from 'twrnc';
import { useSelector } from "react-redux";

export default function Paiement({navigation}){

    const user= useSelector((state)=> state.user.value)
    const total = user.basket.reduce((accu, current) => accu + current.price, 0);

    const handlePay  = ()=> {
      navigation.navigate("CheckoutScreen");
    }

    return(
        // <StripeProvider publishableKey="pk_test_51Ma3OsFo81GGwjYJ2jgvbWDBVfs1qDX95WhLoTvTQ3Fx5CAgCgTmfpWpzU2L0RdZUWvbExD5CnMVXno9vxfGYmAA001xlVdXRt">
        <View>

            <View
                style={tw`flex-row bg-[#F4F3EE] justify-between w-[80%] rounded-2 border border-[#AFAFAF] p-5 mb-5`}
                >
                <Text style={tw`text-6 font-medium`}>Total:</Text>
                <Text style={tw`text-6 font-medium`}>{`${total}€`}</Text>
                </View>
                <View style={tw`flex-row justify-center w-full mb-[20%]`}>
                <TouchableOpacity
                    style={tw` flex justify-center items-center bg-[#2C6DB4] rounded-1.75 h-15 w-[85%] border-[#161E44]`}
                    onPress={() => handlePay()}
                >
                    <Text style={tw`font-medium text-2xl text-[#FFFF]`}>
                    Confirm payment
                    </Text>
                </TouchableOpacity>
                </View>    
        </View>        
        // </StripeProvider>

    );
}