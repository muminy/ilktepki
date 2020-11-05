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
          <Link
            href="/member/[username]"
            as={`/member/${username}`}
          >
            <a
              className={`lowercase font-medium mr-2 no-underline hover:underline cursor-pointer text-xs`}
            >
              {username}
            </a>
          </Link>
          <div
            className={`lowercase text-gray-400 font-medium mr-2 text-xs`}
          >
            10 min
          </div>
          <div
            className={`lowercase text-gray-400 font-medium text-xs`}
          >
            44 Yorum
          </div>
        </div>
      </div>
    </div>
  );
}
