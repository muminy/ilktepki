import { connect } from "util/mongodb";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";

export default async function (request, response) {
  const { db } = await connect();
  const { method } = request;
  const { JWT_KEY } = process.env;

  try {
    switch (method) {
      case "POST":
        const { username, password } = request.body;

        if (!username || !password) {
          return response.json({
            status: "error",
            error: "Request missing username or password",
          });
        }

        const result = await db.collection("users").findOne({ username, password });

        const userId = result._id;
        const userName = result.username;
        const name = result.name;

        const payload = {
          userId,
          userName,
          name,
        };

        const JWT_OPTIONS = {
          expiresIn: 31556926,
          algorithm: "HS256",
        };

        const JWT_CALLBACK = (err, token) => {
          if (err) throw err;
          response.json({
            code: 200,
            token,
            userId: payload.userId,
          });
        };

        jwt.sign(payload, JWT_KEY, JWT_OPTIONS, JWT_CALLBACK);
        break;
      default:
        response.json({ code: 10, error: "Bad Request" });
    }
  } catch (e) {
    response.status(500);
    response.json({
      message: "to_server",
      status: "Erorr",
    });
  }
}
