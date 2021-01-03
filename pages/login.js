import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Api } from "lib/api";
import Cookies from "js-cookie";
import { useAuthToken } from "context/AuthToken";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { SpinIcon } from "@constants/icons";

export default function Login() {
  const router = useRouter();

  const { register, handleSubmit, watch, errors } = useForm();
  const { JWT_TOKEN } = useAuthToken();

  const [responseCode, setResponseCode] = useState("none_error_code");
  const [loadingLogin, setLoadingLogin] = useState(false);

  const onSubmit = async (formData) => {
    setLoadingLogin(true);

    const { password, username } = formData;
    const GoLogin = await Api.post("/auth/login", { password, username });
    const currentCode = GoLogin.data.code;

    if (currentCode === 200) {
      Cookies.set("JWT_TOKEN", GoLogin.data.token);
      Cookies.set("USER_ID", GoLogin.data.userId);
      router.push("/");
    } else {
      setResponseCode(currentMessage);
    }

    setLoadingLogin(false);
  };

  useEffect(() => {
    if (JWT_TOKEN) {
      router.push("/");
    }
  }, []);

  if (JWT_TOKEN) {
    return (
      <div className="h-screen bg-white w-full flex justify-center items-center">
        <SpinIcon color="#000" />
      </div>
    );
  } else {
    return (
      <div className="w-full h-auto flex flex-col xl:flex-row lg:flex-row md:flex-row bg-white ">
        <div className="w-full xl:w-2/5 relative lg:w-2/5 md:w-2/5 bgOr flex flex-col items-center">
          <Link href="/">
            <a className="shadow-sm mr-auto ml-6 mt-6 mb-6 xl:mb-0 lg:mb-0 md:mb-0 rounded-md bg-white z-10 px-8 font-semibold uppercase py-2">
              Geri
            </a>
          </Link>
          <img
            className="hidden xl:block lg:block md:block mt-auto"
            src="https://cdn.dribbble.com/users/3281732/screenshots/8616916/media/a7e39b15640f8883212421d134013e38.jpg?compress=1&resize=1000x750"
          />
        </div>
        <div className="w-full min-h-screen flex flex-col justify-start xl:justify-center lg:justify-center md:justify-center items-center xl:w-3/5 lg:w-3/5 md:w-3/5 bg-white py-4 h-auto xl:h-screen lg:h-screen md:h-full overflow-y-auto">
          <div className="w-full xl:w-2/4 lg:w-3/4 px-6 xl:px-0 lg:px-0 md:px-6">
            <div className="mb-6">
              <div className="text-2xl font-bold">Giriş Yap</div>
              <p>
                Giriş yaparak
                <Link href="/">
                  <a className="underline text-blue-600 mx-2">gizlilik politikamızı</a>
                </Link>
                otomatikman kabul etmiş sayılırsınız.
              </p>
            </div>
            <div className="block xl:flex lg:flex md:flex mb-6">
              <div className="w-full xl:w-2/4 lg:w-2/4 md:w-2/4 mr-0 xl:mr-4 lg:mr-4 md:mr-4 mb-4 xl:mb-0 lg:mb-0 md:mb-0 bg-gray-100 text-center py-2 rounded-md hover:bg-gray-200 font-semibold text-sm">
                Google İle Giriş Yap
              </div>
              <div className="w-full xl:w-2/4 lg:w-2/4 md:w-2/4 ml-0 xl:ml-4 lg:ml-4 md:ml-4 bg-gray-100 text-center py-2 rounded-md hover:bg-gray-200 font-semibold text-sm">
                Facebook İle Giriş Yap
              </div>
            </div>
            <div className="w-full items-center flex h-1 bg-gray-100 mb-6">
              <div className="text-center mx-auto px-6 bg-white font-black text-gray-200">OR</div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <div className="mb-2 font-medium text-sm">Kullanıcı adı yada E-mail</div>
                <input
                  name="username"
                  ref={register({ required: true })}
                  className="bg-gray-100 w-full py-2 rounded-md px-4 hover:bg-gray-200 focus:bg-gray-200 outline-none"
                />
              </div>
              <div className="mb-4">
                <div className="mb-2 font-medium text-sm">Şifre</div>
                <input
                  name="password"
                  type="password"
                  ref={register({ required: true })}
                  className="bg-gray-100 w-full py-2 rounded-md px-4 hover:bg-gray-200 focus:bg-gray-200 outline-none"
                />
              </div>
              <div className="mb-6">
                <button
                  type="submit"
                  className="bg-blue-600 flex outline-none justify-center w-full hover:shadow-sm hover:bg-blue-700 text-sm rounded-md py-2 px-10 font-semibold text-white"
                >
                  {loadingLogin ? (
                    <>
                      <SpinIcon color="#ffffff" />
                      Giriş Yapılıyor
                    </>
                  ) : (
                    "Giriş Yap"
                  )}
                </button>
              </div>
            </form>
            <div className="mb-4">
              <div className="font-medium">
                Hesabın yok mu?
                <Link href="/singup">
                  <a className="underline text-blue-600 mx-2">Kayıt ol</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <style jsx>{`
          .bgOr {
            background-color: #f9d86d;
          }
          .welcome {
            font-size: 50px;
          }
        `}</style>
      </div>
    );
  }
}
