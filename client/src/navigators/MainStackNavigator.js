import * as Font from "expo-font";
import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import RegistrationScreen from "../screens/RegistrationScreen";
import LoginScreen from "../screens/LoginScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { globalStyles } from "../styles/global";
import { create } from "xmlbuilder";
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
