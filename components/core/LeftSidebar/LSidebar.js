import { Categories } from "@constants/Categories";
import Link from "next/link";

export default function LSidebar() {
  return (
    <div className="hidden xl:block lg:block md:block w-1/4 lg:w-1/4 xl:w-1/4 md:w-1/4 pl-0 xl:pl-0 lg:pl-0 md:pl-4 pr-0 xl:pr-6 lg:pr-6 md:pr-12 ">
      <div className="uppercase text-gray-400 font-semibold text-xs mb-4 w-full">
        Kategoriler
      </div>
      <ul className="list-none p-0 m-0 w-full mb-10 shadow-sm">
        {Categories.map((item) => (
          <li
            className="-mx-4 rounded-md mb-0 leading-none"
            key={item.key}
          >
            <Link
              href="/c/[id]/[slug]"
              as={`/c/${item.key}/${item.slug}`}
            >
              <a className="font-semibold text-sm text-black hover:text-black no-underline">
                <div className="bg-white py-3 pl-4 hover:bg-gray-50 delay-50 duration-300 ease-in-out">
                  {item.text}
                </div>
              </a>
            </Link>
          </li>
        ))}
      </ul>
      <div className="uppercase text-gray-400 font-semibold text-xs mb-4 w-full">
        Popüler etiketler
      </div>
      <ul className="list-none p-0 m-0 w-40 mb-10 flex flex-wrap">
        <li className="font-semibold mb-1 mr-2 text-xs text-gray-700">
          <span className="text-gray-400">#</span>php
        </li>
        <li className="font-semibold mb-1 mr-2 text-xs text-gray-700">
          <span className="text-gray-400">#</span>webmaster
        </li>
        <li className="font-semibold mb-1 mr-2 text-xs text-gray-700">
          <span className="text-gray-400">#</span>ReactJs
        </li>
      </ul>
    </div>
  );
}
