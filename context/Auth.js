import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import api from "lib/api";
import Cookies from "js-cookie";

const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
  const [login, setLogin] = useState(false);

  const ActionLogin = async (username, password) => {
    const hasUser = await api.post("/auth/login", {
      username,
      password,
    });
    const isLogin = await hasUser.data.login;
    if (isLogin) {
      Cookies.set("_id", await hasUser.data.data);
    }
    return await hasUser.data;
  };

  const ActionSingup = async (
    name,
    email,
    username,
    password,
  ) => {
    const isSingup = await api.post("/auth/singup", {
      name,
      email,
      username,
      password,
    });
    const singupData = await isSingup.data;
    return singupData;
  };

  useEffect(() => {
    const CLogin = Cookies.get("_id");
    CLogin ? setLogin(true) : null;
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
