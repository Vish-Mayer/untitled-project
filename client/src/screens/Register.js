import React from "react";
import { Text, View, TextInput, Button, StyleSheet } from "react-native";
import { Formik } from "formik";
import Unorderedlist from "react-native-unordered-list";
import { useRegisterAPI } from "../hooks/useRegisterAPI";

const Register = () => {
  const { setBody, error, success } = useRegisterAPI(null);

  const handleFormError = () => {
    if (error.type === "password") {
      const rules = error.passwordRules;
      const passwordMsg = <Text key={0}>{error.msg}: </Text>;
      const passwordRules = rules.map(item => (
        <Unorderedlist key={item}>
          <Text>{item}</Text>
        </Unorderedlist>
      ));
      return [passwordMsg, passwordRules];
    } else {
      return <Text>{error.msg}</Text>;
    }
  };

  return (
    <View>
      {error && handleFormError()}
      {success && success}
      <Text> Register </Text>
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        onSubmit={values => {
          setBody(values);
        }}
      >
        {props => (
          <View>
            <TextInput
              placeholder="Username"
              onChangeText={props.handleChange("name")}
              value={props.values.name}
            />
            <TextInput
              placeholder="Email"
              onChangeText={props.handleChange("email")}
              value={props.values.email}
            />
            <TextInput
              placeholder="Password"
              onChangeText={props.handleChange("password")}
              value={props.values.password}
            />

            <Button title="submit" color="green" onPress={props.handleSubmit} />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default Register;
