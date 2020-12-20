import { connect } from "util/mongodb";
import JWT from "jsonwebtoken";

export default async function (request, response) {
  const { method } = request;

  try {
    const { db } = await connect();

    switch (method) {
      case "POST":
        const { JWT_KEY } = process.env;
        const {
          baslik,
          icerik,
          categoryItem,
          JWT_TOKEN,
        } = request.body;

        const handleCreatePost = async (err, decodeUser) => {
          if (err) {
            return response.json({
              status: "Erorr",
              message: "Bad Request",
            });
          }
          const userPayload = {
            userId: decodeUser.userId,
            username: decodeUser.userName,
            name: decodeUser.name,
          };

          await db.collection("posts").insertOne({
            baslik,
            icerik,
            author: userPayload,
            active: true,
            createdAt: new Date().toISOString(),
            categoryItem,
            votes: [],
          });

          response.json({
            code: 200,
            message: "Kayıt Başarılı",
          });
        };

        JWT.verify(JWT_TOKEN, JWT_KEY, handleCreatePost);
        break;

      default:
        response.json({
          status: "Error",
          message: "Bad Request",
        });
        break;
    }
  } catch (e) {
    response.status(500);
    response.json({
      message: "to_server",
      code: 201,
    });
  }
}
