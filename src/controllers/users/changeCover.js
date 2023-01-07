import profileModel from "../../model/profile.js";
import cloudinary from "../../utils/cloudinary.js";

async function changeCover(req, res) {
  try {
    const authId = req.decode.id;
    const user = await profileModel.findOne({ authId });
    if (!user) {
      return res.status(404).json({ message: req.t("USERS.NOT_FOUND") });
    } else {
      const cover_url = await cloudinary.v2.uploader.upload(req?.file?.path, {
        folder: "cover",
      });
      await profileModel.findByIdAndUpdate(
        { _id: user._id },
        { cover_url: cover_url.secure_url },
        { new: true }
      );

      return res
        .status(200)
        .json({ message: req.t("USERS.SUCCESS_CHANGE_BIODATA") });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: req.t("ERROR.WRONG") });
  }
}

export default changeCover;
