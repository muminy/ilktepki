import Avatar from "@components/core/Avatar";
import Layout from "@components/core/Layout";
import Sidebar from "@components/core/Sidebar";
import slugify from "slugify";
import { Api, urls } from "lib/api";
import { useAuth } from "context/Auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import GetTiming from "helpers/getTime";
import { CommentIcon, LikeIcon } from "@constants/icons";
import ContentEditable from "react-contenteditable";
import Comment from "@components/ui/Comment";

export default function Slug({ post, id }) {
  const { login } = useAuth();
  const router = useRouter();
  const [comment, setComment] = useState("");
  const [commentArray, setCommentArray] = useState([]);
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

    const response = await Api.post("/comment/create", {
      userItem,
      comment: commentArray,
      threadId,
    });

    if (response.data.code === 200) {
      setCode(200);
      getComments();
      setComment("");
    } else {
      setCode("error_comment");
    }

    setLoading(false);
    setTimeout(() => setCode(null), 2000);
  };

  const onChangeHandle = (event) => {
    let allComments = event.currentTarget.innerText.split("\n");
    setComment(event.target.value);
    setCommentArray(allComments);
    console.log(allComments);
  };
  const refContentEditable = React.createRef();
  return (
    <Layout>
      {post ? (
        <div className="w-full xl:w-3/4 lg:w-3/4 pr-0 xl:pr-10 lg:pr-10">
          <div className="flex items-center mb-2">
            <Avatar />
            <div className="font-semibold text-base ml-4">
              {post.userId.name}
            </div>
          </div>
          <div className="font-black text-4xl mb-1">
            {post.baslik}
          </div>
          <div className="flex mb-4 items-center">
            <div className="text-gray-400 font-medium text-xs mr-2 afterView flex items-center">
              217.271 Views
            </div>
            <div className="text-gray-400 font-medium text-xs mr-2">
              {GetTiming(post.createdAt)}
            </div>
          </div>
          <div className="flex items-center mb-4">
            <div className="flex items-center border-r-0 px-5 py-1 border border-gray-200 ">
              <LikeIcon size={18} color="#000000" />
              <span className="ml-2 text-xs font-semibold text-black-500">
                17
              </span>
            </div>
            <div className="flex items-center px-5 py-1 border border-gray-200">
              <CommentIcon size={18} color="#000000" />
              <span className="ml-2 text-xs font-semibold text-black-500">
                {comments.length}
              </span>
            </div>
          </div>
          <div className="mb-10 leading-1">
            {post.icerik.split("\n").map((item, index) => (
              <p className="mb-6 p" key={index}>
                {item}
              </p>
            ))}
          </div>
          <div className="flex h-auto mb-8">
            <Avatar size={36} />
            <div className="ml-4 w-full ">
              <ContentEditable
                className="textaread px-4 py-2 bg-gray-50  w-full focus:bg-white rounded-md resize-none appearance-none text-sm mb-4"
                onChange={onChangeHandle}
                tagName="div"
                itemRef={refContentEditable}
                html={comment}
                disabled={false}
                placeholder="Ne düşünüyorsun?"
              />
              <button
                onClick={sendComment}
                className="buttonxxb px-6 py-2 font-medium focus:outline-none text-white rounded-md text-sm"
              >
                Yorum Gönder
              </button>
            </div>
          </div>

          {commentsLoading ? null : (
            <div className="text-sm font-bold mb-4">
              {comments.length} Yorum
            </div>
          )}

          {comments.map((item, index) => (
            <Comment
              key={item._id}
              votes={item.votes}
              item={item}
              index={index}
            />
          ))}
          {commentsLoading ? <CommentsLoadingCard /> : null}
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

const CommentsLoadingCard = () => (
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
