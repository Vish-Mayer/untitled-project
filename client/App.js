import * as Font from "expo-font";
import React, { useState, useMemo } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppLoading from "expo-app-loading";
import { AuthStackNavigator } from "./src/navigators/AuthStackNavigator";
import { lightTheme } from "./src/themes/light";
import { AuthContext } from "./src/contexts/AuthContext";
import { LOCALIP, PORT } from "react-native-dotenv";
import sleep from "./src/utils/sleep";

const getFonts = () =>
  Font.loadAsync({
    "nunito-regular": require("./assets/fonts/Nunito-Regular.ttf"),
    "nunito-bold": require("./assets/fonts/Nunito-Bold.ttf")
  });

const RootStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();

export default function App({ navigation }) {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [response, setResponse] = useState();

  const auth = useMemo(
    () => ({
      login: () => {
        console.log("log in");
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
    [response]
  );

  const makeRequest = async inputs => {
    try {
      const response = await fetch(`http://${LOCALIP}:${PORT}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputs)
      });
      const parsedResponse = await response.json();
      setResponse(parsedResponse);
    } catch (error) {
      console.log(error.message);
    }
  };

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
