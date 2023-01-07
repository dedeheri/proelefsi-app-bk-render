import express from "express";
const router = express.Router();

// contollers
import { addFeedback } from "../controllers/feedback/index.js";
// midleware
import {
  tokenVerify,
  verifyEmail,
  verifyRole,
} from "../middleware/protected.js";
import validation from "../validation/validation.form.js";
import verifyForm from "../middleware/verifyForm.js";

router.post(
  "/feedback/add",
  tokenVerify,
  verifyEmail,
  validation("FEEDBACK"),
  verifyForm,
  addFeedback
);

export default router;
