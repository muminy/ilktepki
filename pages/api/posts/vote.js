import { connect } from "util/mongodb";
import { ObjectID } from "mongodb";
import JWT from "jsonwebtoken";
import Cookie from "js-cookie";

export default async function (request, response) {
  const { method } = request;
  const { JWT_TOKEN } = request.cookies;
  const { JWT_KEY } = process.env;

  try {
    const { db } = await connect();
    switch (method) {
      case "POST":
        const { user_id, voteType, _id } = request.body;

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
            vote: voteType,
          };

          const getVotes = await db
            .collection("posts")
            .find({ _id: ObjectID(_id) })
            .sort({ createdAt: -1 })
            .toArray();

          let votes = getVotes[0].votes;
          let isVoted = votes.findIndex((item) => item.userId === user_id);

          if (isVoted !== -1) {
            votes.splice(isVoted, 1);
            votes = votes.concat(userPayload);
          } else {
            votes = votes.concat(userPayload);
          }
          const results = await db
            .collection("posts")
            .updateOne({ _id: ObjectID(_id) }, { $set: { votes } });

          response.json({
            results: results,
            votes,
          });
        };

        JWT.verify(JWT_TOKEN, JWT_KEY, handleVoteCommment);
        break;

      default:
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
