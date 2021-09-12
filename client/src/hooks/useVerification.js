import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LOCALIP, PORT } from "react-native-dotenv";
import sleep from "../utils/sleep";

const useVerification = state => {
  const [isVerified, setIsVerified] = useState(false);
  useEffect(() => {
    const verify = async () => {
      try {
        const response = await fetch(`http://${LOCALIP}:${PORT}/auth/verify`, {
          method: "GET",
          headers: { token: await AsyncStorage.getItem("token") }
        });
        const parsedResponse = await response.json();
        if (parsedResponse.verified) {
          await sleep(3000);
          setIsVerified(true);
        } else {
          setIsVerified(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    verify();
  }, [state]);
  return {
    isVerified
  };
};

export default useVerification;
