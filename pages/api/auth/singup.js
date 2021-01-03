import { connect } from "util/mongodb";

export default async function (request, response) {
  try {
    const { db } = await connect();
    const { username, password, email, name } = request.body;
    const findUser = await db.collection("users").findOne({ username });
    if (findUser) {
      response.json({
        code: 1,
        message: "Bu kullanıcı mevcut",
      });
    } else if (request.method === "POST") {
      await db.collection("users").insertOne({
        username,
        password,
        email,
        name,
        createdAt: new Date().toISOString(),
        active: true,
      });
      response.json({ code: 200, message: "Kayıt Başarılı" });
    } else {
      response.json({
        code: 2,
        message: "Kötü İstek",
      });
    }
  } catch (e) {
    response.status(500);
    response.json({
      message: "Unable to insert ... sorry",
      code: 201,
    });
  }
}
