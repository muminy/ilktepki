import { connect } from "util/mongodb";
import JWT from "jsonwebtoken";

export default async function (request, response) {
  const { db } = await connect();
  const { method } = request;
  const { JWT_KEY } = process.env;
  const { JWT_TOKEN } = request.cookies;

  try {
    switch (method) {
      case "POST":
        const { comment, threadId, baslik } = request.body;

        const handleComment = async (err, decodeUser) => {
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

          await db.collection("comments").insertOne({
            comment,
            userItem: userPayload,
            threadId,
            createdAt: new Date().toISOString(),
            success: false,
            votes: [],
            baslik,
          });

          return response.json({
            code: 200,
            message: "Yorum Gönderildi",
          });
        };

        JWT.verify(JWT_TOKEN, JWT_KEY, handleComment);

        break;
      default:
        response.json({});
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
