import { connect } from "@util/mongodb";

export default async function (require, response) {
  try {
    const { db } = await connect();
    const {
      baslik,
      icerik,
      userId,
      categoryItem,
    } = require.body;
    if (require.method === "POST") {
      await db.collection("posts").insertOne({
        baslik,
        icerik,
        userId,
        active: true,
        createdAt: new Date(),
        categoryItem,
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
