import Layout from "@components/core/Layout";
import Thread from "@components/core/Thread";
import Sidebar from "@components/core/Sidebar";
import { urls } from "lib/api";

export default function Categories({ posts }) {
  return (
    <Layout>
      <Thread size="3/4" posts={posts} />
      <Sidebar />
    </Layout>
  );
}

Categories.getInitialProps = async ({ query }) => {
  const res = await fetch(urls + "/posts/get", {
    method: "POST",
    headers: {
      "Content-Type": "application/javascript;charset=utf-8",
    },
  });
  const allPosts = await res.json();
  const posts = await allPosts.results.filter(
    (item) => item.categoryItem?.key === parseInt(query.id),
  );
  return {
    posts: posts,
  };
};
