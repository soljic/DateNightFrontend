import Cors from "cors";
import { CreateStoryFromObj } from "../../../service/http/story";
import { runMiddleware } from "../../../service/util";

// Initializing the cors middleware
const cors = Cors({
  methods: ["POST", "HEAD"],
});

async function handler(req, res) {
  // Run the middleware
  await runMiddleware(req, res, cors);
  const data = req.body;
  // create new object without spiritusId
  const reqObj = Object.keys(data)
    .filter((key) => key !== "spiritusId")
    .reduce((obj, key) => {
      obj[key] = data[key];
      return obj;
    }, {});
  const authorization = req.headers?.authorization;
  try {
    if (!authorization) {
      throw "Unauthorized";
    }

    if (!data.title) {
      throw "Story title is required";
    }

    if (!data.spiritusId) {
      throw "SpiritusId is missing";
    }

    const result = await CreateStoryFromObj(
      authorization.split("Bearer ")[1],
      data.spiritusId,
      req.body
    );
    res.status(201).json(result.data);
  } catch (err) {
    if (
      err === "Unauthorized" ||
      err === "Story title is required" ||
      err === "SpiritusId is missing"
    ) {
      res.status(400).json({ message: err });
    }

    res.status(500).json({ message: "communication error occured" });
  }
}

export default handler;
