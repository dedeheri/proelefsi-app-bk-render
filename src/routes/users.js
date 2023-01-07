import e from "express";
import {
  tokenVerify,
  verifyEmail,
  verifyRole,
} from "../middleware/protected.js";
import validation from "../validation/validation.form.js";
import verifyForm from "../middleware/verifyForm.js";
const route = e.Router();
import image from "../utils/multer/index.js";
import {
  get,
  published,
  draft,
  manageTopics,
  changePassword,
  changeName,
  changePhotoProfile,
  changeBiodata,
  historySign,
  changeRole,
  getAll,
  changeCover,
  getById,
} from "../controllers/users/index.js";
import { config } from "../controllers/config/index.js";

// config
route.get("/user/config", tokenVerify, verifyEmail, config);

route.get("/user", tokenVerify, verifyEmail, get);
route.get("/user/all", tokenVerify, verifyEmail, getAll);
route.get("/user/:id", tokenVerify, verifyEmail, getById);
route.get("/user/article/published/:id", tokenVerify, verifyEmail, published);
route.get("/user/article/draft/:id", tokenVerify, verifyEmail, draft);
route.get("/user/manage-topics/:id", tokenVerify, verifyEmail, manageTopics);
route.get("/user/auth/history-login", tokenVerify, verifyEmail, historySign);

// change password
route.put(
  "/user/change-password",
  tokenVerify,
  verifyEmail,
  validation("CHANGE_PASSWORD"),
  verifyForm,
  changePassword
);

// change name
route.put(
  "/user/change-name",
  tokenVerify,
  verifyEmail,
  validation("CHANGE_NAME"),
  verifyForm,
  changeName
);

// change name
route.put(
  "/user/change-biodata",
  tokenVerify,
  verifyEmail,
  validation("CHANGE_BIODATA"),
  verifyForm,
  changeBiodata
);

// change photo profile
route.put(
  "/user/change-photo",
  tokenVerify,
  verifyEmail,
  image.single("image_url"),
  validation("CHANGE_PHOTO_PROFILE"),
  verifyForm,
  changePhotoProfile
);

// change role
route.put(
  "/user/role/:id",
  tokenVerify,
  verifyRole("Admin"),
  verifyEmail,
  changeRole
);
// change cover
route.put(
  "/user/change-cover",
  tokenVerify,
  verifyEmail,
  image.single("cover_url"),
  validation("CHANGE_COVER"),
  verifyForm,
  changeCover
);

export default route;
