import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null)
  const [ready, setReady] = useState(false)
  useEffect(() => {
    console.log("usecontext")
    if (!user) {
      axios.get("/profile").then(async({ data }) => {
        console.log("profile", data)
        setUser(data);
        setReady(true);
      })
    }
    if(user){
      setReady(true);
    }
  }, [])
  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
};