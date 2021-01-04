import Layout from "@components/core/Layout";
import Sidebar from "@components/core/Sidebar";
import slugify from "slugify";
import { Api } from "lib/api";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SpinIcon } from "@constants/icons";
import Comment from "@components/ui/Comment";
import { CommentSkeleton } from "@components/core/Skeleton/Skeleton";
import ReactMarkdown from "react-markdown";
import TextEditor from "@components/ui/TextEditor";
import { Renderers } from "helpers/Renderers";

export default function Slug({ post, id }) {
  const router = useRouter();

  const threadId = router.query.id;
  const [JsonWebToken, setJsonWebToken] = useState(null);
  const [sendCommentLoading, setSendCommentLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [responseCode, setResponseCode] = useState("none_error");
  const [commentsLoading, setCommentLoading] = useState(true);
  const [commentContent, setCommentContent] = useState({ text: "", html: "" });

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
    if (!commentContent.text.length) {
      return setResponseCode("Bu şekilde yorum yapamazsın, lütfen birşeyler yaz.");
    }
    setSendCommentLoading(true);
    const response = await Api.post("/comment/create", {
      comment: commentContent.text,
      threadId,
      baslik: post.baslik,
    });

    if (response.data.code === 200) {
      getComments();
      setCommentContent({ html: "", text: "" });
    }

    setSendCommentLoading(false);
  };

  useEffect(() => {
    setJsonWebToken(Cookies.get("JWT_TOKEN"));
  }, []);

  return (
    <Layout>
      {post ? (
        <div className="w-full xl:w-3/4 lg:w-3/4 py-4 px-4 xl:px-8 xl:py-8 lg:px-8 lg:py-4 md:py-4 md:px-4 bg-white shadow-sm mr-0 md:mr-16">
          <div className="flex items-center">
            <div className="font-semibold text-base">{post.author.name}</div>
          </div>
          <div className="font-black text-2xl xl:text-4xl lg:text-4xl md:text-4xl mb-6">
            {post.baslik}
          </div>
          <div className="mb-6 contentMarkdown leading-1">
            <ReactMarkdown renderers={Renderers} allowDangerousHtml children={post.icerik} />
          </div>
          {responseCode !== "none_error" ? (
            <div className="py-2 w-full mb-4 bg-gray-50 text-blue-500 text-center rounded-md font-medium">
              {responseCode}
            </div>
          ) : null}
          {JsonWebToken && (
            <div className="flex h-auto mb-8">
              <div className="w-full ">
                <TextEditor className="mb-4" value={commentContent} setValue={setCommentContent} />
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
  const postAll = await Api.post("/posts/get");
  const posts = postAll.data;
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
