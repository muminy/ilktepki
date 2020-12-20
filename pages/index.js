import Layout from "@components/core/Layout";
import LSidebar from "@components/core/LeftSidebar";
import Sidebar from "@components/core/Sidebar";
import Thread from "@components/core/Thread";
import { Api } from "lib/api";
import { useEffect } from "react";

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
  const res = await Api.post("/posts/get");
  return { posts: res.data.results };
};
