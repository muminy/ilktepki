import Subject from "@components/ui/Subject";
import Link from "next/link";
import { useRouter } from "next/router";
import slugify from "slugify";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function Thread({ size, posts }) {
  const router = useRouter();

  const [JwtLoaded, setJwtLoaded] = useState(false);

  useEffect(() => {
    if (Cookies.get("JWT_TOKEN")) {
      setJwtLoaded(true);
    }
  }, [Cookies]);

  return (
    <div
      className={`mb-10 w-full ${
        size ? "xl:w-" + size + " lg:w-" + size : ""
      } xl:w-2/4 lg:w-2/4 pl-0 pr-0 xl:pl-6 lg:pl-6 xl:pr-6 lg:pr-6`}
    >
      <div className="flex justify-between items-center mb-2 px-4 lg:px-0 xl:px-0 md:px-0">
        {/* <div className="font-semibold text-xl">
          Konu Başlıkları
        </div> */}
        {JwtLoaded && <CreateButton id={router.query.id} />}
      </div>
      {posts.map((item) => (
        <Subject key={item._id} item={item} />
      ))}

      {!posts.length ? (
        <div className="text-center py-10 font-semibold bg-gray-100">
          İlk paylaşımı sen yap
        </div>
      ) : null}
    </div>
  );
}

const CreateButton = ({ id }) => (
  <Link
    href={{
      pathname: "/thread/create",
      query: {
        d: id ?? -1,
      },
    }}
  >
    <a className="rounded-md text-black hover:text-black no-underline transition button linear-out duration-150 inter hover:border-black border-2 border-white font-bold text-sm  h-9">
      SORU EKLE
    </a>
  </Link>
);
