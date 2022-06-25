import Cors from "cors";
import { runMiddleware } from "../../../service/util";
import { SearchSpiritusFullText } from "../../../service/http/spiritus";

// Initializing the cors middleware
const cors = Cors({
  methods: ["GET", "HEAD"],
});

async function handler(req, res) {
  // Run the middleware
  await runMiddleware(req, res, cors);
  const params = new URLSearchParams(req.url.split("/search")[1]);
  try {
    const result = await SearchSpiritusFullText(params.get("q"), 0, 5);
    res.status(200).json(result.data);
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err, message: "communication error occured" });
  }
}

export default handler;
