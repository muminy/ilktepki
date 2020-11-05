import { connect } from "@util/mongodb";

export default async function (request, response) {
  try {
    const { db } = await connect();
    if (request.method === "POST") {
      const results = await db
        .collection("posts")
        .find()
        .sort({ createdAt: -1 })
        .limit(10)
        .toArray();
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
