import { connect } from "util/mongodb";

export default async function (request, response) {
  const { method } = request;
  const { db } = await connect();

  try {
    switch (method) {
      case "POST":
        const { USER_ID } = request.body;
        const queryPosts = { "author.userId": USER_ID };
        const queryComments = { "userItem.userId": USER_ID };
        let allActions = [];
        const allPosts = await db
          .collection("posts")
          .find(queryPosts)
          .toArray();

        const allComments = await db
          .collection("comments")
          .find(queryComments)
          .toArray();

        allPosts.map((item, index) => {
          allPosts[index].type = "post";
        });

        allComments.map((item, index) => {
          allComments[index].type = "comment";
        });

        allActions = [...allPosts, ...allComments];
        response.json({
          results: allActions,
        });
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
