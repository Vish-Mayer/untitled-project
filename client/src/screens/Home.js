import React, { useContext } from "react";
import { View, Text } from "react-native";
import { globalStyles } from "../styles/global";
import { UserContext } from "../contexts/UserContext";

const Home = () => {
  const user = useContext(UserContext);

  console.log(user);
  return (
    <View style={globalStyles.container}>
      <Text> {user && user.name}</Text>
      <Text> Home screen</Text>
    </View>
  );
};

export default Home;
