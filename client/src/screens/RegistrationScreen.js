import React, { useState, useEffect } from "react";
import { View } from "react-native";

import { AuthContext } from "../contexts/AuthContext";

import { globalStyles } from "../styles/global";
import { loginStyles } from "../styles/local";

import Heading from "../components/Heading";
import Input from "../components/Input";
import FilledButton from "../components/FilledButton";
import Error from "../components/Error";
import IconButton from "../components/IconButton";
import AuthContainer from "../components/AuthContainer";
import Loading from "../components/Loading";

const RegistrationScreen = ({ navigation }) => {
  const { register } = React.useContext(AuthContext);
  const defaultState = { name: "", email: "", password: "" };
  const [inputs, setInputs] = useState(defaultState);
  const [loading, setLoading] = useState(false);
  const { name, email, password } = inputs;
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await register(inputs);
      console.log(res);
      if (res.type === "success") {
        navigation.pop();
      }

      if (res.type === "error") {
        setError([res.msg]);
      }
    } catch (err) {
      console.log(err);
      setError(err);
      setLoading(false);
    }
  };

  return (
    <AuthContainer>
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
      <Error message={error} />
      <Input
        style={loginStyles.input}
        placeholder={"Username"}
        value={name}
        onChangeText={text => {
          setInputs({ ...inputs, name: text });
        }}
      />
      <Input
        style={loginStyles.input}
        placeholder={"Email"}
        value={email}
        keyboardType={"email-address"}
        onChangeText={text => {
          setInputs({ ...inputs, email: text });
        }}
      />
      <Input
        style={loginStyles.input}
        placeholder={"Password"}
        value={password}
        secureTextEntry
        onChangeText={text => {
          setInputs({ ...inputs, password: text });
        }}
      />
      <FilledButton
        title={"Create Account"}
        style={loginStyles.button}
        onPress={handleSubmit}
      />
      <Loading loading title={"Please wait..."} />
    </AuthContainer>
  );
};

export default RegistrationScreen;
