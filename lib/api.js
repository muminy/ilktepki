import Axios from "axios";

export const urls =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/api"
    : "https://fspor.com/api";

export const Api = Axios.create({
  baseURL: urls,
});
