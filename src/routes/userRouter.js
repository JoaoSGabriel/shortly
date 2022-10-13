import { Router } from "express";
import { getRanking, getUserUrls } from "../controllers/userController.js";
import privateToken from "../middlewares/authorizationMiddleware.js";

const userRouter = Router();

userRouter.get("/ranking", getRanking);

userRouter.use(privateToken);

userRouter.get("/users/me", getUserUrls);

export default userRouter;
