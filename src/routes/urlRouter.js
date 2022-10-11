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

urlRouter.use(privateToken);

urlRouter.delete("/urls/:id", deleteUrl);
urlRouter.post("/urls/shorten", postShortlyURL);

export default authRouter;
