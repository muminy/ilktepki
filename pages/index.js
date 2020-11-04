import Layout from "@components/core/Layout";
import LSidebar from "@components/core/LeftSidebar";
import Sidebar from "@components/core/Sidebar";
import Thread from "@components/core/Thread";
import Api from "lib/api";

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
  const allPost = await new Api("/posts/get").post({});
  const posts = await allPost.results;
  return {
    props: {
      posts: posts,
    },
  };
}
