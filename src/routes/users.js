import { createUser, loginUser, getUsers } from "../controllers/users.js";
import { Router } from "express";
let userRouter = Router();
userRouter.post("/users", createUser);
userRouter.get("/users", getUsers);
userRouter.post("/user/login", loginUser);

export default userRouter;


//r8j790wi