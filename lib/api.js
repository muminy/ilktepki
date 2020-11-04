import IsoFetch from "isomorphic-fetch";

let urls = {
  test: "https://fspor.com/api",
  development: "http://localhost:3000/api",
  production: "https://fspor.com/api",
};

class Api {
  url = "";
  constructor(url) {
    this.url = url;
  }

  async post(params = {}) {
    const data = await IsoFetch(
      urls[process.env.NODE_ENV] + this.url,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      },
    );
    const dataJson = await data.json();
    return dataJson;
  }

  async get() {
    const data = await IsoFetch(
      urls[process.env.NODE_ENV] + this.url,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    );
    const dataJson = await data.json();
    return dataJson;
  }
}

export default Api;
