import React from "react";
import { View } from "react-native";
import { globalStyles } from "../styles/global";
import { TouchableWithoutFeedback, Keyboard } from "react-native";

const AuthContainer = ({ children }) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={globalStyles.container}>{children}</View>
    </TouchableWithoutFeedback>
  );
};

export default AuthContainer;
