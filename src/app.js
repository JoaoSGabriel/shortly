import express from "express";
import cors from "cors";
import authRouter from "./routes/authRouter.js";
import urlRouter from "./routes/urlRouter.js";
import userRouter from "./routes/userRouter.js";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/status", (req, res) => {
  res.send("ok, i'm alive");
});

app.use(authRouter);
app.use(urlRouter);
app.use(userRouter);

app.listen(process.env.PORT, () => {
  console.log(`Listen on port ${process.env.PORT}`);
});
