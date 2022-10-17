import { Router } from "express";
import {
  deleteUrl,
  getUniqueShorten,
  getUniqueUrl,
  postShortlyURL,
} from "../controllers/urlController.js";
import privateToken from "../middlewares/authorizationMiddleware.js";

const urlRouter = Router();

urlRouter.get("/urls/:id", getUniqueUrl);

urlRouter.get("/urls/open/:shortUrl", getUniqueShorten);

urlRouter.delete("/urls/:id", privateToken, deleteUrl);

urlRouter.post("/urls/shorten", privateToken, postShortlyURL);

export default urlRouter;
