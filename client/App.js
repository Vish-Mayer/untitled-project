import React, { useState, useMemo } from "react";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";

import { NavigationContainer } from "@react-navigation/native";

import { lightTheme } from "./src/themes/light";

import { LOCALIP, PORT } from "react-native-dotenv";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthStackNavigator } from "./src/navigators/AuthStackNavigator";
import { AuthContext } from "./src/contexts/AuthContext";
import sleep from "./src/utils/sleep";
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

  const auth = useMemo(
    () => ({
      login: async inputs => {
        {
          console.log("login", inputs);
          try {
            await sleep(1000);
            const response = await fetch(
              `http://${LOCALIP}:${PORT}/auth/login`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(inputs)
              }
            );
            const parsedResponse = await response.json();
            return parsedResponse;
          } catch (error) {
            console.log(error.message);
          }
        }
      },
      logout: () => {
        console.log("log out");
      },
      register: async inputs => {
        {
          console.log("register", inputs);
          try {
            await sleep(1000);
            const response = await fetch(
              `http://${LOCALIP}:${PORT}/auth/register`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(inputs)
              }
            );
            const parsedResponse = await response.json();
            return parsedResponse;
          } catch (error) {
            console.log(error.message);
          }
        }
      }
    }),
    [auth]
  );

  if (fontsLoaded) {
    return (
      <AuthContext.Provider value={auth}>
        <NavigationContainer theme={lightTheme}>
          <RootStack.Navigator
            screenOptions={{
              headerShown: false
            }}
          >
            <RootStack.Screen
              name={"AuthStack"}
              component={AuthStackNavigator}
            />
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
