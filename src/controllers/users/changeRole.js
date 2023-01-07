import profileModel from "../../model/profile.js";

async function changeRole(req, res) {
  try {
    const userId = req.params.id;
    const role = req.body.role;
    const user = await profileModel.findById({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: req.t("USERS.NOT_FOUND") });
    } else {
      await profileModel.findByIdAndUpdate(
        { _id: user._id },
        { role },
        { new: true }
      );
      return res.status(200).json({ message: req.t("USERS.SUCCESS_CHANGE") });
    }
  } catch (error) {
    return res.status(404).json({ error: req.t("ERROR.WRONG") });
  }
}

export default changeRole;
