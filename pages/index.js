import Layout from "@components/core/Layout";
import LSidebar from "@components/core/LeftSidebar";
import Sidebar from "@components/core/Sidebar";
import Thread from "@components/core/Thread";
import { Api } from "lib/api";
import { useEffect, useState } from "react";

export default function Home() {
  const [AllPosts, setAllPosts] = useState([]);
  const [loaded, setLoaded] = useState(true);

  const GetPosts = async () => {
    const response = await Api.post("/posts/get");
    setLoaded(false);
    setAllPosts(response.data.results);
  };

  useEffect(() => {
    GetPosts();
  }, []);

  return (
    <Layout size="full">
      <LSidebar />
      <Thread loaded={loaded} posts={AllPosts} />
      <Sidebar />
    </Layout>
  );
}
