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

export async function getStaticProps() {
  const res = await fetch(
    urls[process.env.NODE_ENV] + "/posts/get",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    },
  );
  const allPosts = await res.json();
  return {
    props: {
      posts: allPosts.results,
    },
  };
}
