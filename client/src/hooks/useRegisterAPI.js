import React, { useEffect, useState } from "react";
import { LOCALIP, PORT } from "react-native-dotenv";
import { useIsMount } from "./useIsMount";

const useRegisterAPI = () => {
  const [body, setBody] = useState(null);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
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
          if (parsedResponse.status !== 200) {
            setError(parsedResponse);
          }

          if ((await parsedResponse.status) === 200) {
            console.log(parsedResponse);
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
    success,
    error
  };
};
export { useRegisterAPI };
