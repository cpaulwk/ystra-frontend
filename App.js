import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

// Import des modules react-navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import HouseFillIcon from "react-native-bootstrap-icons/icons/house-fill";
import Basket2FillIcon from "react-native-bootstrap-icons/icons/basket2-fill";
import PersonCircleIcon from "react-native-bootstrap-icons/icons/person-circle";

// Import de HomePage
// import Welcome from "./screens/Welcome";
import Welcome from "./screens/WelcomeTailwind";
import Home from "./screens/Home";
import Gallery from "./screens/Gallery";
import Basket from "./screens/Basket";
import Profile from "./screens/Profile";
import Cart from "./screens/Cart";

//import Reducers
import user from "./reducers/user";
import product from  "./reducers/product";

const store = configureStore({
  reducer: { user,product },
});

//ajoutez la création de la navigation par Stack et par BottomTab
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size, focused }) => {
          let iconName = "";

          if (route.name === "Home") {
            iconName = "home"; //BsFillHouseFill';
            return <HouseFillIcon size={size} color={color} />;
          } else if (route.name === "Gallery") {
            //iconName = 'shopping-basket';//'BsBasket2Fill';
            if (focused) {
              return (
                <Image
                  style={{ width: size, height: size, color: color }}
                  source={require("./assets/logoystra.png")}
                />
              );
            }
            return (
              <Image
                style={{ width: size, height: size, color: color }}
                source={require("./assets/logoystraoff.png")}
              />
            );
          } else if (route.name === "Cart") {
            iconName = "shopping-basket"; //'BsBasket2Fill';
            return <Basket2FillIcon size={size} color={color} />;
          }
          if (route.name === "Profile") {
            iconName = "user-times"; //'BsPersonCircle';
            return <PersonCircleIcon size={size} color={color} />;
          }
          // return <HouseFillIcon size={size} color={color}/>
          // return <FontAwesome name={'camera'} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#2c6db4",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Gallery" component={Gallery} />
      <Tab.Screen name="Cart" component={Cart} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

//
export default function App({ navigation }) {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
          <Stack.Screen name="Basket" component={Basket} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: "30%",
    height: "30%",
  },
});
