import { View, StyleSheet, Text } from "react-native";
import ReturnButton from "./ReturnButton";
import tw from "twrnc";

export default function Header(props) {
  let returnButtonComponent = <></>;
  if (props.doesContainReturnButtonComponent) {
    returnButtonComponent = (
      <ReturnButton withHeader={true} onPress={props.onPress} />
    );
  }
  return (
    <View style={styles.header}>
      <View style={tw`w-[20%] flex justify-center items-end`}>
        {returnButtonComponent}
      </View>
      <Text style={tw`text-6 font-bold opacity-70 w-[60%] text-center`}>
        {props.title}
      </Text>
      <View style={tw`w-[20%]`}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    zIndex: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F2EFEA",
    paddingTop: "12%",
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
