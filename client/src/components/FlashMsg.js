import React from "react";
import FlashMessage from "react-native-flash-message";
import Icon from "react-native-vector-icons/Ionicons";

const SuccessMessage = () => {
  return <FlashMessage position="top" duration={4000} icon="auto" />;
};

export default SuccessMessage;
