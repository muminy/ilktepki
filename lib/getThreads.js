import api from "./api";

export default async function getThreads() {
  return await api.post("/posts/get");
}
