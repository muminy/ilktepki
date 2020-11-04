import Avatar from "@components/core/Avatar";
import Link from "next/link";

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
            className={`font-medium hover:underline cursor-pointer text-black text-base hover:text-black no-underline`}
          >
            {text}
          </a>
        </Link>
        <div className="flex items-center">
          <div
            className={`lowercase text-gray-500 font-medium mr-2 hover:underline cursor-pointer text-xs`}
          >
            {username}
          </div>
          <div
            className={`lowercase text-gray-400 font-medium mr-2 hover:underline cursor-pointer text-xs`}
          >
            10 min
          </div>
          <div
            className={`lowercase text-gray-400 font-medium hover:underline cursor-pointer text-xs`}
          >
            44 Yorum
          </div>
        </div>
      </div>
    </div>
  );
}
