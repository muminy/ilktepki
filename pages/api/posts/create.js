import { connect } from "util/mongodb";

export default async function (request, response) {
  try {
    const { db } = await connect();
    const {
      baslik,
      icerik,
      userId,
      categoryItem,
    } = request.body;
    if (request.method === "POST") {
      await db.collection("posts").insertOne({
        baslik,
        icerik,
        userId,
        active: true,
        createdAt: new Date().toISOString(),
        categoryItem,
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
