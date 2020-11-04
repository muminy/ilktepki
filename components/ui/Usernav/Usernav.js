import Avatar from "@components/core/Avatar";
import BellIcon from "@components/icons/Bell";
import MessageIcon from "@components/icons/Message";
import { useAuth } from "context/Auth";
import Link from "next/link";

export default function Usernav() {
  const { login } = useAuth();
  return (
    <ul className="list-none p-0 m-0 flex">
      {login ? (
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
              <a className="mr-2 no-underline text-sm text-black font-medium hover:text-black">
                Giriş yap
              </a>
            </Link>
          </li>
          <li className="flex items-center ml-2">
            <Link href="/singup">
              <a className="no-underline py-2 px-6 bg-green-400 text-sm text-black font-medium hover:text-black hover:bg-green-300 rounded-md">
                Kayıt ol
              </a>
            </Link>
          </li>
        </>
      )}
    </ul>
  );
}
