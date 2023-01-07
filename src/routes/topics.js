import e from "express";

// middleware
import {
  tokenVerify,
  verifyEmail,
  verifyRole,
} from "../middleware/protected.js";
import validation from "../validation/validation.form.js";
import verifyForm from "../middleware/verifyForm.js";

// contollers
import {
  add,
  get,
  detail,
  update,
  deleted,
} from "../controllers/topics/index.js";

const route = e.Router();

// create
route.post(
  "/topics/add",
  tokenVerify,
  verifyEmail,
  verifyRole("Admin"),
  validation("CREATE_TOPICS"),
  verifyForm,
  add
);

// get all topics
route.get("/topics", tokenVerify, verifyEmail, get);
route.get("/topics/:id", tokenVerify, verifyEmail, verifyRole("Admin"), detail);
route.delete("/topics/:id", tokenVerify, verifyEmail, deleted);
route.put(
  "/topics/:id",
  tokenVerify,
  verifyEmail,
  verifyRole("Admin"),
  validation("CREATE_TOPICS"),
  verifyForm,
  update
);

export default route;
