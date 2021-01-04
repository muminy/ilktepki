import Subject from "@components/ui/Subject";
import Link from "next/link";
import { useRouter } from "next/router";
import slugify from "slugify";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useAuthToken } from "context/AuthToken";
import { SubjectSkeleton } from "../Skeleton/Skeleton";

export default function Thread({ size, posts, loaded }) {
  const router = useRouter();

  const { JWT_TOKEN } = useAuthToken();

  return (
    <div
      className={`mb-10 w-full ${
        size ? "xl:w-" + size + " lg:w-" + size : ""
      } xl:w-2/4 lg:w-2/4 pl-0 pr-0 xl:pl-6 lg:pl-6 xl:pr-6 lg:pr-6`}
    >
      {JWT_TOKEN && <CreateButton id={router.query.id} />}
      {loaded ? (
        <>
          <SubjectSkeleton />
          <SubjectSkeleton />
          <SubjectSkeleton />
        </>
      ) : !posts.length ? (
        <div className="text-center shadow-sm rounded-md bg-white p-2 ">
          <img src="https://cdn.dribbble.com/users/2071065/screenshots/14001868/media/eb8ee6f943deadb0b3433e5840fad062.png?compress=1&resize=1000x750" />
          <div className="text-sm font-medium mb-2">
            Görünüşe bakılırsa buralar boş. İlk paylaşımı sen yapmak ister misin?
          </div>
          <Link href={{ pathname: "/thread/create", query: { d: router.query.id ?? -1 } }}>
            <a className="text-blue-500 font-semibold text-sm underline">İlk Paylaşımı Yap</a>
          </Link>
        </div>
      ) : (
        <div className="">
          <div
            className={`font-semibold text-xs text-gray-400 uppercase ${
              JWT_TOKEN ? "mb-2" : "mb-4"
            }`}
          >
            Konu Başlıkları
          </div>
          {posts.map((item) => (
            <Subject key={item._id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

const CreateButton = ({ id }) => (
  <div className="w-full bg-white shadow-sm flex justify-around rounded-none xl:rounded-md lg:rounded-md md:rounded-md mb-4">
    <Link
      href={{
        pathname: "/thread/create",
        query: {
          d: id ?? -1,
        },
      }}
    >
      <a className="font-semibold text-gray-700 text-center p-2 w-full border-r border-gray-100 hover:bg-gray-50 delay-50 duration-300 ease-in-out">
        Soru Ekle
      </a>
    </Link>
    <Link
      href={{
        pathname: "/thread/create",
        query: {
          d: id ?? -1,
        },
      }}
    >
      <a className="font-semibold text-gray-700 w-full p-2 text-center hover:bg-gray-50 delay-50 duration-300 ease-in-out">
        Konu Aç
      </a>
    </Link>
  </div>
);
