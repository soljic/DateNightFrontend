import Cors from "cors";
import { GetTags } from "../../../service/http/spiritus";
import { runMiddleware } from "../../../service/util";

// Initializing the cors middleware
const cors = Cors({
  methods: ["GET", "HEAD"],
});

async function handler(req, res) {
  // Run the middleware
  await runMiddleware(req, res, cors);
  try {
    const result = await GetTags();
    res.status(201).json(result.data);
  } catch (err) {
    res.status(500).json({ message: "communication error occured" });
  }
}

export default handler;
