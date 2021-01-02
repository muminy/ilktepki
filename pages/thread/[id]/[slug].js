import Avatar from "@components/core/Avatar";
import Layout from "@components/core/Layout";
import Sidebar from "@components/core/Sidebar";
import slugify from "slugify";
import { Api, urls } from "lib/api";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import GetTiming from "helpers/getTime";
import { CommentIcon, LikeIcon, SpinIcon } from "@constants/icons";
import ContentEditable from "react-contenteditable";
import Comment from "@components/ui/Comment";
import { useAuthToken } from "context/AuthToken";
import Skeleton, { CommentSkeleton } from "@components/core/Skeleton/Skeleton";

export default function Slug({ post, id }) {
  const router = useRouter();

  const threadId = router.query.id;
  const [JsonWebToken, setJsonWebToken] = useState(null);
  const [sendCommentLoading, setSendCommentLoading] = useState(false);
  const [comment, setComment] = useState("");
  const [commentArray, setCommentArray] = useState([]);
  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentLoading] = useState(true);

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
    setSendCommentLoading(true);
    const response = await Api.post("/comment/create", {
      comment: commentArray,
      threadId,
      baslik: post.baslik,
    });

    if (response.data.code === 200) {
      getComments();
      setComment("");
    }

    setSendCommentLoading(false);
  };

  const onChangeHandle = (event) => {
    let allComments = event.currentTarget.innerText.split("\n");
    setComment(event.target.value);
    setCommentArray(allComments);
  };

  useEffect(() => {
    setJsonWebToken(Cookies.get("JWT_TOKEN"));
  }, []);

  const refContentEditable = React.createRef();

  return (
    <Layout>
      {post ? (
        <div className="w-full xl:w-3/4 lg:w-3/4 py-4 px-4 xl:px-8 xl:py-8 lg:px-8 lg:py-4 md:py-4 md:px-4 bg-white shadow-sm mr-0 md:mr-16">
          <div className="flex items-center mb-2">
            <Avatar />
            <div className="font-semibold text-base ml-4">{post.author.name}</div>
          </div>
          <div className="font-black text-4xl mb-1">{post.baslik}</div>
          <div className="flex mb-4 items-center">
            <div className="text-gray-400 font-medium text-xs mr-2 afterView flex items-center">
              217.271 Views
            </div>
            <div className="text-gray-400 font-medium text-xs mr-2">
              {GetTiming(post.createdAt)}
            </div>
          </div>
          <div className="flex items-center mb-8">
            <div className="flex items-center px-3 bg-gray-100 rounded-md py-1 mr-1">
              <LikeIcon size={18} color="#9ca3af" />
              <span className="ml-2 text-xs font-semibold text-gray-700">17</span>
            </div>
            <div className="flex items-center px-3 bg-gray-100 rounded-md py-1">
              <CommentIcon size={18} color="#9ca3af" />
              <span className="ml-2 text-xs font-semibold text-gray-700">{comments.length}</span>
            </div>
          </div>
          <div className="mb-10 leading-1">
            {post.icerik.split("\n").map((item, index) => (
              <p className="mb-6 p" key={index}>
                {item}
              </p>
            ))}
          </div>

          {JsonWebToken && (
            <div className="flex h-auto mb-8">
              <div>
                <Avatar />
              </div>
              <div className="ml-4 w-full mr-0 md:mr-8 sm:mr-8">
                <ContentEditable
                  className="textaread px-4 py-2 bg-gray-50  w-full focus:bg-white rounded-md resize-none appearance-none text-sm mb-4 mr-16"
                  onChange={onChangeHandle}
                  tagName="div"
                  itemRef={refContentEditable}
                  html={comment}
                  disabled={false}
                  placeholder="Ne düşünüyorsun?"
                />
                <button
                  onClick={sendComment}
                  className="buttonxxb px-6 py-2 font-medium focus:outline-none text-white rounded-md text-sm flex items-center"
                >
                  {sendCommentLoading ? (
                    <>
                      <SpinIcon />
                      Yorum Gönderiliyor
                    </>
                  ) : (
                    "Yorum Gönder"
                  )}
                </button>
              </div>
            </div>
          )}

          {commentsLoading ? null : (
            <div className="text-sm font-bold mb-4">{comments.length} Yorum</div>
          )}
          {commentsLoading && (
            <>
              <CommentSkeleton />
              <CommentSkeleton />
            </>
          )}
          {comments.map((item, index) => (
            <Comment key={index} votes={item.votes} item={item} index={index} />
          ))}
        </div>
      ) : (
        <div className="">Loading</div>
      )}
      <Sidebar />
      <style jsx>{`
        .afterView::after {
          content: "";
          display: block;
          width: 4px;
          height: 4px;
          border-radius: 100%;
          background-color: #b8b8b8;
          margin-left: 0.5rem;
        }
        .buttonxxb {
          font-family: "Inter", sans-serif;
          background-color: #5a44ff;
        }
        .p {
          margin-bottom: 1.5rem;
          line-height: 22px;
          font-size: 15px;
          font-weight: 500;
        }
      `}</style>
    </Layout>
  );
}

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

export async function getStaticProps(context) {
  const { id } = context.params;

  const allPosts = await Api.post("/posts/get");
  const posts = allPosts.data.results.filter((item) => item._id === id);
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
