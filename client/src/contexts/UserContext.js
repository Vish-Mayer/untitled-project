import React, { useState, createContext, useEffect } from "react";
import useGetUser from "../hooks/useGetUser";

export const UserContext = createContext();

export const UserProvider = props => {
  const [user, setUser] = useState();
  const { userData } = useGetUser();

  useEffect(() => {
    setUser(userData);
  }, [userData]);

  return (
    <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
  );
};
