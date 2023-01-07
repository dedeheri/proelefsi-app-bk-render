import e from "express";
import validation from "../validation/validation.form.js";
import image from "../utils/multer/index.js";
import {
  tokenVerify,
  verifyEmail,
  verifyRole,
} from "../middleware/protected.js";
import verifyForm from "../middleware/verifyForm.js";
import {
  otpVerify,
  signIn,
  signUp,
  reSendOtp,
  verifyToken,
  changePassword,
  sendMailPassword,
  deleteAccount,
  verifyEmailAccount,
} from "../controllers/auth/index.js";

const route = e.Router();

route.post(
  "/auth/signup",
  image.single("image_url"),
  validation("REGISTRATION"),
  verifyForm,
  signUp
);
route.post("/auth/signin", validation("LOGIN"), verifyForm, signIn);
route.get("/auth/otp/resend", tokenVerify, reSendOtp);
route.post("/auth/otp", validation("OTP"), verifyForm, otpVerify);

route.post(
  "/auth/password/forget",
  validation("EMAIL"),
  verifyForm,
  sendMailPassword
);
route.post(
  "/auth/password/change",
  validation("REPEAT_PASSWORD"),
  verifyForm,
  changePassword
);
route.get("/auth/password/verify", verifyToken);
// delete account
route.delete(
  "/auth/account/:id",
  tokenVerify,
  verifyRole("Admin"),
  deleteAccount
);
// verify account
route.put(
  "/auth/account/verify-email/:id",
  tokenVerify,
  verifyRole("Admin"),
  verifyEmailAccount
);

export default route;
