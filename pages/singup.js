import { SpinIcon } from "@constants/icons";
import { useAuthToken } from "context/AuthToken";
import { Api } from "lib/api";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function Singup() {
  const router = useRouter();
  const { JWT_TOKEN } = useAuthToken();
  const { register, handleSubmit, watch, errors } = useForm();

  const [responseCode, setResponseCode] = useState("none_error_code");
  const [loadingSingup, setLoadingSingup] = useState(false);

  const onSubmit = async (formData) => {
    setLoadingSingup(true);

    const { name, email, password, username } = formData;
    const GoSingup = await Api.post("/auth/singup", { name, email, password, username });
    const currentCode = GoSingup.data.code;
    const currentMessage = GoSingup.data.message;

    if (currentCode === 200) {
      router.push("/login");
    } else {
      setResponseCode(currentMessage);
    }

    setLoadingSingup(false);
  };

  useEffect(() => {
    if (responseCode !== "none_error_code") {
      setTimeout(() => setResponseCode("none_error_code"), 3000);
    }
  }, [responseCode]);

  useEffect(() => {
    if (JWT_TOKEN) {
      router.push("/");
    }
  }, []);

  if (JWT_TOKEN) {
    return <div></div>;
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
              <div className="text-xl font-bold">Kayıt Ol</div>
              <p>
                Kayıt olarak
                <Link href="/">
                  <a className="underline text-blue-600 mx-2">gizlilik politikamızı</a>
                </Link>
                otomatikman kabul etmiş sayılırsınız.
              </p>
            </div>
            {responseCode !== "none_error_code" ? (
              <div className="w-full py-2 bg-red-200 text-red-600 text-center font-semibold text-sm mb-6 rounded-md">
                {responseCode}
              </div>
            ) : null}
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
                <div className="mb-2 font-medium text-sm">Ad Soyad</div>
                {errors.name && (
                  <div className="-mt-2 mb-2 text-red-400 text-sm font-semibold">
                    Lütfen bu alanı boş bırakmayınız
                  </div>
                )}
                <input
                  name="name"
                  ref={register({ required: true, minLength: 4 })}
                  className="bg-gray-100 w-full py-2 rounded-md px-4 hover:bg-gray-200 focus:bg-gray-200 outline-none"
                />
              </div>
              <div className="mb-4">
                <div className="mb-2 font-medium text-sm">E-mail</div>
                {errors.email && (
                  <div className="-mt-2 mb-2 text-red-400 text-sm font-semibold">
                    Lütfen geçerli bir Mail adresi giriniz
                  </div>
                )}
                <input
                  name="email"
                  ref={register({
                    required: true,
                    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  })}
                  className="bg-gray-100 w-full py-2 rounded-md px-4 hover:bg-gray-200 focus:bg-gray-200 outline-none"
                />
              </div>
              <div className="flex">
                <div className="mb-4 w-2/4 mr-4 flex flex-col justify-between">
                  <div>
                    <div className="mb-2 font-medium text-sm">Kullanıcı Adı</div>
                    {errors.username && (
                      <div className="-mt-2 text-red-400 text-sm font-semibold mb-2">
                        Lütfen geçerli bir kullanıcı adı belirleyin
                      </div>
                    )}
                  </div>
                  <input
                    name="username"
                    ref={register({ required: true, minLength: 3 })}
                    className="bg-gray-100 w-full py-2 rounded-md px-4 hover:bg-gray-200 focus:bg-gray-200 outline-none"
                  />
                </div>
                <div className="mb-4 w-2/4 ml-4 flex flex-col justify-between">
                  <div>
                    <div className="mb-2 font-medium text-sm">Şifre</div>
                    {errors.password && (
                      <div className="-mt-2 text-red-400 text-sm font-semibold mb-2">
                        Lütfen bir şifre belirleyiniz.
                      </div>
                    )}
                  </div>
                  <input
                    name="password"
                    ref={register({ required: true, minLength: 6 })}
                    className="bg-gray-100 w-full py-2 rounded-md px-4 hover:bg-gray-200 focus:bg-gray-200 outline-none"
                  />
                </div>
              </div>
              <div className="mb-6">
                <button
                  type="submit"
                  className="bg-blue-600 flex outline-none justify-center w-full hover:shadow-sm hover:bg-blue-700 text-sm rounded-md py-2 px-10 font-semibold text-white"
                >
                  {loadingSingup ? (
                    <>
                      <SpinIcon color="#ffffff" />
                      Kayıt Olunuyor
                    </>
                  ) : (
                    "Kayıt Ol"
                  )}
                </button>
              </div>
            </form>
            <div className="mb-4">
              <div className="font-medium">
                Hesabın var mı?
                <Link href="/login">
                  <a className="underline text-blue-600 mx-2">Giriş Yap</a>
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
