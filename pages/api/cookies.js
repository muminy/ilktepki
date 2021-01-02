export default async function (request, response) {
  const { JWT_TOKEN, USER_ID } = request.cookies;
  response.json({ JWT_TOKEN, USER_ID });
}
