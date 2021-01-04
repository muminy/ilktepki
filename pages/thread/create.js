import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Categories } from "@constants/Categories";
import Link from "next/link";
import { useAuthToken } from "context/AuthToken";
import TextEditor from "@components/ui/TextEditor";
import { useForm } from "react-hook-form";
import { Api } from "lib/api";
import slugify from "slugify";
import { SpinIcon } from "@constants/icons";

export default function Create() {
  const router = useRouter();
  const { JWT_TOKEN } = useAuthToken();
  const { register, handleSubmit, watch, errors } = useForm();

  const [value, setValue] = useState({ text: "", html: "" });
  const [responseCode, setResponseCode] = useState("none_error_code");
  const [creatingPost, setCreatingPost] = useState(false);

  const categoryItem = Categories[parseInt(router.query.d)];

  const onSubmit = async (formData) => {
    if (value.text.length < 6) {
      return setResponseCode("İçerik Çok Kısa");
    }

    setCreatingPost(true);
    const { baslik } = formData;

    const baslikSlug = slugify(baslik, {
      replacement: "-",
      remove: true,
      lower: true,
    });

    const payloadItem = {
      baslik,
      icerik: value.text,
      categoryItem,
    };

    const createPost = await Api.post("/posts/create", payloadItem);
    const responseCodePost = createPost.data.code;
    const responseCodeMessage = createPost.data.message;

    if (responseCodePost === 200) {
      setResponseCode("success");
      const URL_LOCATION = `/thread/${createPost.data.results.insertedId}/${baslikSlug}`;
      router.push(URL_LOCATION);
    } else {
      setResponseCode(responseCodeMessage);
    }
    setCreatingPost(false);
  };

  useEffect(() => {
    if (!JWT_TOKEN) {
      router.push("/login");
    }
  }, [JWT_TOKEN]);

  if (!JWT_TOKEN) {
    return (
      <div className="h-screen bg-white  w-full flex justify-center items-center">
        <SpinIcon color="#000" />
      </div>
    );
  } else
    return (
      <div className="createArea ">
        <div className="w-full bg-gray-900">
          <div className="w-full xl:w-2/5 lg:w-3/5 md:w-4/5 mx-auto py-4 px-6 flex">
            <Link href="/">
              <a className="bg-white shadow-sm px-8 text-sm py-1 rounded-sm font-semibold">Geri</a>
            </Link>
          </div>
        </div>
        <div className="w-full xl:w-2/5 lg:w-3/5 md:w-4/5 mx-auto py-4 px-6 ">
          {responseCode === "success" ? (
            <div className="w-full py-2 bg-green-200 text-green-600 text-center font-semibold text-sm mb-6 rounded-md">
              Giriş Başarılı, yönlendiriliyorsunuz...
            </div>
          ) : responseCode !== "none_error_code" ? (
            <div className="w-full py-2 bg-red-200 text-red-600 text-center font-semibold text-sm mb-6 rounded-md">
              {responseCode}
            </div>
          ) : null}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-10 border-b border-gray-100 pb-4">
              <div className="font-semibold text-lg">Başlık</div>
              <p className="mb-4">
                Kısa ve özlük belki içerikte değil ama başlıkta belirlemeniz gereken bir motto
                olmalı.
              </p>
              <input
                name="baslik"
                ref={register({ required: true, minLength: 10 })}
                className="focus:outline-none outline-none py-2 px-6 bg-gray-100 w-full rounded-md placeholder-gray-400"
                placeholder="Lütfen bir başlık giriniz "
              />
            </div>
            <div className="mb-10 border-b border-gray-100 pb-4">
              <div className="font-semibold text-lg">İçerik</div>
              <p className="mb-4">
                İçeriğinizi detaylı bir şekilde açıklayabilirsiniz. Unutmayın! Markdown text
                editörünü kullanıyorsunuz.
              </p>
              <TextEditor value={value} setValue={setValue} />
            </div>
            <div className="mb-10 border-b border-gray-100 pb-4">
              <div className="font-semibold text-lg">Kategori</div>
              <p className="mb-4">
                Doğru kategoride konu açtığınıza emin olunuz, aksi halde bunu değiştiremezsiniz.
              </p>
              {categoryItem ? (
                <div className="bg-gray-100 text-black inline-flex rounded-md px-6 py-2 font-semibold text-sm">
                  {categoryItem.text}
                </div>
              ) : null}
            </div>
            <button
              type="submit"
              className="w-full outline-none focus:outline-none flex justify-center bg-blue-600 text-white text-sm font-semibold py-2 rounded-md hover:bg-blue-700"
            >
              {creatingPost ? (
                <>
                  <SpinIcon color="#ffffff" />
                  <div className="ml-2">Konu Açılıyor</div>
                </>
              ) : (
                "Konu Aç"
              )}
            </button>
          </form>
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
      </div>
    );
}
