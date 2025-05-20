export default async function handler(req, res) {
  const targetUrl = req.query.url;

  if (!targetUrl) {
    return res.status(400).json({ error: "Missing 'url' query parameter" });
  }

  try {
    const response = await fetch(targetUrl, {
      headers: {
        "Authorization": "Bearer 32628aa1-7239-4b8f-97cd-631cba2b8ce9", // 👈 вставь свой токен
        "User-Agent": "Mozilla/5.0",
      },
    });

    if (!response.ok) {
      return res.status(response.status).json({
        error: "Failed to fetch target URL",
        status: response.status,
        statusText: response.statusText,
      });
    }

    const contentType = response.headers.get("content-type") || "application/octet-stream";
    const buffer = await response.arrayBuffer();

    res.setHeader("Content-Type", contentType);
    res.send(Buffer.from(buffer));
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({ error: "Proxy error", details: error.message });
  }
}
