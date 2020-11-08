import { connect } from "@util/mongodb";
import { ObjectID } from "mongodb";

export default async function (request, response) {
  try {
    const { db } = await connect();
    const { vote } = request.body;
    if (request.method === "POST") {
      const getVotes = await db
        .collection("comments")
        .find({ _id: ObjectID("5fa549b13c784a0a8c409879") })
        .sort({ createdAt: -1 })
        .limit(10)
        .toArray();
      let votes = getVotes[0].votes;
      let isVoted = votes.findIndex(
        (item) => item._id === vote._id,
      );

      // upvote ettim
      // eğer daha önce upvote ettiysem değeri sileceğim
      if (isVoted !== -1) {
        votes.splice(isVoted, 1);
      }
      votes = votes.concat(vote);

      const results = await db
        .collection("comments")
        .updateOne(
          { _id: ObjectID("5fa549b13c784a0a8c409879") },
          { $set: { votes } },
        );
      response.json({ results: results });
    }
  } catch (e) {
    response.status(500);
    response.json({
      message: "to_server",
      code: 201,
    });
  }
}
