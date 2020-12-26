import Avatar from "@components/core/Avatar";
import Link from "next/link";
import GetTiming from "helpers/getTime";
import UpIcon from "@components/icons/Up";
import DownIcon from "@components/icons/Down";
import BookmarkIcon from "@components/icons/Bookmark";

export default function Subject({
  username,
  text,
  id,
  slug,
  time,
  content,
}) {
  return (
    <div className="flex w-full mb-2 p-2 subject shadow-sm bg-white rounded-none xl:rounded-md lg:rounded-md md:rounded-sm items-center">
      <div className="text-center mr-4 pl-2">
        <div className="hover:bg-gray-100 rounded-md">
          <UpIcon color="#111" size={24} />
        </div>
        <div className="font-semibold text-xs">18</div>
        <div className="hover:bg-gray-100 rounded-md">
          <DownIcon color="#111" size={24} />
        </div>
      </div>
      <div className="w-full">
        <div className="flex items-center">
          <Link
            href="/member/[username]"
            as={`/member/${username}`}
          >
            <a
              className={`lowercase font-medium mr-2 no-underline hover:underline text-gray-600 cursor-pointer size-xxs`}
            >
              {username}
            </a>
          </Link>
          <div
            className={`text-gray-400 font-medium mr-2 size-xxs`}
          >
            {GetTiming(time)}
          </div>
        </div>
        <Link
          href="/thread/[id]/[slug]"
          as={`/thread/${id}/${slug}`}
        >
          <a
            className={`font-semibold hover:underline cursor-pointer text-black text-base hover:text-black no-underline`}
          >
            {text.substr(0, 24)}
          </a>
        </Link>
        <div className="p text-gray-500 mb-4">
          {content.substr(0, 24)}...
        </div>
        <div className="flex items-center rounded-md ">
          <div className="font-semibold text-xs text-gray-600 mr-4">
            18 Bookmark
          </div>
          <div className="font-semibold text-xs text-gray-600">
            21 Comment
          </div>
          <div className="font-semibold text-xs text-red-600 ml-auto">
            Report
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .p {
            line-height: 18px;
            font-size: 13px;
            font-weight: 500;
          }
        `}
      </style>
    </div>
  );
}
