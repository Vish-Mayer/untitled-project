import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, Button } from "react-native";
import {
  MemoryRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Dashboard from "./src/screens/Dashboard";
import Register from "./src/screens/Register";
import Login from "./src/screens/Login";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
