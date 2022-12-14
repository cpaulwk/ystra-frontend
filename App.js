import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
// Import des modules react-navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
// Import de HomePage
import Home from "./screens/WelcomePage";
import Register from "./screens/Register";
import Login from "./screens/Login";

//ajoutez la création de la navigation par Stack et par BottomTab
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
//import de useEffect
import React, { useEffect } from "react";
import WelcomePage from "./screens/WelcomePage";
//
export default function App({ navigation }) {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="WelcomePage" component={WelcomePage} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
