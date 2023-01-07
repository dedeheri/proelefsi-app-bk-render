import profileModel from "../../model/profile.js";

async function changeName(req, res) {
  const fullname = req.body.fullName;
  const authId = req.decode.id;

  try {
    const auth = await profileModel.findOne({ authId });

    if (!auth) {
      return res.status(404).json({ message: req.t("USERS.NOT_FOUND") });
    }

    await profileModel.findByIdAndUpdate(
      { _id: auth._id },
      { fullname },
      { new: true }
    );

    return res.status(200).json({ message: req.t("USERS.CHANGE_NAME") });
  } catch (error) {
    return res.status(500).json({ error: req.t("ERROR.WRONG") });
  }
}

export default changeName;
