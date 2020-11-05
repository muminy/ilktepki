import Layout from "@components/core/Layout";
import LSidebar from "@components/core/LeftSidebar";
import Sidebar from "@components/core/Sidebar";
import Thread from "@components/core/Thread";
import { urls } from "lib/api";

export default function Home({ posts }) {
  return (
    <Layout size="full">
      <LSidebar />
      <Thread posts={posts} />
      <Sidebar />
    </Layout>
  );
}

Home.getInitialProps = async (ctx) => {
  const res = await fetch(urls + "/posts/get", {
    method: "POST",
    headers: {
      "Content-Type": "application/javascript;charset=utf-8",
    },
  });
  const allPosts = await res.json();
  return { posts: allPosts.results };
};
