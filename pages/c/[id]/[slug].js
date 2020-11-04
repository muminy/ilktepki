import Layout from "@components/core/Layout";
import Thread from "@components/core/Thread";
import Sidebar from "@components/core/Sidebar";
import { Categories as dd } from "@constants/Categories";
import { urls } from "lib/api";

export default function Categories({ posts }) {
  return (
    <Layout>
      <Sidebar />
    </Layout>
  );
}
