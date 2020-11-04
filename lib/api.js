export let urls =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/api"
    : "https://fspor.com/api";
