import React, { useContext } from "react";
import { View, Text } from "react-native";

import { globalStyles } from "../styles/global";

import { UserContext } from "../contexts/UserContext";
import GolfClubList from "../components/GolfClubList";

const GolfBag = () => {
  const user = useContext(UserContext);

  return (
    <View style={globalStyles.container}>
      <GolfClubList user_id={user.id} />
    </View>
  );
};

export default GolfBag;
