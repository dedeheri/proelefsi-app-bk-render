import profileModel from "../../model/profile.js";

async function user(req, res) {
  try {
    const username = req.params.username;
    const user = await profileModel.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: req.t("USERS.NOT_FOUND") });
    } else {
      return res
        .status(200)
        .json({ message: req.t("MESSAGE.SUCCESS"), user: user });
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: req.t("ERROR.WRONG") });
  }
}

export default user;
