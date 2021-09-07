import React from "react";
import { View, Text } from "react-native";
import { globalStyles } from "../styles/global";

const Error = ({ message }) => {
  return <Text style={globalStyles.errorMsg}>{message}</Text>;
};

export default Error;
