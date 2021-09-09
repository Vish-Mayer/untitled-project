import React from "react";
import { View, StyleSheet } from "react-native";
import { globalStyles } from "../styles/global";

const AuthContainer = ({ children }) => {
  return <View style={globalStyles.container}>{children}</View>;
};

export default AuthContainer;
