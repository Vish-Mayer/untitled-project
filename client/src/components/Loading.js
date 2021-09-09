import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { globalStyles } from "../styles/global";

const Loading = ({ loading, title }) => {
  if (!loading) {
    return <View />;
  }
  return (
    <View style={globalStyles.overlay}>
      <View style={globalStyles.loadingContainer}>
        <ActivityIndicator color={"black"} />
        <Text style={globalStyles.loadingText}>{title}</Text>
      </View>
    </View>
  );
};

export default Loading;
