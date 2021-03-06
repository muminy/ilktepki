import Link from "next/link";
import GetTiming from "helpers/getTime";
import UpIcon from "@components/icons/Up";
import DownIcon from "@components/icons/Down";
import slugify from "slugify";
import { useEffect, useState } from "react";
import { Api } from "lib/api";
import { useAuthToken } from "context/AuthToken";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import { Renderers } from "helpers/Renderers";

export default function Subject({ item }) {
  const router = useRouter();

  const titleSlug = slugify(item.baslik, {
    replacement: "-",
    remove: true,
    lower: true,
  })
    .replace("(", "")
    .replace(")", "");

  const { USER_ID } = useAuthToken();

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
    if (!USER_ID) {
      return router.push("/login");
    }

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
    if (!USER_ID) {
      return router.push("/login");
    }

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
    <div className="flex w-full relative overflow-hidden  mb-2 pl-0 pt-0 pb-0 subject shadow-sm bg-white rounded-none xl:rounded-md lg:rounded-md md:rounded-sm">
      <div className="w-full ml-4 py-3 flex flex-col justify-center">
        <Link href="/thread/[id]/[slug]" as={`/thread/${item._id}/${titleSlug}`}>
          <a
            className={`font-semibold hover:underline cursor-pointer text-black text-base hover:text-black no-underline`}
          >
            {item.baslik.substr(0, 100)}
          </a>
        </Link>
        <div className="flex items-center">
          <Link href="/member/[username]" as={`/member/${item.author.username}`}>
            <a
              className={`lowercase font-semibold mr-2 no-underline hover:underline leading-0 text-gray-600 cursor-pointer size-xsxs`}
            >
              {item.author.username}
            </a>
          </Link>
          <div className={`text-gray-400 font-semibold mr-2 size-xsxsd`}>
            {GetTiming(item.createdAt)}
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
          .size-xsxs {
            font-size: 13px;
          }
          .size-xsxsd {
            font-size: 11px;
          }
        `}
      </style>
    </div>
  );
}
