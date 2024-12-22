import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "@/screens/HomeScreen";
import PostCard from "@/screens/PostScreen";
import InfoScreen from "@/screens/InfoScreen";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === "Início") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Linha do Tempo") {
            iconName = focused ? "git-network" : "git-network-outline";
          } else if (route.name === "Informações") {
            iconName = focused ? "information-circle" : "information-circle-outline";
          } else {
            iconName = "help-circle-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#04378b",
        tabBarInactiveTintColor: "#6e99df",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Início" component={HomeScreen} />
      <Tab.Screen name="Linha do Tempo" component={PostCard} />
      <Tab.Screen name="Informações" component={InfoScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;