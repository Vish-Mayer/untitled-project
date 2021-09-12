import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { globalStyles } from "../styles/global";
import FilledButton from "../components/FilledButton";
import { AuthContext } from "../contexts/AuthContext";
import Loading from "../components/Loading";
import { createFlashMessage } from "../utils/createFlashMessage";

const Dashboard = () => {
  const { logout } = React.useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  return (
    <View style={globalStyles.container}>
      <FilledButton
        title="Logout"
        onPress={() => {
          setLoading(true);
          logout().then(() => {
            setLoading(false);
            createFlashMessage({
              message: "logged out",
              type: "success"
            });
          });
        }}
      />
      <Text>Welcome to the Dashboard</Text>
      <Loading loading={loading} title={"Logging out"} />
    </View>
  );
};

export default Dashboard;
