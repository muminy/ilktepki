export default async function (request, response) {
  const { JWT_TOKEN, USER_ID } = request.cookies;
  const JWTnEW = JWT_TOKEN + "";
  response.json({ JWTnEW, USER_ID });
}
