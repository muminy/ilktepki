import Avatar from "@components/core/Avatar";
import UpIcon, { KingIcon } from "@components/icons/Up";
import { Api } from "lib/api";
import Link from "next/link";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import GetTiming from "helpers/getTime";

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
      className={` ${index === 0 ? "" : "border-t-0"}`}
    >
      <div className="mb-4 justify-between">
        <div className="flex">
          <Avatar size={31} />
          <div className="ml-4 leading-tight pt-1">
            <Link
              href="/member/[username]"
              as={`/member/${item.userItem.username}`}
            >
              <a className="text-sm font-bold text-black no-underline">
                {item.userItem.username}
              </a>
            </Link>
            {item.comment.map((items, index) =>
              index === 0 ? (
                <p className=" mb-3">
                  <span
                    className={`text-sm font-base text-black `}
                  >
                    {items}
                  </span>
                </p>
              ) : (
                <p
                  className={`text-sm font-base text-black mb-3`}
                >
                  {items}
                </p>
              ),
            )}

            <div className="flex  items-center mt-2">
              <div className="text-xs font-medium text-gray-500 afterView flex items-center">
                {GetTiming(item.createdAt)}
              </div>
              <button
                onClick={VoteComment}
                className="obutton flex items-center flex outline-none text-xs ml-2 text-xs font-medium outline-none text-gray-500 hover:underline"
              >
                {allVotes.length} {isVoted ? "Liked" : "Like"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .obutton {
          outline: none !important;
        }
        .afterView::after {
          content: "";
          display: block;
          width: 4px;
          height: 4px;
          border-radius: 100%;
          background-color: #b8b8b8;
          margin-left: 0.5rem;
        }
      `}</style>
    </div>
  );
}
