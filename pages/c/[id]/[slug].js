import Layout from "@components/core/Layout";
import Thread from "@components/core/Thread";
import Sidebar from "@components/core/Sidebar";
import { Categories as dd } from "@constants/Categories";
import IsoFetch from "isomorphic-fetch";
import { urls } from "lib/api";

export default function Categories({ posts }) {
  return (
    <Layout>
      <Thread size="3/4" posts={posts} />
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
  const allPost = await IsoFetch(
    urls[process.env.NODE_ENV] + "/posts/get",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    },
  );
  const jsonPosts = await allPost.json();
  const posts = await jsonPosts.results.filter(
    (item) =>
      item.categoryItem.key === parseInt(id) &&
      item.categoryItem.slug === slug,
  );
  return {
    props: {
      posts: posts,
    },
  };
}
