import { getChurchesAnalytics, getChurches, createChurch, getGroups } from "../controllers/churches.js";
import { Router } from "express";
let churchesRouter = Router();
churchesRouter.get("/churches/analytics", getChurchesAnalytics);
churchesRouter.get("/churches", getChurches);
churchesRouter.get("/groups", getGroups);
churchesRouter.post("/churches", createChurch);


export default churchesRouter;

//r8j790wi
