import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { globalStyles } from "../styles/global";
import Icon from "react-native-vector-icons/Ionicons";

const IconButton = ({ name, style, size, color, onPress }) => {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <Icon name={name} size={size} color={color} />
    </TouchableOpacity>
  );
};

export default IconButton;
