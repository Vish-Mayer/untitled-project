import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { globalStyles } from "../styles/global";
import { AuthContext } from "../contexts/AuthContext";
import Loading from "../components/Loading";
import { createFlashMessage } from "../utils/createFlashMessage";
import IconButton from "../components/IconButton";
import { privateStyles } from "../styles/local";
import LogOutConfirmation from "../components/LogOutConfirmation";

const Settings = () => {
  const { logout } = React.useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [islogOutClicked, setIsLogOutClicked] = useState(false);

  const handleLogOut = () => {
    setIsLogOutClicked(false);
    setLoading(true);
    logout().then(() => {
      createFlashMessage({
        message: "logged out",
        type: "success"
      });
      setLoading(false);
    });
  };

  return (
    <View style={globalStyles.container}>
      <IconButton
        name="log-out-outline"
        style={privateStyles.returnIcon}
        size={32}
        color={"#333"}
        onPress={() => {
          setIsLogOutClicked(true);
        }}
      />

      <LogOutConfirmation
        logOutClicked={islogOutClicked}
        no={() => {
          setIsLogOutClicked(false);
        }}
        yes={() => {
          handleLogOut();
        }}
      />

      <Loading loading={loading} title={"Logging out"} />
    </View>
  );
};

export default Settings;
