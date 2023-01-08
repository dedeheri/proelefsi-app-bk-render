import userModel from "../../model/auth.js";
import otp from "../../utils/OTP.generete.js";
import bcrypt from "bcryptjs";
import otpModel from "../../model/otp.js";
import transporter from "../../utils/mail/transporter.js";
import configOTP from "../../utils/mail/config/configOTP.js";

async function signIn(req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const remember_me = req.body.remember_me;

  try {
    const users = await userModel.findOne({ email });
    if (!users) {
      return res
        .status(404)
        .json({ message: { email: req.t("SIGNIN.EMAIL_NOT_EXIST") } });
    }
    // check password
    const checkPassword = await bcrypt.compare(password, users.password);
    if (!checkPassword) {
      return res
        .status(422)
        .json({ message: { password: req.t("SIGNIN.WRONG_PASSWORD") } });
    }

    // hash otp
    const hashOTP = await bcrypt.hash(otp, 10);

    // remeberme
    if (remember_me) {
      const configCookie = {
        maxAge: 30 * 24 * 3600000,
      };
      res.cookie("uid", users._id, configCookie);
      res.cookie("remember_me", true, configCookie);
    } else {
      res.cookie("uid", users._id, "1d");
      res.cookie("remember_me", false);
    }

    return transporter.sendMail(configOTP(users.email, otp), async (err) => {
      if (err) {
        return res.status(404).json({
          error: {
            code: err.code,
            message: req.t("OTP.EMAIL_SEND_FAILED"),
          },
        });
      } else {
        const otps = await otpModel.findOne({ authId: users._id });
        if (otps) {
          await otpModel.findOneAndUpdate(
            { authId: users._id },
            { OTP: hashOTP },
            { new: true }
          );
        } else {
          await otpModel({ authId: users._id, OTP: hashOTP }).save();
        }
        return res.status(200).json({
          message: req.t("OTP.EMAIL_SEND_SUCCESS") + " " + users.email,
        });
      }
    });
  } catch (error) {
    return res.status(500).json({ error: req.t("ERROR.WRONG") });
  }
}

export default signIn;
