import Avatar from "@components/core/Avatar";
import { Api } from "lib/api";
import Link from "next/link";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import GetTiming from "helpers/getTime";
import ReactMarkdown from "react-markdown";
import { Renderers } from "helpers/Renderers";

export default function Comment({ item, votes, index }) {
  const [allVotes, setAllVotes] = useState(votes);

  const USER_ID = Cookies.get("USER_ID");

  const [disableButton, setDisableButton] = useState(USER_ID ? false : true);

  const [isVoted, setIsVoted] = useState(
    votes.filter((itemd) => itemd.userId === USER_ID).length > 0,
  );

  const VoteComment = async () => {
    const getVotes = await Api.post("/comment/vote", {
      id: item._id,
    });
    setIsVoted(!isVoted);
    setAllVotes(getVotes.data.votes);
  };

  return (
    <div key={item._id} className={` ${index === 0 ? "" : "border-t-0"}`}>
      <div className="mb-4 justify-between">
        <div className="flex">
          <Avatar size={40} />
          <div className="ml-4 w-full leading-tight ">
            <Link href="/member/[username]" as={`/member/${item.userItem.username}`}>
              <a className="text-sm font-bold text-black no-underline">{item.userItem.username}</a>
            </Link>
            <ReactMarkdown
              className="contentMarkdown w-full"
              renderers={Renderers}
              allowDangerousHtml
              children={item.comment}
            />
            <div className="flex  items-center mt-2">
              <div className="text-xs font-medium text-gray-500 afterView flex items-center">
                {GetTiming(item.createdAt)}
              </div>
              {disableButton ? (
                <div className="obutton flex items-center flex outline-none text-xs ml-2 text-xs font-medium outline-none text-gray-500">
                  {allVotes.length} Like
                </div>
              ) : (
                <button
                  disabled={disableButton}
                  onClick={VoteComment}
                  className={`obutton flex items-center flex outline-none text-xs ml-2 text-xs font-medium outline-none text-gray-500 hover:underline`}
                >
                  {allVotes.length} {isVoted ? "Liked" : "Like"}
                </button>
              )}
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
