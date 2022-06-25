import Cors from "cors";
import { CreateSpiritusFromObj } from "../../../service/http/spiritus";
import { runMiddleware } from "../../../service/util";

// Initializing the cors middleware
const cors = Cors({
  methods: ["POST", "HEAD"],
});

async function handler(req, res) {
  // Run the middleware
  await runMiddleware(req, res, cors);
  const data = req.body;
  const authorization = req.headers?.authorization;
  try {
    if (!authorization) {
      throw "Unauthorized";
    }

    if (!data.name || !data.surname) {
      throw "Name and Surname are required";
    }

    const result = await CreateSpiritusFromObj(
      authorization.split("Bearer ")[1],
      req.body
    );
    res.status(201).json(result.data);
  } catch (err) {
    if (err === "Unauthorized" || err === "Name and Surname are required") {
      res.status(400).json({ message: err });
    }

    res.status(500).json({ message: "communication error occured" });
  }
}

export default handler;
