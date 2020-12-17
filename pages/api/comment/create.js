import { connect } from "util/mongodb";

export default async function (request, response) {
  try {
    const { db } = await connect();
    const { comment, userItem, threadId } = request.body;
    if (request.method === "POST") {
      await db.collection("comments").insertOne({
        comment,
        userItem,
        threadId,
        createdAt: new Date(),
        success: false,
        votes: [],
      });
      response.json({ code: 200, message: "Kayıt Başarılı" });
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
