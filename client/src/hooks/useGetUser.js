import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LOCALIP, PORT } from "react-native-dotenv";

const useGetUser = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(`http://${LOCALIP}:${PORT}/get-user`, {
          method: "POST",
          headers: { token: await AsyncStorage.getItem("token") }
        });
        const parsedResponse = await response.json();
        setUserData(parsedResponse);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);
  return {
    userData
  };
};

export default useGetUser;
