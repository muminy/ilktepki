import Avatar from "@components/core/Avatar";
import Link from "next/link";
import s from "./Subject.module.css";

export default function Subject({ username, text, id, slug }) {
  return (
    <div className="inline-flex w-full mb-4">
      <div className={`w-10 h-10 rounded-full mr-5`}>
        <Avatar size={10} />
      </div>
      <div className="w-full">
        <Link
          href="/thread/[id]/[slug]"
          as={`/thread/${id}/${slug}`}
        >
          <a
            className={`font-medium text-xl ${s.title} hover:underline cursor-pointer text-gray-700 hover:text-black no-underline`}
          >
            {text}
          </a>
        </Link>
        <div className="flex items-center mt-1">
          <div
            className={`lowercase text-gray-500 font-medium mr-2 ${s.min} hover:underline cursor-pointer`}
          >
            {username}
          </div>
          <div
            className={`lowercase text-gray-400 font-medium ${s.min} mr-2 hover:underline cursor-pointer`}
          >
            10 min
          </div>
          <div
            className={`lowercase text-gray-400 font-medium ${s.min} hover:underline cursor-pointer`}
          >
            44 Yorum
          </div>
        </div>
      </div>
    </div>
  );
}
