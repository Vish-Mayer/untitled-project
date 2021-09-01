import React, { useState, useEffect } from "react";
import { Text, View, TextInput, Button, StyleSheet } from "react-native";
import Unorderedlist from "react-native-unordered-list";
import { useRegisterAPI } from "../hooks/useRegisterAPI";
import { globalStyles } from "../styles/global";

const Register = () => {
  const defaultValues = { name: "", email: "", password: "" };
  const [inputs, setInputs] = useState(defaultValues);
  const { name, email, password } = inputs;
  const { setBody, response, success } = useRegisterAPI(null);

  const handleFormResponse = () => {
    if (response.type === "password_error") {
      const rules = response.passwordRules;
      const passwordMsg = <Text key={0}>{response.msg}: </Text>;
      const passwordRules = rules.map(item => (
        <Unorderedlist bulletUnicode={0x2023} key={item}>
          <Text>{item}</Text>
        </Unorderedlist>
      ));
      return (
        <View style={globalStyles.errorMsg}>
          {[passwordMsg, passwordRules]}
        </View>
      );
    } else if (response.type === "success") {
      return <Text style={globalStyles.successMsg}>{response.msg}</Text>;
    } else {
      return <Text style={globalStyles.errorMsg}>{response.msg}</Text>;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    setBody(inputs);
  };

  useEffect(() => {
    setInputs(defaultValues);
  }, [success]);

  return (
    <View style={globalStyles.container}>
      {response && handleFormResponse()}

      <View>
        <TextInput
          style={globalStyles.input}
          placeholder="Name"
          value={name}
          onChangeText={text => {
            setInputs({ ...inputs, name: text });
          }}
        />
        <TextInput
          style={globalStyles.input}
          placeholder="Email"
          value={email}
          onChangeText={text => {
            setInputs({ ...inputs, email: text });
          }}
        />
        <TextInput
          style={globalStyles.input}
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
