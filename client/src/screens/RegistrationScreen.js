import React, { useState } from "react";
import { Keyboard } from "react-native";

import { AuthContext } from "../contexts/AuthContext";
import { authStyles } from "../styles/local";

import Heading from "../components/Heading";
import Input from "../components/Input";
import FilledButton from "../components/FilledButton";
import Error from "../components/Error";
import IconButton from "../components/IconButton";
import AuthContainer from "../components/AuthContainer";
import Loading from "../components/Loading";
import sleep from "../utils/sleep";
import { createFlashMessage } from "../utils/createFlashMessage";
import PasswordInput from "../components/PasswordInput";
import choosePasswordIcon from "../helpers/choosePasswordIcon";

const RegistrationScreen = ({ navigation }) => {
  const { register } = React.useContext(AuthContext);

  const defaultState = { name: "", email: "", password: "" };

  const [inputs, setInputs] = useState(defaultState);

  const { name, email, password } = inputs;

  const [loading, setLoading] = useState(false);

  const [loadingMsg, setLoadingMsg] = useState();

  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const [error, setError] = useState("");

  const handleSuccess = async res => {
    Keyboard.dismiss();
    setLoadingMsg("Creating new account");
    await sleep(3000);
    setLoading(false);
    setInputs(defaultState);
    createFlashMessage({
      message: res.msg,
      description: res.description,
      type: res.type
    });
    navigation.pop();
  };

  const handleError = res => {
    createFlashMessage({
      message: res.msg,
      description: res.description,
      type: "danger"
    });
  };

  const handleSubmit = async () => {
    setError("");
    try {
      setLoadingMsg("Please wait");
      setLoading(true);
      const res = await register(inputs);
      if (res.type === "success") {
        handleSuccess(res);
      } else if (res.type === "error") {
        handleError(res);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setError(err);
      setLoading(false);
    }
  };

  return (
    <AuthContainer>
      <Heading style={authStyles.title}>REGISTER</Heading>
      <IconButton
        name="arrow-back-circle-outline"
        style={authStyles.returnIcon}
        size={32}
        color={"#333"}
        onPress={() => {
          navigation.navigate("Login");
        }}
      />
      <Error message={error} />
      <Input
        style={authStyles.input}
        placeholder={"Username"}
        value={name}
        onChangeText={text => {
          setInputs({ ...inputs, name: text });
        }}
      />
      <Input
        style={authStyles.input}
        placeholder={"Email"}
        value={email}
        keyboardType={"email-address"}
        onChangeText={text => {
          setInputs({ ...inputs, email: text });
        }}
      />
      <PasswordInput
        secureTextEntry={isPasswordHidden}
        iconName={choosePasswordIcon(isPasswordHidden)}
        onPress={() => {
          setIsPasswordHidden(!isPasswordHidden);
        }}
        placeholder={"Password"}
        value={password}
        onChangeText={text => {
          setInputs({ ...inputs, password: text });
        }}
      />
      <FilledButton
        title={"Create Account"}
        style={authStyles.button}
        onPress={handleSubmit}
      />

      <Loading loading={loading} title={loadingMsg} />
    </AuthContainer>
  );
};

export default RegistrationScreen;
