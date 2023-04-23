import express from "express";
import Cors from "cors";

import userRouter from "./src/routes/users.js";
import churchesRouter from "./src/routes/churches.js";


const app = express();
const port = process.env.PORT || 8008;
app.use(express.json());
app.use(Cors({ origin: "*" }));

app.get("/", (req, res) =>
  res.status(200).send("Hello CleverProgrammers!!!!!. CELZ4 API!!!🔥🔥")
);
app.use("/api/v1", userRouter);
app.use("/api/v1", churchesRouter);


app.listen(port, () => console.log(`Listening on localhost: ${port}`));