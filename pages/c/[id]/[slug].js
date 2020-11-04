import Layout from "@components/core/Layout";
import Thread from "@components/core/Thread";
import Sidebar from "@components/core/Sidebar";
import { Categories as dd } from "@constants/Categories";
import { urls } from "lib/api";
import { useEffect, useState } from "react";

export default function Categories({ posts, id, slug }) {
  const [allPost, setAllPost] = useState(posts);
  const getAllPosts = async () => {
    const res = await fetch(urls + "/posts/get", {
      method: "POST",
      headers: {
        "Content-Type": "application/javascript;charset=utf-8",
      },
    });
    const allPosts = await res.json();
    const posts = await allPosts.results.filter(
      (item) =>
        item.categoryItem.key === parseInt(id)
    );
    setAllPost(posts);
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <Layout>
      <Thread size="3/4" posts={allPost} />
      <Sidebar />
    </Layout>
  );
}

export async function getStaticPaths() {
  return {
    paths: dd.map((item) => `/c/${item.key}/${item.slug}`),
    fallback: true,
  };
}

export async function getStaticProps({ params: { id, slug } }) {
  const allPost = await fetch(urls + "/posts/get", {
    method: "POST",
    headers: {
      "Content-Type": "application/javascript;charset=utf-8",
    },
  });
  const jsonPosts = await allPost.json();
  const posts = await jsonPosts.results.filter(
    (item) =>
      item.categoryItem.key === parseInt(id) &&
      item.categoryItem.slug === slug,
  );
  return {
    props: {
      posts: posts ?? [],
      id,
      slug,
    },
  };
}
