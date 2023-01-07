import profileModel from "../../model/profile.js";
import authModel from "../../model/auth.js";
import cloudinary from "../../utils/cloudinary.js";

async function deleteAccount(req, res) {
  const id = req.params.id;

  try {
    const user = await profileModel.findById({ _id: id });
    if (!user) {
      return res.status(404).json({ message: req.t("USER.NOUSERS") });
    } else {
      const auth = await authModel.findById({ _id: user.authId });
      await profileModel.findByIdAndDelete({ _id: user._id });
      await authModel.findByIdAndDelete({ _id: auth._id });
      await cloudinary.uploader.destroy(auth.cloudinary_id);

      return res
        .status(200)
        .json({ message: req.t("USERS.SUCCESS_DELETE_ACCOUNT") });
    }
  } catch (error) {
    return res.status(500).json({ error: req.t("ERROR.WRONG") });
  }
}

export default deleteAccount;
