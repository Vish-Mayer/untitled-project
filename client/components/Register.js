import React, { Fragment, useState } from "react";
import {
  FlatList,
  Text,
  StyleSheet,
  View,
  TextInput,
  Button
} from "react-native";
import Unorderedlist from "react-native-unordered-list";
import { LOCALIP, PORT } from "react-native-dotenv";

const Register = () => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");
  const { name, email, password } = inputs;

  const onSubmitForm = async e => {
    e.preventDefault();

    try {
      const body = { name, email, password };
      console.log(body);
      const response = await fetch(`http://${LOCALIP}:${PORT}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      const parsedResponse = await response.json();
      console.log(parsedResponse);
      setMessage(parsedResponse);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleMessage = () => {
    if (message.type === "password") {
      const rules = message.passwordRules;
      const passwordMsg = <Text key={0}>{message.msg}:</Text>;
      const passwordRules = rules.map(item => (
        <Unorderedlist key={item}>
          <Text>{item}</Text>
        </Unorderedlist>
      ));
      return [passwordMsg, passwordRules];
    } else {
      return <Text>{message.msg}</Text>;
    }
  };

  return (
    <View>
      {handleMessage()}
      <Text> Register </Text>

      <View>
        <TextInput
          placeholder="name"
          onChangeText={text => {
            setInputs({ ...inputs, name: text });
          }}
        />
        <TextInput
          placeholder="Email"
          onChangeText={text => {
            setInputs({ ...inputs, email: text });
          }}
        />
        <TextInput
          secureTextEntry={true}
          placeholder="Password"
          onChangeText={text => {
            setInputs({ ...inputs, password: text });
          }}
        />
        <Button title="Register" onPress={onSubmitForm} />
      </View>
    </View>
  );
};

export default Register;
