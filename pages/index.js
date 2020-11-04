import Layout from "@components/core/Layout";
import LSidebar from "@components/core/LeftSidebar";
import Sidebar from "@components/core/Sidebar";
import Thread from "@components/core/Thread";
import getThreads from "lib/getThreads";

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
  const allPost = await getThreads();
  const posts = await allPost.data.results;
  return {
    props: {
      posts: posts,
    },
  };
}
