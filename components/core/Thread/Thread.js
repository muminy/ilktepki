import Subject from "@components/ui/Subject";
import Link from "next/link";
import { useRouter } from "next/router";
import slugify from "slugify";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useAuthToken } from "context/AuthToken";

export default function Thread({ size, posts }) {
  const router = useRouter();

  const { JWT_TOKEN } = useAuthToken();

  return (
    <div
      className={`mb-10 w-full ${
        size ? "xl:w-" + size + " lg:w-" + size : ""
      } xl:w-2/4 lg:w-2/4 pl-0 pr-0 xl:pl-6 lg:pl-6 xl:pr-6 lg:pr-6`}
    >
      {JWT_TOKEN && <CreateButton id={router.query.id} />}
      {posts.map((item) => (
        <Subject key={item._id} item={item} />
      ))}

      {!posts.length ? (
        <div className="text-center py-10 font-semibold bg-gray-100">İlk paylaşımı sen yap</div>
      ) : null}
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
