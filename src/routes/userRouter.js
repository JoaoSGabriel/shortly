import { Router } from "express";
import { getRanking, getUserUrls } from "../controllers/userController.js";
import privateToken from "../middlewares/authorizationMiddleware.js";

const userRouter = Router();

userRouter.get("/ranking", getRanking);

userRouter.get("/users/me", privateToken, getUserUrls);

export default userRouter;
