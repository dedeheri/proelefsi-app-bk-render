import userModel from "../../model/auth.js";
import otpModel from "../../model/otp.js";
import bcrypt from "bcryptjs";
import otp from "../../utils/OTP.generete.js";
import transporter from "../../utils/mail/transporter.js";
import configOTP from "../../utils/mail/config/configOTP.js";
async function reSendOtp(req, res) {
  try {
    const id = req.decode.id;
    if (id) {
      const users = await userModel.findById({ _id: id });
      const otps = await otpModel.findOne({ authId: users._id });
      const hashOTP = await bcrypt.hash(otp, 10);
      transporter.sendMail(configOTP(users.email, otp), async (err) => {
        if (err) {
          return res
            .status(404)
            .json({ message: req.t("OTP.EMAIL_SEND_FAILED") });
        } else {
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
    } else {
      return res.status(500).json({ message: req.t("OTP.EMAIL_SEND_FAILED") });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: req.t("ERROR.WRONG") });
  }
}

export default reSendOtp;
