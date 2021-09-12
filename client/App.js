import React, { useState, useMemo, useReducer, useEffect } from "react";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";

import { NavigationContainer } from "@react-navigation/native";

import { lightTheme } from "./src/themes/light";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { MainStackNavigator } from "./src/navigators/MainStackNavigator";
import { AuthStackNavigator } from "./src/navigators/AuthStackNavigator";
import { AuthContext } from "./src/contexts/AuthContext";

import useAuthentication from "./src/hooks/useAuthentication";
import useVerification from "./src/hooks/useVerification";
import FlashMsg from "./src/components/FlashMsg";

const getFonts = () =>
  Font.loadAsync({
    "nunito-regular": require("./assets/fonts/Nunito-Regular.ttf"),
    "nunito-bold": require("./assets/fonts/Nunito-Bold.ttf")
  });

const RootStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const { auth, state } = useAuthentication();
  const { isVerified } = useVerification(state);

  if (fontsLoaded) {
    return (
      <AuthContext.Provider value={auth}>
        <NavigationContainer theme={lightTheme}>
          <RootStack.Navigator
            screenOptions={{
              headerShown: false
            }}
          >
            {isVerified ? (
              <RootStack.Screen
                name={"MainStack"}
                component={MainStackNavigator}
              />
            ) : (
              <AuthStack.Screen
                name={"AuthStack"}
                component={AuthStackNavigator}
              />
            )}
          </RootStack.Navigator>
          <FlashMsg />
        </NavigationContainer>
      </AuthContext.Provider>
    );
  } else {
    return (
      <AppLoading
        startAsync={getFonts}
        onFinish={() => setFontsLoaded(true)}
        onError={console.warn}
      />
    );
  }
}
