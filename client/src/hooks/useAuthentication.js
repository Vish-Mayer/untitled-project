import React, { useMemo, useReducer } from "react";
import SecureStorage from "react-native-secure-storage";

import { LOCALIP, PORT } from "react-native-dotenv";

import { createAction } from "../utils/createAction";
import { sleep } from "../utils/sleep";

export const useAuthentication = () => {
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "SET_USER":
          return {
            ...state,
            user: { ...action.payload }
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
      logout: () => {
        console.log("log out");
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

  return { auth, state };
};
