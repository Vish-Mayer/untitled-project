import * as Font from "expo-font";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import RegistrationScreen from "../screens/RegistrationScreen";
import LoginScreen from "../screens/LoginScreen";

const AuthStack = createNativeStackNavigator();
const LoginStack = createNativeStackNavigator();

export function AuthStackNavigator() {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
        presentation: "card"
      }}
    >
      <AuthStack.Screen name={"LoginStack"}>
        {() => (
          <LoginStack.Navigator
            screenOptions={{
              headerShown: false,
              presentation: "card"
            }}
          >
            <LoginStack.Screen name="Login" component={LoginScreen} />
          </LoginStack.Navigator>
        )}
      </AuthStack.Screen>
      <AuthStack.Screen name={"Register"} component={RegistrationScreen} />
    </AuthStack.Navigator>
  );
}
