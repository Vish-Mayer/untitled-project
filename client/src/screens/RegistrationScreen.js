import React, { useState, useEffect } from "react";
import { Text, View, TextInput, Button, StyleSheet } from "react-native";
import { globalStyles } from "../styles/global";
import { loginStyles } from "../styles/local";

import Heading from "../components/Heading";
import Input from "../components/Input";

import FilledButton from "../components/FilledButton";
import Error from "../components/Error";
import IconButton from "../components/IconButton";

const RegistrationScreen = ({ navigation }) => {
  return (
    <View style={globalStyles.container}>
      <Heading style={loginStyles.title}>REGISTER</Heading>
      <IconButton
        name="arrow-back-circle-outline"
        style={loginStyles.returnIcon}
        size={32}
        color={"#333"}
        onPress={
          (onPress = () => {
            navigation.navigate("Login");
          })
        }
      />
      <Error message={""} />
      <Input style={loginStyles.input} placeholder={"Username"} />
      <Input
        style={loginStyles.input}
        placeholder={"Email"}
        keyboardType={"email-address"}
      />
      <Input
        style={loginStyles.input}
        placeholder={"Password"}
        secureTextEntry
      />
      <FilledButton
        title={"Create Account"}
        style={loginStyles.button}
        onPress={(onPress = () => {})}
      />
    </View>
  );
};

export default RegistrationScreen;
