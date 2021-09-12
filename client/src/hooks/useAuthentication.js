import React, { useMemo, useReducer } from "react";

import { LOCALIP, PORT } from "react-native-dotenv";

import AsyncStorage from "@react-native-async-storage/async-storage";
import sleep from "../utils/sleep";
import createAction from "../utils/createAction";

const useAuthentication = () => {
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "SET_USER":
          return {
            ...state,
            user: { ...action.payload }
          };
        case "REMOVE_USER":
          return {
            ...state,
            user: undefined
          };
        default:
          return state;
      }
    },
    {
      user: undefined
    }
  );

  const auth = useMemo(
    () => ({
      login: async inputs => {
        {
          console.log("login", inputs);
          try {
            await sleep(1000);
            const response = await fetch(
              `http://${LOCALIP}:${PORT}/auth/login`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(inputs)
              }
            );
            const parsedResponse = await response.json();
            const user = {
              email: inputs.email,
              token: parsedResponse.token
            };

            if (parsedResponse.type === "success") {
              await AsyncStorage.setItem("token", user.token);
              dispatch(createAction("SET_USER", user));
              return parsedResponse;
            } else {
              return parsedResponse;
            }
          } catch (error) {
            console.log(error.message);
          }
        }
      },
      logout: async () => {
        console.log("log out");
        await sleep(2000);
        AsyncStorage.clear();
        dispatch(createAction("REMOVE_USER"));
      },
      register: async inputs => {
        {
          console.log("register", inputs);
          try {
            await sleep(1000);
            const response = await fetch(
              `http://${LOCALIP}:${PORT}/auth/register`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(inputs)
              }
            );
            const parsedResponse = await response.json();
            return parsedResponse;
          } catch (error) {
            console.log(error.message);
          }
        }
      }
    }),
    []
  );

  return {
    auth,
    state
  };
};

export default useAuthentication;
