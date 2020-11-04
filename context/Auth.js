import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import api from "lib/api";
import Cookies from "js-cookie";
import Api from "lib/api";

const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
  const [login, setLogin] = useState(false);

  const ActionLogin = async (username, password) => {
    const hasUser = await new Api("/auth/login").post({
      username,
      password,
    });
    const isLogin = await hasUser.login;
    if (isLogin) {
      Cookies.set("_id", await hasUser.data);
    }
    return await hasUser;
  };

  const ActionSingup = async (
    name,
    email,
    username,
    password,
  ) => {
    const isSingup = await new Api("/auth/singup").post({
      name,
      email,
      username,
      password,
    });
    const singupData = await isSingup;
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
