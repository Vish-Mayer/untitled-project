import React, { useState } from "react";
import { globalStyles } from "../styles/global";
import { useLoginAPI } from "../hooks/useLoginAPI";
import Heading from "../components/Heading";
import Input from "../components/Input";
import { loginStyles } from "../styles/local";
import FilledButton from "../components/FilledButton";
import TextButton from "../components/TextButton";
import Error from "../components/Error";
import { AuthContext } from "../contexts/AuthContext";
import AuthContainer from "../components/AuthContainer";
import FlashMsg from "../components/FlashMsg";
import FlashMessage from "react-native-flash-message";

const LoginScreen = ({ navigation }) => {
  const { login } = React.useContext(AuthContext);
  return (
    <AuthContainer>
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
        onPress={
          (onPress = () => {
            login();
          })
        }
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
    </AuthContainer>
  );
};

export default LoginScreen;
