import React from "react";
import { View, Text } from "react-native";
import { globalStyles } from "../styles/global";

const Heading = ({ children, style, ...props }) => {
  return (
    <Text {...props} style={[globalStyles.titleText, style]}>
      {children}
    </Text>
  );
};

export default Heading;
