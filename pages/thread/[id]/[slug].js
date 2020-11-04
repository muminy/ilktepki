import Avatar from "@components/core/Avatar";
import Layout from "@components/core/Layout";
import Sidebar from "@components/core/Sidebar";
import slugify from "slugify";
import { urls } from "lib/api";

export default function Slug({ post }) {
  return (
    <Layout>
      <Sidebar />
    </Layout>
  );
}
