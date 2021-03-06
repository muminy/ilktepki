import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import Cookies from "js-cookie";
import { urls } from "lib/api";

const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
  const [login, setLogin] = useState("user_loading");

  const ActionLogin = async (username, password) => {
    const hasUser = await fetch(urls + "/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const jsonData = await hasUser.json();
    if (jsonData.login) {
      Cookies.set("_id", await jsonData.data);
    }
    return jsonData;
  };

  const ActionSingup = async (
    name,
    email,
    username,
    password,
  ) => {
    const isSingup = await fetch(urls + "/auth/singup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        username,
        password,
      }),
    });
    const jsonData = await isSingup.json();
    const singupData = await jsonData;
    return singupData;
  };

  useEffect(() => {
    const CLogin = Cookies.get("_id");
    CLogin ? setLogin(true) : setLogin(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{ login, ActionLogin, setLogin, ActionSingup }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
