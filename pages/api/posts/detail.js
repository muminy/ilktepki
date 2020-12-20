import { connect } from "util/mongodb";

export default async function (request, response) {
  const { method } = request;
  const { db } = await connect();

  try {
    switch (method) {
      case "POST":
        const { _id } = request.body;

        const resuts = await db
          .collection("posts")
          .findOne({ _id });

        if (resuts) {
          response.json({ code: 200, resuts });
        } else {
          response.json({ code: 10, resuts: {} });
        }

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
