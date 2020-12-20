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
      className={`${
        size
          ? "lg:w-" + size + " md:w-full"
          : "lg:w-2/4 md:w-3/4"
      } mb-10 mx-auto`}
    >
      <div className="flex justify-between items-center mb-2">
        <div className="font-semibold text-xl">
          Konu Başlıkları
        </div>
        {JwtLoaded && <CreateButton id={router.query.id} />}
      </div>
      <div className="flex flex-wrap w-full items-center transition linear-out duration-150 mb-8">
        <div className="rounded-full font-semibold text-sm mr-8 transition linear-out duration-150">
          Latests
        </div>
        <div className="rounded-full font-semibold text-sm mr-8 transition linear-out duration-150 hover:underline cursor-pointer text-gray-400 hover:text-gray-900">
          Populer
        </div>
        <div className="rounded-full font-semibold text-sm mr-8 transition linear-out duration-150 hover:underline cursor-pointer text-gray-400 hover:text-gray-900">
          Not Answer
        </div>
      </div>
      {posts.map((item) => (
        <Subject
          key={item._id}
          text={item.baslik}
          id={item._id}
          time={item.createdAt}
          slug={slugify(item.baslik, {
            replacement: "-",
            lower: true,
          })}
          username={item.author.username}
        />
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
