import userModel from "../../model/auth.js";
import reset from "../../utils/mail/config/reset.js";
import transporter from "../../utils/mail/transporter.js";
import { _refreshToken } from "../../utils/token/token.js";

async function sendMailPassword(req, res) {
  const email = req.body.email;

  const users = await userModel.findOne({ email });
  if (!users) {
    return res.status(404).json({ message: req.t("SIGNIN.EMAIL_NOT_EXIST") });
  }

  try {
    const jwt = _refreshToken(users._id, "5m");
    const link = `${process.env.CLIENT_URL}/account/reset-password?token=${jwt}`;
    transporter.sendMail(reset(users.email, link), async (err) => {
      if (err) {
        return res
          .status(404)
          .json({ message: req.t("FORGET.EMAIL_SEND_FAILED") });
      } else {
        return res.status(200).json({
          message: req.t("FORGET.EMAIL_SEND_SUCCESS") + " " + users.email,
        });
      }
    });
  } catch (error) {
    return res.status(500).json({ error: req.t("ERROR.WRONG") });
  }
}

export default sendMailPassword;
