import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/authRouter.js";
dotenv.config();
import { nanoid } from "nanoid";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/status", (req, res) => {
  res.send("ok, i'm alive");
});

app.use(authRouter);

app.listen(process.env.PORT, () => {
  console.log(`Listen on port ${process.env.PORT}`);
});
