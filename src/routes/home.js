import e from "express";

// contollers
import { dailyActivity, newArticle } from "../controllers/home/index.js";
// middleware
import { tokenVerify, verifyEmail } from "../middleware/protected.js";

const route = e.Router();
route.get("/home/daily", tokenVerify, verifyEmail, dailyActivity);
route.get("/home/new", tokenVerify, verifyEmail, newArticle);

export default route;
