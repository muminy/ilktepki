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
    <div key={index} className="text-sm mb-2  font-medium">
      Konuya
      <Link
        href="/thread/[id]/[slug]"
        as={`/thread/${item._id}/${slug}`}
      >
        <a className="text-blue-500 font-semibold mx-1">
          "{item.comment.join(" ").substring(0, 120)}"
        </a>
      </Link>
      yazdı
      <span className="text-xs text-gray-400 ml-2">
        {GetTiming(item.createdAt)}
      </span>
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
    <div key={index} className="text-sm mb-2 font-medium">
      Konu
      <Link
        href="/thread/[id]/[slug]"
        as={`/thread/${item._id}/${slug}`}
      >
        <a className="text-blue-500 font-semibold mx-1">
          "{item.baslik.substring(0, 120)}"
        </a>
      </Link>
      Paylaştı
      <span className="text-xs text-gray-400 ml-2">
        {GetTiming(item.createdAt)}
      </span>
    </div>
  );
};
