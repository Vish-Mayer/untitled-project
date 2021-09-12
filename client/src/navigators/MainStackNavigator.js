import * as Font from "expo-font";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DashboardScreen from "../screens/Dashboard";

const MainStack = createNativeStackNavigator();

export function MainStackNavigator() {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
        presentation: "card"
      }}
    >
      <MainStack.Screen name={"Dashboard"} component={DashboardScreen} />
    </MainStack.Navigator>
  );
}
