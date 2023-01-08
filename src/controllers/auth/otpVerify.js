import otpModel from "../../model/otp.js";
import profileModel from "../../model/profile.js";
import historyModel from "../../model/history.js";
import bcrypt from "bcryptjs";
import { _accessToken } from "../../utils/token/token.js";
import axios from "axios";
import detectorDevice from "../../utils/davice_detector.js";

async function history(users) {
  const ip = await axios.get("https://api.ipify.org?format=json");
  const location = await axios.get(
    `https://api.ipfind.com/?ip=${ip.data.ip}&auth=614829d3-066a-4dd7-aaec-6a27bb82a58f`
  );
  const deviceDetector = detectorDevice();
  await historyModel({
    userId: users,
    device: {
      os: deviceDetector.os.name,
      client: deviceDetector.client.name,
    },
    location: {
      ip: location.data.ip_address,
      countryCode: location.data.country_code,
      countryName: location.data.country,
      region: location.data.region,
      city: location.data.city,
    },
  }).save();
}

async function otpVerify(req, res) {
  try {
    const otp = req.body.otp;
    const id = req.cookies.uid;
    const remember_me = req.cookies.remember_me;

    const checkOTP = await otpModel.findOne({ authId: id });
    const users = await profileModel.findOne({ authId: id });

    if (checkOTP === null) {
      return res.status(500).json({
        message: {
          OTP: req.t("OTP.EXPIRED"),
        },
      });
    }
    const compareOTP = await bcrypt.compare(otp, checkOTP.OTP);
    if (!compareOTP) {
      return res.status(500).json({
        message: {
          OTP: req.t("OTP.VERIFY_FAILED"),
        },
      });
    } else {
      // remeberme
      if (remember_me) {
        const configCookie = { maxAge: 30 * 24 * 3600000 };
        const t = _accessToken(checkOTP.authId, configCookie);
        res.cookie("_token", t, configCookie);
      } else {
        const t = _accessToken(checkOTP.authId, configCookie);
        res.cookie("_token", t, configCookie);
      }

      history(users._id);

      return res.status(200).json({
        users: users,
        message: {
          OTP: req.t("OTP.VERIFY_SUCCESS"),
        },
      });
    }
  } catch (error) {
    return res.status(500).json({ error: req.t("ERROR.WRONG") });
  }
}

export default otpVerify;
