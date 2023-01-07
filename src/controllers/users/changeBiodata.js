import profileModel from "../../model/profile.js";

async function changeBiodata(req, res) {
  try {
    const biodata = req.body.biodata;
    const authId = req.decode.id;
    const user = await profileModel.findOne({ authId });
    if (!user) {
      return res.status(404).json({ message: req.t("USERS.NOT_FOUND") });
    }

    await profileModel.findByIdAndUpdate(
      { _id: user._id },
      { bio: biodata },
      { new: true }
    );

    return res
      .status(200)
      .json({ message: req.t("USERS.SUCCESS_CHANGE_BIODATA") });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: req.t("ERROR.WRONG") });
  }
}

export default changeBiodata;
