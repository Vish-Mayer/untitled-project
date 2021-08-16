import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, Button } from "react-native";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Dashboard from "./components/Dashboard";
import Register from "./components/Register";
import Login from "./components/Login";

export default function App() {
  const [counter, setCounter] = useState(0);
  return (
    <SafeAreaView style={styles.container}>
      <Router>
        <div className="container">
          <Switch>
            <Route exact path="/login" render={props => <Login {...props} />} />
            <Route
              exact
              path="/register"
              render={props => <Register {...props} />}
            />
            <Route
              exact
              path="/dashboard"
              render={props => <Dashboard {...props} />}
            />
          </Switch>
        </div>
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
