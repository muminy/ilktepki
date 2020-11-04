import Layout from "@components/core/Layout";
import Thread from "@components/core/Thread";
import Sidebar from "@components/core/Sidebar";
import { Categories as dd } from "@constants/Categories";
import Api from "lib/api";
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
  const allPost = await new Api("/posts/get").post({});
  const posts = await allPost.results.filter(
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
