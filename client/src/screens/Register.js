import React, { useState, useEffect } from "react";
import { Text, View, TextInput, Button, StyleSheet } from "react-native";
import Unorderedlist from "react-native-unordered-list";
import { useRegisterAPI } from "../hooks/useRegisterAPI";

const Register = () => {
  const defaultValues = { name: "", email: "", password: "" };
  const [inputs, setInputs] = useState(defaultValues);
  const { name, email, password } = inputs;
  const { setBody, response, success } = useRegisterAPI(null);

  const handleFormResponse = () => {
    if (response.type === "password_error") {
      const rules = response.passwordRules;
      const passwordMsg = (
        <Text style={{ color: "red" }} key={0}>
          {response.msg}:{" "}
        </Text>
      );
      const passwordRules = rules.map(item => (
        <Unorderedlist key={item}>
          <Text>{item}</Text>
        </Unorderedlist>
      ));
      return [passwordMsg, passwordRules];
    } else if (response.type === "success") {
      return <Text style={{ color: "green" }}>{response.msg}</Text>;
    } else {
      return <Text style={{ color: "red" }}>{response.msg}</Text>;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    setBody(inputs);
  };

  useEffect(() => {
    setInputs(defaultValues);
    console.log(success);
  }, [success]);

  return (
    <View style={styles.container}>
      {response && handleFormResponse()}
      <Text style={styles.titleText}> Register </Text>

      <View>
        <TextInput
          placeholder="name"
          value={name}
          onChangeText={text => {
            setInputs({ ...inputs, name: text });
          }}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={text => {
            setInputs({ ...inputs, email: text });
          }}
        />
        <TextInput
          secureTextEntry={true}
          value={password}
          placeholder="Password"
          onChangeText={text => {
            setInputs({ ...inputs, password: text });
          }}
        />
        <Button title="Register" onPress={handleSubmit} />
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    padding: 24
  },
  titleText: {
    fontFamily: "nunito-bold",
    fontSize: 18
  }
});
