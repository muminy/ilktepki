import { Categories } from "@constants/Categories";
import Link from "next/link";

export default function LSidebar() {
  return (
    <div className="hidden xl:block lg:block md:block lg:w-1/5 md:w-1/5 ">
      <div className="uppercase text-gray-400 font-semibold text-xs mb-4 w-full">
        Kategoriler
      </div>
      <ul className="list-none p-0 m-0 w-40 mb-10">
        {Categories.map((item) => (
          <li key={item.key}>
            <Link
              href="/c/[id]/[slug]"
              as={`/c/${item.key}/${item.slug}`}
            >
              <a className="font-semibold mb-1 text-sm text-black hover:text-black no-underline">
                {item.text}
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
