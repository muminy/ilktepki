import Avatar from "@components/core/Avatar";
import DownIcon from "@components/icons/Down";
import UpIcon from "@components/icons/Up";
import { Api } from "lib/api";
import Link from "next/link";
import Cookies from "js-cookie";

export default function Comment({ item }) {
  const getUserJSON = Cookies.getJSON("_id");
  const upVote = async () => {
    const response = await Api.post("/comment/vote", {
      vote: Object.assign(getUserJSON, {
        upvote: true,
        downvote: false,
      }),
    });
  };
  const downVote = async () => {
    const response = await Api.post("/comment/vote", {
      vote: Object.assign(getUserJSON, {
        upvote: false,
        downvote: true,
      }),
    });
  };
  return (
    <div key={item._id} className="mb-8">
      <div className="flex items-center mb-4 justify-between">
        <div className="flex items-center ">
          <Avatar />
          <div className="ml-4">
            <Link
              href="/member/[username]"
              as={`/member/${item.userItem.username}`}
            >
              <a className="text-sm font-bold text-black no-underline">
                {item.userItem.username}
              </a>
            </Link>
            <div className="text-xs text-gray-500">
              4 dakika önce
            </div>
          </div>
        </div>
        {item.success ? (
          <div className="font-bold text-green-500 text-sm">
            EN IYI CEVAP
          </div>
        ) : null}
      </div>
      <div className="text-sm font-medium mb-4">
        {item.comment}
      </div>
      <div className="flex  items-center">
        <button
          onClick={upVote}
          className="px-4 rounded-md bg-gray-100 hover:bg-gray-200 mr-4 flex"
        >
          <UpIcon size={24} color="#858585" />
        </button>
        <button
          onClick={downVote}
          className="px-4 rounded-md bg-gray-100 hover:bg-gray-200 flex items-center"
        >
          <DownIcon size={24} color="#858585" />
        </button>
      </div>
    </div>
  );
}
