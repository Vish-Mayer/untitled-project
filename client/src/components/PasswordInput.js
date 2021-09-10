import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { globalStyles } from "../styles/global";
import IconButton from "./IconButton";

const PasswordInput = ({ onPress, iconName, style, ...props }) => {
  const styles = StyleSheet.create({
    searchSection: {
      backgroundColor: "#e8e8e8",
      width: "100%",
      marginTop: 10,
      borderRadius: 8
    },
    searchIcon: {
      position: "absolute",
      right: 25,
      top: 10
    }
  });
  return (
    <View style={styles.searchSection}>
      <TextInput {...props} style={[globalStyles.input, style]} />
      <IconButton
        name={iconName}
        style={styles.searchIcon}
        size={32}
        color={"#333"}
        onPress={onPress}
      />
    </View>
  );
};

export default PasswordInput;
