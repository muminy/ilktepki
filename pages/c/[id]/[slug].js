import Layout from "@components/core/Layout";
import Thread from "@components/core/Thread";
import Sidebar from "@components/core/Sidebar";
import { Api } from "lib/api";
import { useEffect, useState } from "react";

export default function Categories({ query }) {
  const [AllPosts, setAllPosts] = useState([]);
  const [loaded, setLoaded] = useState(true);

  const GetPosts = async () => {
    const response = await Api.post("/posts/get");
    setLoaded(false);
    setAllPosts(
      response.data.results.filter((item) => item.categoryItem?.key === parseInt(query.id)),
    );
  };

  useEffect(() => {
    GetPosts();
  }, []);
  return (
    <Layout>
      <Thread size="3/4" loaded={loaded} posts={AllPosts} />
      <Sidebar />
    </Layout>
  );
}

Categories.getInitialProps = ({ query }) => {
  return { query };
};
