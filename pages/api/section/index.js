import Cors from "cors";
import { runMiddleware } from "../../../service/util";
import { GetSection } from "../../../service/http/sections";

// Initializing the cors middleware
const cors = Cors({
  methods: ["GET", "HEAD"],
});

async function handler(req, res) {
  // Run the middleware
  await runMiddleware(req, res, cors);
  const params = new URLSearchParams(req.url.split("/section")[1]);
  try {
	//   res.status(200).json({id: params.get("id"), page: params.get("page"), url: req.url})
    const result = await GetSection(params.get("id"), params.get("page"));
    res.status(200).json(result.data);
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err, message: "communication error occured getting section" });
  }
}

export default handler;