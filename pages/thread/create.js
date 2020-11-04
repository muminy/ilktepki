import Layout from "@components/core/Layout";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useState } from "react";
import api from "lib/api";
import { Categories } from "@constants/Categories";
import { useAuth } from "context/Auth";

export default function Create() {
  const router = useRouter();
  const { login } = useAuth();
  const [code, setCode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [baslik, setBaslik] = useState("");
  const [icerik, setIcerik] = useState("");
  const userItem = Cookies.get("_id");

  const categoryItem = Categories[parseInt(router.query.d)];

  const createPost = async () => {
    setLoading(true);
    if (login && baslik.length > 4 && icerik.length > 10) {
      const userId = JSON.parse(userItem);
      const createData = await api.post("/posts/create", {
        baslik,
        icerik,
        userId,
        categoryItem,
      });
      if (createData.data.code === 200) {
        setCode(200);
        setBaslik("");
        setIcerik("");
      } else if (createData.data.code === 201) {
        setCode(201);
      }
    } else {
      setCode("err_code");
    }
    setTimeout(() => setCode(null), 2000);
    setLoading(false);
  };
  return (
    <Layout size="2/4">
      <div className="w-full">
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
        <div className="w-full mb-5">
          <div className="text-xl font-semibold">
            Konu başlık
          </div>
          <div className="text-xs mb-2">
            Konu başlığını belirlerken Argo, adult yada ırkçı
            söylemlerden kaçının
          </div>
          <input
            className="border border-gray-200 w-full inter text-sm py-2 px-4 rounded-md outline-none"
            placeholder="Başlık"
            value={baslik}
            onChange={(text) => setBaslik(text.target.value)}
          />
        </div>
        <div className="w-full mb-6">
          <div className="text-xl font-semibold">
            Konu içeriğiniz
          </div>
          <div className="text-xs mb-2">
            Konu içeriğini sade ve kısa cümlelerle açıklamanız
            okurların dikkatini çekecektir
          </div>
          <textarea
            className="border border-gray-200 w-full inter text-sm py-2 px-4 rounded-md outline-none"
            value={icerik}
            placeholder="İçerik"
            onChange={(text) => setIcerik(text.target.value)}
          />
        </div>
        <div className="w-full">
          <button
            onClick={createPost}
            className="inter py-3 bg-green-400 px-20 rounded-md font-medium text-sm hover:bg-green-300 flex "
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
    </Layout>
  );
}
