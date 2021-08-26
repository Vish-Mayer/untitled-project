import React, { useEffect, useState } from "react";
import { LOCALIP, PORT } from "react-native-dotenv";
import { useIsMount } from "./useIsMount";

const useRegisterAPI = () => {
  const [body, setBody] = useState(null);
  const [response, setResponse] = useState(null);
  const isMount = useIsMount();

  useEffect(() => {
    if (!isMount) {
      const makeRequest = async () => {
        try {
          const response = await fetch(
            `http://${LOCALIP}:${PORT}/auth/register`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(body)
            }
          );
          const parsedResponse = await response.json();
          setResponse(parsedResponse);
        } catch (error) {
          console.log(error.message);
        }
      };
      makeRequest(body);
    }
  }, [body]);

  return {
    setBody,
    response
  };
};
export { useRegisterAPI };
