import React, { useEffect, useState } from "react";
import { View, Button, Text } from "react-native";
import { globalStyles } from "../styles/global";
import FilledButton from "../components/FilledButton";
import { AuthContext } from "../contexts/AuthContext";
import sleep from "../utils/sleep";
import Loading from "../components/Loading";
import newFlashMessage from "../utils/newFlashMessage";

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
            newFlashMessage("Logged out", "", "success");
          });
        }}
      />
      <Text>Welcome to the Dashboard</Text>
      <Loading loading={loading} title={"Logging out"} />
    </View>
  );
};

export default Dashboard;
