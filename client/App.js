import * as Font from "expo-font";
import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import {
  MemoryRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
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
export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (fontsLoaded) {
    return (
      <SafeAreaView>
        <Router>
          <View className="container">
            <Switch>
              <Route
                exact
                path="/login"
                render={props =>
                  !isAuthenticated ? (
                    <Login {...props} />
                  ) : (
                    <Redirect to="/dashboard" />
                  )
                }
              />
              <Route
                exact
                path="/"
                render={props =>
                  !isAuthenticated ? (
                    <Register {...props} />
                  ) : (
                    <Redirect to="/login" />
                  )
                }
              />
              <Route
                exact
                path="/dashboard"
                render={props =>
                  isAuthenticated ? (
                    <Dashboard {...props} />
                  ) : (
                    <Redirect to="/login" />
                  )
                }
              />
            </Switch>
          </View>
        </Router>
      </SafeAreaView>
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
