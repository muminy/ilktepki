export const siteConfig = {
  URL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://fspor.com/",
  name: "feewer",
  github: {
    username: "muminy",
  },
};

export const theme = {
  dark: {
    backgroundColor: "#000",
    color: "#fff",
  },
  light: {
    backgroundColor: "#fff",
    color: "#111",
  },
};
