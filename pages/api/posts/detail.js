import { connect } from "@util/mongodb";
import { ObjectId } from "mongodb";

export default async function (require, response) {
  try {
    const { db } = await connect();
    const { _id } = require.body;
    if (require.method === "POST") {
      const resuts = await db
        .collection("posts")
        .findOne({ _id });
      response.json({ code: 200, resuts });
    } else {
      response.json({
        code: 2,
        message: "bad_request",
      });
    }
  } catch (e) {
    response.status(500);
    response.json({
      message: "to_server",
      code: 201,
    });
  }
}
