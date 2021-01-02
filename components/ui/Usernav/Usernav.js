import Avatar from "@components/core/Avatar";
import BellIcon from "@components/icons/Bell";
import MessageIcon from "@components/icons/Message";
import { useAuthToken } from "context/AuthToken";
import Link from "next/link";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function Usernav({}) {
  const [JsonWebToken, setJsonWebToken] = useState("loading");
  useEffect(() => {
    setJsonWebToken(Cookies.get("JWT_TOKEN"));
  }, []);
  if (JsonWebToken === "loading") return <div></div>;
  else
    return (
      <ul className="list-none p-0 m-0 flex">
        {JsonWebToken ? (
          <>
            <li className="flex items-center ml-5">
              <div className="flex rounded-md h-9 w-9 items-center justify-center bg-gray-100 hover:bg-gray-300 transition linear-out duration-150">
                <BellIcon size={22} />
              </div>
            </li>
            <li className="flex items-center ml-2">
              <div className="flex rounded-md h-9 w-9 items-center justify-center bg-gray-100 hover:bg-gray-300 transition linear-out duration-150">
                <MessageIcon size={22} />
              </div>
            </li>
            <li className="flex items-center ml-5">
              <Avatar />
            </li>
          </>
        ) : (
          <>
            <li className="flex items-center ml-5">
              <Link href="/login ">
                <a className="mr-2 no-underline text-sm singinBtn font-semibold hover:text-black">
                  Giriş yap
                </a>
              </Link>
            </li>
            <li className="flex items-center ml-2">
              <Link href="/singup">
                <a className="no-underline py-2 px-6 customSingButton text-sm font-semibold rounded-full">
                  Kayıt ol
                </a>
              </Link>
            </li>
          </>
        )}
        <style jsx>
          {`
            .customSingButton {
              background-color: #ffeda7;
              color: #644a53;
            }
            .singinBtn {
              color: #644a53;
            }
          `}
        </style>
      </ul>
    );
}
