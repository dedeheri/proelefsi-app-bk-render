import e from "express";
import validation from "../validation/validation.form.js";
import image from "../utils/multer/index.js";
import verifyForm from "../middleware/verifyForm.js";
import { tokenVerify, verifyEmail } from "../middleware/protected.js";

// controller
import {
  add,
  get,
  deletes,
  detail,
  update,
  changeDraftOrPublish,
  imageTempContent,
  analysis,
  linkFetchingEditor,
} from "../controllers/article/index.js";

const route = e.Router();

// create article
route.post(
  "/article/add",
  tokenVerify,
  verifyEmail,
  image.single("image_url"),
  validation("CREATE_ARTICLE"),
  verifyForm,
  add
);

// image content for main article
route.post(
  "/article/image_temp",
  tokenVerify,
  verifyEmail,
  image.single("image_url"),
  imageTempContent
);
route.post(
  "/article/editor/link",
  tokenVerify,
  verifyEmail,
  linkFetchingEditor
);

// update article
route.put(
  "/article/:id",
  tokenVerify,
  verifyEmail,
  image.single("image_url"),
  validation("UPDATE_ARTICLE"),
  verifyForm,
  update
);

// delete article
route.delete("/article/:id", tokenVerify, verifyEmail, deletes);
// detail article
route.get("/article/:id", tokenVerify, verifyEmail, detail);
// change article to draft or publish
route.put(
  "/article/change/:id",
  tokenVerify,
  verifyEmail,
  changeDraftOrPublish
);
// get all article
route.get("/article", tokenVerify, verifyEmail, get);
// get all article
route.get("/article/:id/analysis", tokenVerify, verifyEmail, analysis);

export default route;
