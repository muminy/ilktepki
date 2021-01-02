import { createContext, useContext } from "react";

export const AuthTokenContext = createContext();
export const AuthTokenProvider = ({ InitialState, children }) => {
  return <AuthTokenContext.Provider value={InitialState}>{children}</AuthTokenContext.Provider>;
};

export const useAuthToken = () => useContext(AuthTokenContext);
