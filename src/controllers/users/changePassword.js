import authModel from "../../model/auth.js";
import bcrypt from "bcryptjs";
import transporter from "../../utils/mail/transporter.js";
import configPassword from "../../utils/mail/config/configPassword.js";

async function changePassword(req, res) {
  const { currentPassword, newPassword } = req.body;
  const authId = req.decode.id;

  try {
    const auth = await authModel.findById({ _id: authId });
    if (!auth) {
      return res.status(404).json({ message: req.t("USERS.NOT_FOUND") });
    }

    const comparePassword = await bcrypt.compare(
      currentPassword,
      auth.password
    );

    // password can not same with database store
    if (!comparePassword) {
      return res.status(422).json({
        message: { current_password: req.t("SIGNIN.WRONG_PASSWORD") },
      });
    }

    transporter.sendMail(configPassword(auth.email), async (error) => {
      if (error) {
        return res.status(500).json({ error: req.t("ERROR.WRONG") });
      }
      const newPasswordHash = await bcrypt.hash(newPassword, 10);
      await authModel.findByIdAndUpdate(
        { _id: auth._id },
        { password: newPasswordHash },
        { new: true }
      );
      return res.status(200).json({ message: req.t("USERS.CHANGE_PASSWORD") });
    });
  } catch (error) {
    return res.status(500).json({ error: req.t("ERROR.WRONG") });
  }
}

export default changePassword;
