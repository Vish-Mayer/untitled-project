import * as Font from "expo-font";
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppLoading from "expo-app-loading";
import Dashboard from "./src/screens/Dashboard";
import Register from "./src/screens/Register";
import Login from "./src/screens/Login";
import { globalStyles } from "./src/styles/global";

const getFonts = () =>
  Font.loadAsync({
    "nunito-regular": require("./assets/fonts/Nunito-Regular.ttf"),
    "nunito-bold": require("./assets/fonts/Nunito-Bold.ttf")
  });

const Stack = createNativeStackNavigator();
export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (fontsLoaded) {
    return (
      <NavigationContainer>
        {!isAuthenticated ? (
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Dashboard" component={Dashboard} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
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
