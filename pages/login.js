import Layout from "@components/core/Layout";
import LogoSVG from "@components/icons/Logo";
import { useAuth } from "context/Auth";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
export default function Login() {
  const router = useRouter();
  const { ActionLogin, login, setLogin } = useAuth();

  const [code, setCode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const _login = async () => {
    setLoading(true);
    const isLogin = await ActionLogin(username, password);
    if (isLogin.login) {
      setCode(true);
      setLogin(true);
    } else {
      setCode(false);
      setLoading(false);
      setTimeout(() => setCode(null), 2000);
    }
  };

  useEffect(() => {
    login ? router.push("/") : null;
  }, [login]);

  if (login) {
    return <div></div>;
  }

  return (
    <div className="xl:w-2/5 flex mx-auto items-center xl:h-screen lg:h-screen md:h-screen px-10 xl:px-0 lg:px-0">
      <div className="w-full text-center">
        <div className="font-black text-5xl mb-4">
          Hoş geldin
        </div>
        {code ? (
          <div className="mb-4 xl:w-2/4 lg:w-2/4 md:w-2/4 w-full bg-green-100 text-green-500 font-semibold text-sm mx-auto py-2 rounded-md">
            Giriş başarılı
          </div>
        ) : code !== null ? (
          <div className="mb-4 xl:w-2/4 lg:w-2/4 md:w-2/4 w-full bg-red-100 text-red-500 font-semibold text-sm mx-auto py-2 rounded-md">
            Kullanıcı adı yada şifre hatalı
          </div>
        ) : null}
        <div>
          <input
            className="outline-none border border-gray-200 xl:w-2/4 lg:w-2/4 md:w-2/4 w-full px-3 py-2 rounded-sm inter text-sm focus:border-gray-300 hover:bg-gray-100 mb-4"
            placeholder="Kullanıcı adı"
            type="text"
            defaultValue={username}
            onChange={(text) => setUsername(text.target.value)}
          />
        </div>
        <div>
          <input
            className="outline-none border border-gray-200 xl:w-2/4 lg:w-2/4 md:w-2/4 w-full px-3 py-2 rounded-sm inter text-sm focus:border-gray-300 hover:bg-gray-100 mb-4"
            placeholder="Şifre"
            defaultValue={password}
            onChange={(text) => setPassword(text.target.value)}
            type="password"
          />
        </div>
        <button
          onClick={_login}
          className="px-10 flex mx-auto justify-center py-2 xl:w-2/4 lg:w-2/4 md:w-2/4 w-full bg-green-400 inter text-sm font-semibold rounded-md hover:bg-green-500 mr-auto mb-4"
        >
          {loading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Giriş yapılıyor
            </>
          ) : (
            "Giriş yap"
          )}
        </button>
        <div className="text-sm mb-1">
          Hesabın yok mu?{" "}
          <Link href="/singup">
            <a className="no-underline font-semibold">
              Kayıt Ol
            </a>
          </Link>
        </div>
        <div className="text-sm -mt-1">
          <Link href="/">
            <a className="no-underline font-medium text-gray-400 hover:text-gray-600">
              Geri dön
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
