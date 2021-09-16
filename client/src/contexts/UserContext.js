import React, { useState, createContext, useEffect } from "react";
import useGetUser from "../hooks/useGetUser";
import useGetGolfBag from "../hooks/useGetGolfBag";

export const UserContext = createContext();

export const UserProvider = props => {
  const [user, setUser] = useState(null);
  const { userData } = useGetUser();

  useEffect(() => {
    setUser(userData);
  }, [userData]);

  return (
    <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
  );
};
