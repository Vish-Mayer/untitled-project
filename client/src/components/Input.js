import React from "react";
import { View, Text, TextInput } from "react-native";
import { globalStyles } from "../styles/global";

const Input = ({ style, ...props }) => {
  return <TextInput {...props} style={[globalStyles.input, style]} />;
};

export default Input;
