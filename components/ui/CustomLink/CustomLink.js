import GetTiming from "helpers/getTime";
import { Api } from "lib/api";
import Link from "next/link";
import slugify from "slugify";

export const CommentLink = ({ item, index }) => {
  const slug = slugify(item.baslik, {
    lower: true,
    locale: true,
    replacement: "-",
  });

  return (
    <div
      key={index}
      className="text-sm flex items-center px-4 bg-white shadow-sm py-2 mb-1 font-medium"
    >
      <div className="w-3/4 mr-auto">
        <Link href="/thread/[id]/[slug]" as={`/thread/${item.threadId}/${slug}`}>
          <a className="text-blue-500 font-semibold mx-1">Konuya</a>
        </Link>
        Yorum yaptı.
      </div>
      <div className="text-xs text-right w-1/4 text-gray-400 ">{GetTiming(item.createdAt)}</div>
    </div>
  );
};

export const CreatedPostLink = ({ item, index }) => {
  const slug = slugify(item.baslik, {
    lower: true,
    locale: true,
    replacement: "-",
  });

  return (
    <div
      key={index}
      className="text-sm px-4 flex items-center bg-white shadow-sm py-2 mb-1 font-medium"
    >
      <div className="w-3/4 mr-auto">
        Konu
        <Link href="/thread/[id]/[slug]" as={`/thread/${item._id}/${slug}`}>
          <a className="text-blue-500 font-semibold mx-1">"{item.baslik.substring(0, 120)}"</a>
        </Link>
        Paylaştı
      </div>
      <div className="text-xs text-gray-400 w-1/4 text-right">{GetTiming(item.createdAt)}</div>
    </div>
  );
};
