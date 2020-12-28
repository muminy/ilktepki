import { useRouter } from "next/router";
import { useState } from "react";
import { Categories } from "@constants/Categories";
import { urls } from "lib/api";
import Link from "next/link";
import { useAuthToken } from "context/AuthToken";

export default function Create() {
  const router = useRouter();
  const { JWT_TOKEN } = useAuthToken();
  const [code, setCode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [baslik, setBaslik] = useState("");
  const [icerik, setIcerik] = useState("");

  const categoryItem = Categories[parseInt(router.query.d)];

  const createPost = async () => {
    setLoading(true);
    if (baslik.length > 4 && icerik.length > 10) {
      const createData = await fetch(urls + "/posts/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          baslik,
          icerik,
          categoryItem,
        }),
      });
      const responseData = await createData.json();
      if (responseData.code === 200) {
        setCode(200);
        setBaslik("");
        setIcerik("");
      } else if (responseData.code === 201) {
        setCode(201);
      }
    } else {
      setCode("err_code");
    }
    setTimeout(() => setCode(null), 2000);
    setLoading(false);
  };
  return (
    <div className="createArea">
      <div className="mx-auto w-full lg:w-2/5 xl:w-2/5 md:w-4/5 py-4 flex lg:px-0 xl:px-0 mb-10">
        <Link href="/">
          <a className="text-blue-500 font-bold text-sm uppercase ">Geri Dön</a>
        </Link>
      </div>
      <style jsx global>{`
        html,
        body {
          background-color: #ffffff !important;
        }
        .customNavBar {
          box-shadow: unset !important;
        }
        .createArea {
          min-height: 100vh;
        }
      `}</style>
      {JWT_TOKEN ? (
        <div className="flex w-full mb-auto">
          <div className="w-full lg:w-2/5 xl:w-2/5 md:w-4/5 mx-auto p-6 lg:p-0 xl:p-0">
            {code === 200 ? (
              <div className="mb-4 xl:w-full lg:w-full md:w-full w-full bg-green-100 text-center text-green-500 font-semibold text-sm mx-auto py-2 rounded-md">
                Konu başarılı bir şekilde açıldı
              </div>
            ) : code === "err_code" ? (
              <div className="mb-4 xl:w-full lg:w-full md:w-full w-full bg-red-100 text-center text-red-500 font-semibold text-sm mx-auto py-2 rounded-md">
                Lütfen tüm alanları eksiksiz bir şekilde doldurunuz
              </div>
            ) : code !== null ? (
              <div className="mb-4 xl:w-full lg:w-full md:w-full w-full bg-red-100 text-red-500 font-semibold text-sm mx-auto py-2 rounded-md">
                Beklenmedik bir hata
              </div>
            ) : null}
            <div className="w-full mb-6">
              <div className="mb-10">
                <div className="text-base text-gray-700 uppercase font-bold">Konu başlık</div>
                <div className="mb-4 text-xs">
                  Lütfen argo ve adul kelimeler kullanmaktan kaçınınız
                </div>
                <input
                  className="bg-gray-100 hover:bg-gray-200 delay-50 duration-300 ease-in-out w-full inter text-sm py-2 px-4 rounded-sm outline-none"
                  placeholder="Başlık"
                  value={baslik}
                  onChange={(text) => setBaslik(text.target.value)}
                />
              </div>
              <div className="mb-10">
                <div className="text-base text-gray-700 uppercase font-bold">Konu içeriğiniz</div>
                <div className="mb-4 text-xs">
                  Lütfen argo ve adul kelimeler kullanmaktan kaçınınız
                </div>
                <textarea
                  className="bg-gray-100 hover:bg-gray-200 delay-50 duration-300 ease-in-out w-full inter text-sm py-2 px-4 rounded-sm outline-none"
                  value={icerik}
                  placeholder="İçerik"
                  onChange={(text) => setIcerik(text.target.value)}
                />
              </div>
            </div>
            {categoryItem && (
              <div className="mb-10">
                <div className="text-xl text-gray-700 uppercase font-black tracking-wider mb-2">
                  Kategori
                </div>
                <div className="border-green-300 border text-black text-sm font-semibold rounded-md inline-flex px-4 py-2">
                  {categoryItem.text}
                </div>
              </div>
            )}

            <div className="w-full text-center">
              <button
                onClick={createPost}
                className="text-gray-900 font-semibold hover:bg-gray-300 delay-50 duration-300 ease-in-out rounded-md bg-gray-100 text-sm uppercase px-20 py-2 mx-auto leading-6"
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
                    Konu açılıyor
                  </>
                ) : (
                  "Konu aç"
                )}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full p-10 bg-gray-100 flex items-center justify-center">
          Lütfen{" "}
          <Link href="/login">
            <a className="text-black font-semibold mx-2">giriş</a>
          </Link>{" "}
          yapınız
        </div>
      )}
    </div>
  );
}
