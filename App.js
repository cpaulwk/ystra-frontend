import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
// Import des modules react-navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
// Import de HomePage
import HomeScreen from "./screens/HomeScreen";
import RegisterLogin from "./screens/RegisterLogin";
import Register from "./screens/Register";
//ajoutez la création de la navigation par Stack et par BottomTab
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
//import de useEffect
import React, { useEffect } from "react";
//

export default function App({ navigation }) {
  // MARCHE PAS !!!
  // useEffect(() => {
  //   setTimeout(() => {
  //     // Accédez à la propriété "navigate" de l'objet "navigation"
  //     navigation.navigate("Resgisterlogin");
  //   }, 2000); // Transition après 2 secondes
  // }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Resgisterlogin" component={RegisterLogin} /> */}
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

// const TabNavigator = () => {
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         tabBarIcon: ({ color, size }) => {
//           let iconName = "";

//           if (route.name === "Map") {
//             iconName = "map-pin";
//           } else if (route.name === "Navigation") {
//             iconName = "location-arrow";
//           } else if (route.name === "Home") {
//             iconName = "home";
//           }

//           return <FontAwesome name={iconName} size={size} color={color} />;
//         },
//         tabBarActiveTintColor: "#ec6e5b",
//         tabBarInactiveTintColor: "#335561",
//         headerShown: false,
//       })}>
//       <Tab.Screen name="Map" component={MapScreen} />
//       <Tab.Screen name="Home" component={HomeScreen} />
//       <Tab.Screen name="Navigation" component={NavigationScreen} />
//     </Tab.Navigator>
//   );
// };
