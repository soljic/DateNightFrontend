export default function healthcheck(req, res) {
  res.status(200).json({ status: "UP", ts: Date.now() });
}
