import { connect } from "util/mongodb";

export default async function (request, response) {
  try {
    const { db } = await connect();
    const { username, password } = request.body;
    if (request.method === "POST") {
      const result = await db
        .collection("users")
        .findOne({ username, password });

      result
        ? response.json({ login: true, data: result })
        : response.json({ login: false });
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
