import { useEffect, useState } from "react";
import { LOCALIP, PORT } from "react-native-dotenv";
import { useIsMount } from "./useIsMount";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useLoginAPI = () => {
  const [body, setBody] = useState(null);
  const [response, setResponse] = useState(null);
  const [success, setSuccess] = useState(false);
  const isMount = useIsMount();

  useEffect(() => {
    if (!isMount) {
      const makeRequest = async () => {
        try {
          const response = await fetch(`http://${LOCALIP}:${PORT}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
          });
          const parsedResponse = await response.json();

          setResponse(parsedResponse.msg);
          if (response.status === 200) {
            setSuccess(true);
            await AsyncStorage.setItem("token", parsedResponse.token);
          }
        } catch (error) {
          console.log(error.message);
        }
      };
      makeRequest(body);
    }
  }, [body]);

  return {
    setBody,
    response,
    success
  };
};
export { useLoginAPI };
