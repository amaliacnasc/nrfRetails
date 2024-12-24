import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "@/screens/LoginScreen";
import TabNavigator from "@/navigators/TabNavigator";
import { FavoritesProvider } from "@/context/FavoritesContext";

const Stack = createStackNavigator();

export default function App() {
  return (
    <FavoritesProvider>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
      </Stack.Navigator>
    </FavoritesProvider>
  );
}