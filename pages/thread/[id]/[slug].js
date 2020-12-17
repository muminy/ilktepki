import Avatar from "@components/core/Avatar";
import Layout from "@components/core/Layout";
import Sidebar from "@components/core/Sidebar";
import slugify from "slugify";
import { Api, urls } from "lib/api";
import { useAuth } from "context/Auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { siteConfig } from "@constants/config";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Comment from "@components/ui/Comment";

export default function Slug({ post, id }) {
  const { login } = useAuth();
  const router = useRouter();
  const [comment, setComment] = useState("");
  const [code, setCode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentLoading] = useState(true);
  const threadId = router.query.id;
  const userCookie = Cookies.get("_id");

  const getComments = async () => {
    setCommentLoading(true);
    const coms = await Api.post("/comment/get", {
      _id: id,
    });
    setComments(() => [...coms.data.results]);
    setCommentLoading(false);
  };

  useEffect(() => {
    getComments();
  }, []);

  const sendComment = async () => {
    setLoading(true);
    const userItem = await JSON.parse(userCookie);
    if (comment.length > 3) {
      const response = await Api.post("/comment/create", {
        userItem,
        comment,
        threadId,
      });
      if (response.data.code === 200) {
        setCode(200);
        getComments();
        setComment("");
      } else {
        setCode("error_comment");
      }
    } else {
      setCode("error_comment");
    }
    setLoading(false);
    setTimeout(() => setCode(null), 2000);
  };

  return (
    <Layout>
      {post ? (
        <div className="w-full xl:w-3/4 lg:w-3/4 pr-0 xl:pr-10 lg:pr-10">
          <div className="font-semibold text-xl mb-4">
            {post.baslik}
          </div>
          <div className="flex items-center mb-4">
            <Avatar />
            <div className="ml-4">
              <div className="font-semibold text-sm">
                {post.userId.username}
              </div>
              <div className="text-xs">3 dakika önce</div>
            </div>
          </div>
          <div className="mb-10">
            {post.icerik.split("\n").map((item, index) => (
              <p className="mb-1" key={index}>
                {item}
              </p>
            ))}
          </div>

          {login === "user_loading" ? (
            <div className="w-full py-20 text center flex justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="#edd"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="#212121"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
          ) : login ? (
            <div className="mb-10 ">
              {code === 200 ? (
                <div className="py-2 bg-green-200 text-green-500 text-center mb-4 rounded-md font-medium text-sm">
                  Yorum gönderildi
                </div>
              ) : code === null ? null : (
                <div className="py-3 bg-red-200 text-red-500 text-center mb-4 rounded-md font-medium text-sm">
                  Hata oluştu
                </div>
              )}
              <div className="flex mb-2">
                <Avatar size={10} />
                <div className="ml-4 w-full">
                  <textarea
                    value={comment}
                    onChange={(text) =>
                      setComment(text.target.value)
                    }
                    placeholder="Bir cevabın var mı?"
                    className="w-full bg-gray-100 border border-gray-200 p-2 inter text-sm"
                  />
                </div>
              </div>
              <button
                onClick={sendComment}
                className="button flex items-center inter ml-auto text-sm font-medium rounded-md"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Yorum Yapılıyor
                  </>
                ) : (
                  "Yorum yap"
                )}
              </button>
            </div>
          ) : (
            <Login4Comment />
          )}
          {commentsLoading ? null : (
            <div className="text-base font-semibold mb-4">
              {comments.length} Yorum
            </div>
          )}
          {comments.map((item) => (
            <Comment
              key={item._id}
              votes={item.votes}
              item={item}
            />
          ))}
          {commentsLoading ? (
            <div className="items-center text-center bg-gray-100 py-10 rounded-md">
              <div className="mx-auto w-5 mb-4">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="black"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="black"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
              <div className="font-semibold text-sm">
                Yorumlar yükleniyor... Lütfen bekleyiniz.
              </div>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="">Loading</div>
      )}
      <Sidebar />
    </Layout>
  );
}

const Login4Comment = () => (
  <div className="text-sm mb-10 bg-gray-100 text-center py-4">
    Yorum yapabilmek için lütfen
    <Link
      href={{
        pathname: "/login",
        query: { location: currentUrl },
      }}
    >
      <a className="no-underline font-semibold text-black">
        Giriş
      </a>
    </Link>
    yapınız
  </div>
);

export async function getStaticPaths() {
  const postAll = await fetch(urls + "/posts/get", {
    method: "POST",
    headers: {
      "Content-Type": "application/javascript;charset=utf-8",
    },
  });
  const posts = await postAll.json();
  return {
    paths: posts.results.map(
      (item) =>
        `/thread/${item._id}/${slugify(item.baslik, {
          lower: true,
          replacement: "-",
        })}`,
    ),
    fallback: true,
  };
}

export async function getStaticProps({ params: { id } }) {
  const allPosts = await Api.post("/posts/get");
  const posts = allPosts.data.results.filter(
    (item) => item._id === id,
  );

  // paylaşımın yorumları alınıyor
  const comments = await Api.post("/comment/get", {
    _id: id,
  });

  return {
    props: {
      post: posts[0],
      comments: comments.data.results,
      id,
    },
  };
}
