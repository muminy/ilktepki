import Avatar from "@components/core/Avatar";
import Layout from "@components/core/Layout";
import Sidebar from "@components/core/Sidebar";
import slugify from "slugify";
import { urls } from "lib/api";

export default function Slug({ post }) {
  return (
    <Layout>
      <Sidebar />
    </Layout>
  );
}

export async function getStaticPaths() {
  const postAll = await fetch(urls + "/posts/get", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
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
  const allPosts = await fetch(urls + "/posts/get", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const postJson = await allPosts.json();
  const posts = postJson.results.filter(
    (item) => item._id === id,
  );
  return {
    props: {
      post: posts[0],
    },
  };
}
