import React from "react";
import { View, Text } from "react-native";
import { globalStyles, privateStyles } from "../styles/global";
import IconButton from "./IconButton";

const LogOutConfirmation = ({ logOutClicked, yes, no }) => {
  if (!logOutClicked) {
    return <View />;
  }
  return (
    <View style={globalStyles.overlay}>
      <View style={globalStyles.logOutconfirmation}>
        <Text style={globalStyles.loadingText}>
          Are you sure you want to logout?
        </Text>
        <IconButton
          name="checkmark-outline"
          style={globalStyles.yesIcon}
          size={40}
          color={"green"}
          onPress={yes}
        />
        <IconButton
          name="close-outline"
          style={globalStyles.noIcon}
          size={40}
          color={"red"}
          onPress={no}
        />
      </View>
    </View>
  );
};

export default LogOutConfirmation;
