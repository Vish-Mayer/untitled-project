import React, { useState } from "react";
import { Keyboard } from "react-native";
import { AuthContext } from "../contexts/AuthContext";

import { authStyles } from "../styles/local";

import Heading from "../components/Heading";
import Input from "../components/Input";
import PasswordInput from "../components/PasswordInput";
import FilledButton from "../components/FilledButton";
import TextButton from "../components/TextButton";
import Error from "../components/Error";
import AuthContainer from "../components/AuthContainer";
import choosePasswordIcon from "../helpers/choosePasswordIcon";
import Loading from "../components/Loading";
import sleep from "../utils/sleep";
import newFlashMessage from "../utils/newFlashMessage";

const LoginScreen = ({ navigation }) => {
  const { login } = React.useContext(AuthContext);

  const defaultState = { email: "", password: "" };
  const [inputs, setInputs] = useState(defaultState);
  const { email, password } = inputs;

  const [loading, setLoading] = useState(false);

  const [loadingMsg, setLoadingMsg] = useState();

  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError(false);
    try {
      setLoadingMsg("Please wait");
      setLoading(true);
      const res = await login(inputs);
      if (res.type === "success") {
        Keyboard.dismiss();
        setLoadingMsg("Verifying details");
        await sleep(3000);
        setLoading(false);
        newFlashMessage("Login Sucess", "", res.type);
        setInputs(defaultState);
        // navigation.pop();
        console.log(res);
      } else if (res.type === "error") {
        setError(res.msg);
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
      <Heading style={authStyles.title}>LOGIN</Heading>
      <Error message={error} />
      <Input
        style={authStyles.input}
        keyboardType={"email-address"}
        placeholder={"Email"}
        value={email}
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
        title={"Login"}
        style={authStyles.button}
        onPress={handleSubmit}
      />

      <TextButton
        title={"Don't have an account? Sign up here"}
        style={authStyles.button}
        onPress={() => {
          navigation.navigate("Register");
        }}
      />
      <Loading loading={loading} title={loadingMsg} />
    </AuthContainer>
  );
};

export default LoginScreen;
