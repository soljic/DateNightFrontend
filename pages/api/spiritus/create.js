import Cors from "cors";
import { CreateSpiritusFromForm, CreateSpiritusFromObj } from "../../../service/http/spiritus";
import { runMiddleware } from "../../../service/util";

// Initializing the cors middleware
const cors = Cors({
  methods: ["POST", "HEAD"],
});

// pass the request to BE servers
async function handler(req, res) {
  // Run the middleware
  await runMiddleware(req, res, cors);
  const authorization = req.headers?.authorization;
  try {
    if (!authorization) {
      throw "Unauthorized";
    }

    const result = await CreateSpiritusFromForm(
      authorization.split("Bearer ")[1],
      req.body
    );
    res.status(201).json(result.data);
  } catch (err) {
    if (err === "Unauthorized" || err === "Name and Surname are required") {
      res.status(400).json({ message: err });
      return
    }
    console.log(err)
    res.status(500).json({ message: "communication error occured" });
  }
}

export default handler;
