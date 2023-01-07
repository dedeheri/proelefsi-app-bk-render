import e from "express";
import {
  tokenVerify,
  verifyEmail,
  verifyRole,
} from "../middleware/protected.js";
import validation from "../validation/validation.form.js";
import verifyForm from "../middleware/verifyForm.js";

const route = e.Router();
import { add, get } from "../controllers/role/index.js";

route.get("/role", tokenVerify, verifyEmail, verifyRole("Admin"), get);
route.post(
  "/role/add",
  tokenVerify,
  verifyEmail,
  verifyRole("Admin"),
  validation("CREATE_ROLE"),
  verifyForm,
  add
);

export default route;
