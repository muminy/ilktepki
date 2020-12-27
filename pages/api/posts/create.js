import { connect } from "util/mongodb";
import JWT from "jsonwebtoken";

export default async function (request, response) {
  const { method } = request;
  const { JWT_TOKEN } = request.cookies;
  const { JWT_KEY } = process.env;

  try {
    const { db } = await connect();

    switch (method) {
      case "POST":
        const { baslik, icerik, categoryItem } = request.body;
        const handleCreatePost = async (err, decodeUser) => {
          if (err) {
            return response.json({
              status: "Erorr",
              message: "İzinsiz İstek",
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
            comments: [],
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
          message: "Kötü İstek",
        });
        break;
    }
  } catch (e) {
    response.status(500);
    response.json({
      message: "Server Hatası",
      code: 201,
    });
  }
}
