import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Api } from "lib/api";
import Cookies from "js-cookie";
import { useAuthToken } from "context/AuthToken";

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("none_error");

  const { JWT_TOKEN } = useAuthToken();

  const _login = async () => {
    setLoading(true);

    const isLogin = await Api.post("/auth/login", {
      username: username,
      password: password,
    });
    if (isLogin.data.code === 200) {
      Cookies.set("JWT_TOKEN", isLogin.data.token);
      Cookies.set("USER_ID", isLogin.data.userId);
      router.push("/");
    } else {
      setErrorMessage(isLogin.data.error);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (errorMessage !== "none_error") {
      setTimeout(() => setErrorMessage("none_error"), 3000);
    }
  }, [errorMessage]);

  useEffect(() => {
    if (JWT_TOKEN) {
      router.push("/");
    }
  }, []);

  if (JWT_TOKEN) {
    return <div></div>;
  } else {
    return (
      <div className="xl:w-2/5 flex mx-auto items-center xl:h-screen lg:h-screen md:h-screen px-10 xl:px-0 lg:px-0">
        <div className="w-full text-center">
          {errorMessage !== "none_error" ? (
            <div className="mb-4 xl:w-2/4 lg:w-2/4 md:w-2/4 w-full bg-green-100 text-green-500 font-semibold text-sm mx-auto py-2 rounded-md">
              {errorMessage}
            </div>
          ) : null}
          <div className="font-black text-5xl mb-4">Hoş geldin</div>
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
              <a className="no-underline font-semibold">Kayıt Ol</a>
            </Link>
          </div>
          <div className="text-sm -mt-1">
            <Link href="/">
              <a className="no-underline font-medium text-gray-400 hover:text-gray-600">Geri dön</a>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
