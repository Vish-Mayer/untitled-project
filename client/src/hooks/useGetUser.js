import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LOCALIP, PORT } from "react-native-dotenv";

const useGetUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(`http://${LOCALIP}:${PORT}/dashboard`, {
          method: "POST",
          headers: { token: await AsyncStorage.getItem("token") }
        });
        const parsedResponse = await response.json();
        setUser(parsedResponse);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);
  return {
    user
  };
};

export default useGetUser;
