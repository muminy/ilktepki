export default function (req, res) {
  let cookies = req.headers.cookie;
  cookies = JSON.parse(cookies.split("_id=")[1].toString());
  res.json({ cookies: cookies });
}
