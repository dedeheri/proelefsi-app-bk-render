import profileModel from "../../model/profile.js";
import authModel from "../../model/auth.js";

async function verifyEmailAccount(req, res) {
  const id = req.params.id;
  const verify = req.body.verify;

  try {
    const user = await profileModel.findById({ _id: id });
    if (!user) {
      return res.status(404).json({ message: req.t("USER.NOUSERS") });
    } else {
      await authModel.findByIdAndUpdate(
        { _id: user.authId },
        { email_verify: verify },
        { new: true }
      );
      return res.status(200).json({ message: req.t("USERS.SUCCESS_VERIFY") });
    }
  } catch (error) {
    return res.status(500).json({ error: req.t("ERROR.WRONG") });
  }
}

export default verifyEmailAccount;
