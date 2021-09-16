import React from "react";
import { View, Text } from "react-native";
import useGetGolfBag from "../hooks/useGetGolfBag";

const GolfClubList = ({ user_id }) => {
  const { golfBagData } = useGetGolfBag(user_id);

  console.log(golfBagData);

  return (
    golfBagData &&
    golfBagData.map(function(club, i) {
      return (
        <View key={i}>
          <Text>
            {club.name} {club.type}
          </Text>
        </View>
      );
    })
  );
};

export default GolfClubList;
