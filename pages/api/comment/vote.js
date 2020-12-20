import { connect } from "util/mongodb";
import { ObjectID } from "mongodb";
import JWT from "jsonwebtoken";
import Cookie from "js-cookie";

export default async function (request, response) {
  const { method } = request;

  try {
    const { db } = await connect();
    const { JWT_KEY } = process.env;
    switch (method) {
      case "POST":
        const { id, JWT_TOKEN } = request.body;

        const handleVoteCommment = async (err, decodeUser) => {
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

          const getVotes = await db
            .collection("comments")
            .find({ _id: ObjectID(id) })
            .sort({ createdAt: -1 })
            .limit(10)
            .toArray();

          let votes = getVotes[0].votes;
          let isVoted = votes.findIndex(
            (item) => item.userId === decodeUser.userId,
          );

          if (isVoted !== -1) {
            votes.splice(isVoted, 1);
          } else {
            votes = votes.concat(userPayload);
          }

          const results = await db
            .collection("comments")
            .updateOne(
              { _id: ObjectID(id) },
              { $set: { votes } },
            );

          response.json({
            results: results,
            upvote: isVoted === -1 ? false : true,
            votes,
          });
        };

        JWT.verify(JWT_TOKEN, JWT_KEY, handleVoteCommment);
        break;

      default:
        break;
    }

    // upvote ettim
    // eğer daha önce upvote ettiysem değeri sileceğim
  } catch (e) {
    response.status(500);
    response.json({
      message: "to_server",
      code: 201,
    });
  }
}
