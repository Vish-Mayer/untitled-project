import React from "react";
import { Text, View, TextInput, Button, StyleSheet } from "react-native";
import { Formik } from "formik";
import Unorderedlist from "react-native-unordered-list";
import { useRegisterAPI } from "../hooks/useRegisterAPI";

const Register = () => {
  const { setBody, response } = useRegisterAPI(null);

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

  return (
    <View>
      {response && handleFormResponse()}

      <Text> Register </Text>
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        onSubmit={(values, { resetForm }) => {
          setBody(values);
          resetForm();
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
