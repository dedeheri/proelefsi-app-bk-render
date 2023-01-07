import profileModel from "../../model/profile.js";
import authModel from "../../model/auth.js";
import cloudinary from "../../utils/cloudinary.js";

async function changePhotoProfile(req, res) {
  try {
    const authId = req.decode.id;
    const image_url = await cloudinary.v2.uploader.upload(req?.file?.path, {
      folder: "user",
    });
    const auth = await authModel.findOne({ _id: authId });
    if (!auth) {
      return res.status(404).json({ message: req.t("USERS.NOT_FOUND") });
    }
    await cloudinary.uploader.destroy(auth.cloudinary_id);
    await profileModel.findOneAndUpdate(
      { authId: auth._id },
      { image_url: image_url.secure_url },
      { new: true }
    );
    await authModel.findByIdAndUpdate(
      {
        _id: authId,
      },
      { cloudinary_id: image_url.public_id },
      { new: true }
    );

    return res
      .status(200)
      .json({ message: req.t("USERS.SUCCESS_CHANGE_PROFILE") });
  } catch (error) {
    return res.status(500).json({ error: req.t("ERROR.WRONG") });
  }
}

export default changePhotoProfile;
