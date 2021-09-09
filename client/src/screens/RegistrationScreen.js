import React, { useState, useEffect } from "react";

import { AuthContext } from "../contexts/AuthContext";
import { loginStyles } from "../styles/local";

import { showMessage } from "react-native-flash-message";

import Heading from "../components/Heading";
import Input from "../components/Input";
import FilledButton from "../components/FilledButton";
import Error from "../components/Error";
import IconButton from "../components/IconButton";
import AuthContainer from "../components/AuthContainer";
import Loading from "../components/Loading";
import sleep from "../utils/sleep";
import newFlashMessage from "../utils/newFlashMessage";

const RegistrationScreen = ({ navigation }) => {
  const { register } = React.useContext(AuthContext);

  const defaultState = { name: "", email: "", password: "" };
  const [inputs, setInputs] = useState(defaultState);
  const { name, email, password } = inputs;

  const [loading, setLoading] = useState(false);

  const [loadingMsg, setLoadingMsg] = useState();

  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      setLoadingMsg("Please wait");
      setLoading(true);
      const res = await register(inputs);
      console.log(res);
      if (res.type === "success") {
        setLoadingMsg("Creating new account");
        await sleep(3000);
        navigation.pop();
        newFlashMessage(res.msg, res.description, res.type);
      }

      if (res.type === "error") {
        setError([res.msg]);
      }
      setLoading(false);
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

      <Loading loading={loading} title={loadingMsg} />
    </AuthContainer>
  );
};

export default RegistrationScreen;
