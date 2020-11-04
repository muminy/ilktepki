import Layout from "@components/core/Layout";
import LogoSVG from "@components/icons/Logo";
import { useAuth } from "context/Auth";
import { validateEmail } from "lib/valid";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Singup() {
  const router = useRouter();

  const { login, ActionSingup } = useAuth();

  const [code, setCode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const _Singup = async () => {
    setLoading(true);
    const isValidEmail = validateEmail(email);
    if (
      isValidEmail &&
      username.length >= 3 &&
      password.length > 5
    ) {
      const isSingup = await ActionSingup(
        name,
        email,
        username,
        password,
      );
      if (isSingup.code === 200) {
        setCode(true);
        window.location.href = "/login";
      } else {
        setCode(false);
      }
    } else {
      setCode("error_code");
    }

    setTimeout(() => setCode(null), 2000);
    setLoading(false);
  };

  useEffect(() => {
    login ? router.push("/") : null;
  }, [login]);

  if (login) {
    return <div className></div>;
  }

  return (
    <div className="xl:w-2/5 lg:w-3/5 flex mx-auto items-center xl:h-screen px-6 xl:px-0 lg:px-0 py-10 xl:py-0 lg:py-0 md:py-0">
      <div className="w-full text-center">
        <div className="font-black text-5xl mb-4">Sing up</div>
        {code === "error_code" ? (
          <div className="mb-4 xl:w-2/4 lg:w-2/4 md:w-2/4 w-full bg-red-100 text-red-500 font-semibold text-xs mx-auto py-2 rounded-md">
            Lütfen tüm alanları eksiksiz bir şekilde doldurun
          </div>
        ) : code ? (
          <div className="mb-4 xl:w-2/4 lg:w-2/4 md:w-2/4 w-full bg-green-100 text-green-500 font-semibold text-sm mx-auto py-2 rounded-md">
            Kayıt başarılı
          </div>
        ) : code !== null ? (
          <div className="mb-4 xl:w-2/4 lg:w-2/4 md:w-2/4 w-full bg-red-100 text-red-500 font-semibold text-xs mx-auto py-2 rounded-md">
            Kullanıcı adı Email adresi ile başka bir Kullanıcı
            mevcut
          </div>
        ) : null}
        <div className="xl:w-2/4 lg:w-2/4 md:w-2/4 w-full mx-auto mb-4">
          <input
            className="outline-none border border-gray-200 w-full px-3 py-2 rounded-sm inter text-sm focus:border-gray-300 hover:bg-gray-100 mb-2"
            placeholder="Ad soyad"
            type="text"
            defaultValue={name}
            onChange={(text) => setName(text.target.value)}
          />
          <div className="w-full text-xs text-left">
            Adınızın <span className="text-red-600">Argo</span>,{" "}
            <span className="text-red-600">Irkçı</span> ve{" "}
            <span className="text-red-600">Adult</span> kelimeler
            içermedğinden emin olun
          </div>
        </div>
        <div className="xl:w-2/4 lg:w-2/4 md:w-2/4 w-full mx-auto mb-4">
          <input
            className="outline-none border border-gray-200 w-full px-3 py-2 rounded-sm inter text-sm focus:border-gray-300 hover:bg-gray-100 mb-2"
            placeholder="Email"
            type="text"
            defaultValue={email}
            onChange={(text) => setEmail(text.target.value)}
          />
          <div className="w-full text-xs text-left">
            E-mail adresinizi benzersiz bir mail olduğuna emin
            olunuz, bir E-mail adresi ile sadece bir key kayıt
            olabilirsiniz.
          </div>
        </div>
        <div className="xl:w-2/4 lg:w-2/4 md:w-2/4 w-full mx-auto mb-4">
          <input
            className="outline-none border border-gray-200 w-full px-3 py-2 rounded-sm inter text-sm focus:border-gray-300 hover:bg-gray-100 mb-2"
            placeholder="Kullanıcı adı"
            type="text"
            defaultValue={username}
            onChange={(text) => setUsername(text.target.value)}
          />
          <div className="w-full text-xs text-left">
            Kullanıcı adınızın benzersiz olduğuna emin olunuz.
          </div>
        </div>
        <div className="xl:w-2/4 lg:w-2/4 md:w-2/4 w-full mx-auto mb-4">
          <input
            className="outline-none border border-gray-200 w-full px-3 py-2 rounded-sm inter text-sm focus:border-gray-300 hover:bg-gray-100 mb-2"
            placeholder="Şifre"
            type="password"
            defaultValue={password}
            onChange={(text) => setPassword(text.target.value)}
          />
          <div className="w-full text-xs text-left">
            Şifreniz{" "}
            <span className="text-red-600">
              6 Karakterden büyük
            </span>{" "}
            olduğuna emin olunuz
          </div>
        </div>
        <button
          onClick={_Singup}
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
              Kayıt yapılıyor
            </>
          ) : (
            "Kayıt Ol"
          )}
        </button>
        <div className="text-sm mb-1">
          Hesabın var mı?{" "}
          <Link href="/login">
            <a className="no-underline font-semibold">
              Giriş yap
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
