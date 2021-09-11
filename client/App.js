import React, { useState, useMemo, useReducer, useEffect } from "react";
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
import createAction from "./src/utils/createAction";

const getFonts = () =>
  Font.loadAsync({
    "nunito-regular": require("./assets/fonts/Nunito-Regular.ttf"),
    "nunito-bold": require("./assets/fonts/Nunito-Bold.ttf")
  });

const RootStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "SET_USER":
          return {
            ...state,
            user: { ...action.payload }
          };
        default:
          return state;
      }
    },
    {
      user: undefined
    }
  );

  useEffect(() => {
    console.log(state.user);
  }, [state]);

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
            const user = {
              email: inputs.email,
              token: parsedResponse.token
            };

            if (parsedResponse.type === "success") {
              dispatch(createAction("SET_USER", user));
              return parsedResponse;
            } else {
              return parsedResponse;
            }
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
    []
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
