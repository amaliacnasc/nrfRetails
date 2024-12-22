import TabNavigator from "@/navigators/TabNavigator";
import React from "react";
import { StatusBar } from "react-native";

export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <TabNavigator />
    </>
  );
}