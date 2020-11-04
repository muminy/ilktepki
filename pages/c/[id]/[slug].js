import Layout from "@components/core/Layout";
import Thread from "@components/core/Thread";
import LeftSidebar from "@components/core/LeftSidebar";
import Sidebar from "@components/core/Sidebar";
import { Categories as dd } from "@constants/Categories";
import getThreads from "lib/getThreads";
export default function Categories({ posts }) {
  console.log(posts);
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
  const allPost = await getThreads();
  const posts = await allPost.data.results.filter(
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
