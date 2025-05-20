export default async function handler(req, res) {
  const targetUrl = req.query.url;
  if (!targetUrl) return res.status(400).send("Missing url param");

  const response = await fetch(targetUrl);
  const buffer = await response.arrayBuffer();

  res.setHeader("Content-Type", response.headers.get("content-type"));
  res.send(Buffer.from(buffer));
}
