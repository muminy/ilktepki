import { ObjectId } from "mongodb";
import { connect } from "util/mongodb";

export default async function (request, response) {
  const { method } = request;
  const { db } = await connect();

  try {
    switch (method) {
      case "POST":
        const { _id } = request.body;

        const results = await db.collection("posts").findOne({ _id: ObjectId(_id) });

        response.json({ code: 200, results });

        break;
      default:
        response.json({
          status: "Erorr",
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
