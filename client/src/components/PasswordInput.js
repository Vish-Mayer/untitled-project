import React from "react";
import { View, TextInput } from "react-native";
import { globalStyles } from "../styles/global";
import IconButton from "./IconButton";

const PasswordInput = ({ onPress, iconName, style, ...props }) => {
  return (
    <View style={globalStyles.passwordInput}>
      <TextInput {...props} style={style} />
      <IconButton
        name={iconName}
        style={globalStyles.hidePasswordIcon}
        size={32}
        color={"#333"}
        onPress={onPress}
      />
    </View>
  );
};

export default PasswordInput;
