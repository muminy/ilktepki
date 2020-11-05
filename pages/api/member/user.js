import { connect } from "@util/mongodb";

export default async function (request, response) {
  try {
    const { db } = await connect();
    const { username } = request.body;
    if (request.method === "POST") {
      const results = await db
        .collection("users")
        .findOne({ username });
      response.json({ code: 200, results });
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
