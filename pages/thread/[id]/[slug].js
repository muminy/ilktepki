import Avatar from "@components/core/Avatar";
import Layout from "@components/core/Layout";
import Sidebar from "@components/core/Sidebar";
import api from "lib/api";
import getThreads from "lib/getThreads";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import slugify from "slugify";

export default function Slug({ post }) {
  const router = useRouter();

  const [detail, setDetail] = useState({});

  return (
    <Layout>
      <div className="w-full xl:w-3/4 lg:w-3/4 pr-10">
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
        <div className="">
          {post.icerik.split("\n").map((item, index) => (
            <p className="mb-1" key={index}>
              {item}
            </p>
          ))}
        </div>
      </div>
      <Sidebar />
    </Layout>
  );
}

export async function getStaticPaths() {
  const posts = await getThreads();
  return {
    paths: posts.data.results.map(
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
  const allPost = await getThreads();
  const posts = allPost.data.results.filter(
    (item) => item._id === id,
  );
  return {
    props: {
      post: posts[0],
    },
  };
}
