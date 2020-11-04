import { connect } from "@util/mongodb";

export default async function (require, response) {
  try {
    const { db } = await connect();
    const { username, password, email, name } = require.body;
    const findUser = await db
      .collection("users")
      .findOne({ username });
    if (findUser) {
      response.json({
        code: 1,
        message: "Bu kullanıcı mevcut",
      });
    } else if (require.method === "POST") {
      await db.collection("users").insertOne({
        username,
        password,
        email,
        name,
        createdAt: new Date(),
        active: true,
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
      message: "Unable to insert ... sorry",
      code: 201,
    });
  }
}
