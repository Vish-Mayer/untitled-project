import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Ionicons from "react-native-vector-icons/Ionicons";

import Settings from "../screens/Settings";
import GolfBag from "../screens/GolfBag";
import Home from "../screens/Home";
import TeeOff from "../screens/TeeOff";
import chooseTabBarIcon from "../helpers/chooseTabBarIcon";

const MainStack = createBottomTabNavigator();

export function MainStackNavigator() {
  return (
    <MainStack.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          return (
            <Ionicons
              name={chooseTabBarIcon(focused, route)}
              size={size}
              color={color}
            />
          );
        },
        tabBarActiveTintColor: "green",
        tabBarInactiveTintColor: "gray"
      })}
    >
      <MainStack.Screen
        name="Home"
        component={Home}
        options={{
          title: "Home"
        }}
      />

      <MainStack.Screen
        name="TeeOff"
        component={TeeOff}
        options={{
          title: "Tee off"
        }}
      />

      <MainStack.Screen
        name="GolfBag"
        component={GolfBag}
        options={{
          title: "Golf bag"
        }}
      />

      <MainStack.Screen
        name="Settings"
        component={Settings}
        options={{
          title: "Settings"
        }}
      />
    </MainStack.Navigator>
  );
}
