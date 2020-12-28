import Link from "next/link";
import GetTiming from "helpers/getTime";
import UpIcon from "@components/icons/Up";
import DownIcon from "@components/icons/Down";
import slugify from "slugify";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Api } from "lib/api";

export default function Subject({ item }) {
  const titleSlug = slugify(item.baslik, {
    replacement: "-",
    remove: true,
    lower: true,
  })
    .replace("(", "")
    .replace(")", "");

  const USER_ID = Cookies.get("USER_ID");

  const [upVote, setUpVote] = useState(false);
  const [DownVote, setDownVote] = useState(false);

  useEffect(() => {
    setUpVote(
      item.votes.filter((allItem) => allItem.userId === USER_ID && allItem.vote).length > 0,
    );
    setDownVote(
      item.votes.filter((allItem) => allItem.userId === USER_ID && !allItem.vote).length > 0,
    );
  }, []);

  const [upVoteLen, setUpVoteLen] = useState(item.votes.filter((allItem) => allItem.vote).length);
  const [downVoteLen, setDownVoteLen] = useState(
    item.votes.filter((allItem) => !allItem.vote).length,
  );

  const DiffVotes = upVoteLen - downVoteLen;

  const UpVoteSubject = async () => {
    const getVotes = await Api.post("/posts/vote", {
      user_id: USER_ID,
      _id: item._id,
      voteType: true,
    });
    setUpVoteLen(getVotes.data.votes.filter((allItem) => allItem.vote).length);
    setDownVoteLen(getVotes.data.votes.filter((allItem) => !allItem.vote).length);
    setUpVote(true);
    setDownVote(false);
    // setAllVotes(getVotes.data.votes);
  };

  const DownVoteSubject = async () => {
    const getVotes = await Api.post("/posts/vote", {
      user_id: USER_ID,
      _id: item._id,
      voteType: false,
    });

    setUpVoteLen(getVotes.data.votes.filter((allItem) => allItem.vote).length);
    setDownVoteLen(getVotes.data.votes.filter((allItem) => !allItem.vote).length);
    setUpVote(false);
    setDownVote(true);
    // setAllVotes(getVotes.data.votes);
  };

  return (
    <div className="flex w-full relative overflow-hidden  mb-2 p-2 pl-0 pt-0 pb-0 subject shadow-sm bg-white rounded-none xl:rounded-md lg:rounded-md md:rounded-sm items-center">
      <div className="text-center flex flex-col mr-4 justify-between">
        <div className={`w-full hover:bg-gray-100 ${upVote ? "bg-gray-50" : ""}`}>
          <button onClick={UpVoteSubject} className={`rounded-md w-full  py-2 px-2 `}>
            <UpIcon color={upVote ? "#5cdb87" : "#111"} size={24} />
          </button>
        </div>
        <div className="font-semibold text-xs my-2">{DiffVotes}</div>
        <div className={`w-full hover:bg-gray-100 ${DownVote ? "bg-gray-50" : ""}`}>
          <button onClick={DownVoteSubject} className={`rounded-md w-full py-2 px-2 `}>
            <DownIcon color={DownVote ? "red" : "#111"} size={24} />
          </button>
        </div>
      </div>
      <div className="w-full">
        <div className="flex items-center">
          <Link href="/member/[username]" as={`/member/${item.author.username}`}>
            <a
              className={`lowercase font-medium mr-2 no-underline hover:underline text-gray-600 cursor-pointer size-xxs`}
            >
              {item.author.username}
            </a>
          </Link>
          <div className={`text-gray-400 font-medium mr-2 size-xxs`}>
            {GetTiming(item.createdAt)}
          </div>
        </div>
        <Link href="/thread/[id]/[slug]" as={`/thread/${item._id}/${titleSlug}`}>
          <a
            className={`font-semibold hover:underline cursor-pointer text-black text-base hover:text-black no-underline`}
          >
            {item.baslik.substr(0, 100)}
          </a>
        </Link>
        <div className="p text-gray-500 mt-1">{item.icerik.substr(0, 140)}...</div>
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
