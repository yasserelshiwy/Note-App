import { createContext, useState } from "react";
export const userContext = createContext(null);
export default function UserProvuder({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  function logOut() {
    setToken(null);
    localStorage.removeItem("token");
  }
  return (
    <userContext.Provider value={{ token, setToken, logOut }}>
      {children}
    </userContext.Provider>
  );
}
