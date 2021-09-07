import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { globalStyles } from "../styles/global";

const FilledButton = ({ title, style, onPress }) => {
  return (
    <TouchableOpacity
      style={[globalStyles.filledButton, style]}
      onPress={onPress}
    >
      <Text style={globalStyles.btnText}>{title.toUpperCase()}</Text>
    </TouchableOpacity>
  );
};

export default FilledButton;
