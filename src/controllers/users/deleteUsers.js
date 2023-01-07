import userModel from "../../model/auth.js";
import profileModel from "../../model/profile.js";
import cloudinary from "../../utils/cloudinary.js";

async function deleteUsers(req, res) {
  try {
    const id = req.params.id;
    const users = await profileModel.findById({ _id: id });
    if (!users) {
      return res.status(404).json({ message: req.t("USERS.NOT_FOUND") });
    } else {
      const auth = await userModel.findOne({ _id: users.authId });
      await cloudinary.uploader.destroy(auth.cloudinary_id);
      await userModel.findByIdAndDelete({ _id: auth._id });
      await profileModel.findByIdAndDelete({ _id: users._id });

      return res.status(200).json({ message: "Berhasil hapus pengguna" });
    }
  } catch (error) {
    return res.status(404).json({ error: req.t("ERROR.WRONG") });
  }
}

export default deleteUsers;
