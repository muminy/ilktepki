import Avatar from "@components/core/Avatar";
import UpIcon, { KingIcon } from "@components/icons/Up";
import { Api } from "lib/api";
import Link from "next/link";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function Comment({ item, votes, index }) {
  const getUserJSON = Cookies.getJSON("_id");

  const [allVotes, setAllVotes] = useState(votes);
  const [isVoted, setIsVoted] = useState(
    allVotes.filter((item) => item._id === getUserJSON._id)
      .length >= 0,
  );

  useEffect(() => {
    setIsVoted(
      allVotes.filter((item) => item._id === getUserJSON._id)
        .length > 0,
    );
  }, []);

  const VoteComment = async () => {
    const getVotes = await Api.post("/comment/vote", {
      vote: getUserJSON,
      id: item._id,
    });
    setAllVotes(getVotes.data.votes);
    setIsVoted(!isVoted);
  };

  return (
    <div
      key={item._id}
      className={`-mx-5 px-5 border border-gray-100 py-5 ${
        index === 0 ? "" : "border-t-0"
      }`}
    >
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
          onClick={VoteComment}
          className={`px-3 py-1 obutton rounded-md flex items-center bg-gray-100  mr-4 flex outline-none ${
            isVoted
              ? "bg-green-100 hover:bg-green-200"
              : "hover:bg-gray-200"
          }`}
        >
          <KingIcon
            size={16}
            color={isVoted ? "#047857" : "#858585"}
          />
          <div
            className={`text-xs ml-2 ${
              isVoted
                ? "text-green-600 font-bold"
                : "text-gray-500 font-medium"
            }`}
          >
            {allVotes.length}
          </div>
        </button>
      </div>
      <style jsx>{`
        .obutton {
          outline: none !important;
        }
      `}</style>
    </div>
  );
}
