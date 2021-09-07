import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { globalStyles } from "../styles/global";

const TextButton = ({ title, style, onPress }) => {
  return (
    <TouchableOpacity
      style={[globalStyles.textButton, style]}
      onPress={onPress}
    >
      <Text style={globalStyles.textBtnText}>{title.toUpperCase()}</Text>
    </TouchableOpacity>
  );
};

export default TextButton;
