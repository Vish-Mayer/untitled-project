import React, { useState } from "react";
import { View, Button, TextInput, Text, StyleSheet } from "react-native";
import { globalStyles } from "../styles/global";
import { useLoginAPI } from "../hooks/useLoginAPI";
import Heading from "../components/Heading";
import Input from "../components/Input";
import { loginStyles } from "../styles/local";
import FilledButton from "../components/FilledButton";
import TextButton from "../components/TextButton";
import Error from "../components/Error";

const LoginScreen = ({ navigation }) => {
  return (
    <View style={globalStyles.container}>
      <Heading style={loginStyles.title}>LOGIN</Heading>
      <Error message={""} />
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
        title={"Login"}
        style={loginStyles.button}
        onPress={(onPress = () => {})}
      />

      <TextButton
        title={"Don't have an account? Sign up here"}
        style={loginStyles.button}
        onPress={
          (onPress = () => {
            navigation.navigate("Register");
          })
        }
      />
    </View>
  );
};

export default LoginScreen;
