import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNRestart from "react-native-restart";
import { setStatusBarHidden } from "expo-status-bar";

const Dashboard = ({ setAuth }) => {
  const handleSubmit = async () => {
    try {
      await AsyncStorage.getAllKeys().then(AsyncStorage.multiRemove);
      setAuth();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View>
      <Button title="Log out" onPress={handleSubmit} />
    </View>
  );
};

export default Dashboard;
