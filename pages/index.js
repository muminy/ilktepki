import Layout from "@components/core/Layout";
import LSidebar from "@components/core/LeftSidebar";
import Sidebar from "@components/core/Sidebar";
import Thread from "@components/core/Thread";
import { urls } from "lib/api";
import { useEffect, useState } from "react";

export default function Home({ posts }) {
  const [allPost, setAllPost] = useState(posts);

  const getAllPosts = async () => {
    const res = await fetch(urls + "/posts/get", {
      method: "POST",
      headers: {
        "Content-Type": "application/javascript;charset=utf-8",
      },
    });
    const allPosts = await res.json();
    setAllPost(allPosts.results);
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <Layout size="full">
      <LSidebar />
      <Thread posts={allPost} />
      <Sidebar />
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch(urls + "/posts/get", {
    method: "POST",
    headers: {
      "Content-Type": "application/javascript;charset=utf-8",
    },
  });
  const allPosts = await res.json();
  return {
    props: {
      posts: allPosts.results,
    },
  };
}
