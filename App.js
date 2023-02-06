import { Image } from "react-native";
import { Provider } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

//Import redux-persist
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

// Import des modules react-navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HouseFillIcon from "react-native-bootstrap-icons/icons/house-fill";
import Basket2FillIcon from "react-native-bootstrap-icons/icons/basket2-fill";
import PersonCircleIcon from "react-native-bootstrap-icons/icons/person-circle";

import Welcome from "./screens/Welcome";
import Home from "./screens/Home";
import Gallery from "./screens/Gallery";
import Basket from "./screens/Basket";
import Profile from "./screens/Profile";
import Cart from "./screens/Cart";
import Adress from "./screens/Adress";
import OrderConfirmation from "./screens/OrderConfirmation";
import CreditCards from "./screens/CreditCards";

//import Reducer
import user from "./reducers/user";
import product from "./reducers/product";
import order from "./reducers/order";

const reducers = combineReducers({ user, product, order });
const persistConfig = { key: "ystra app", storage: AsyncStorage };

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

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
export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="TabNavigator" component={TabNavigator} />
            <Stack.Screen name="Basket" component={Basket} />
            <Stack.Screen name="Adress" component={Adress} />
            <Stack.Screen name="CreditCards" component={CreditCards} />
            <Stack.Screen
              name="OrderConfirmation"
              component={OrderConfirmation}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
