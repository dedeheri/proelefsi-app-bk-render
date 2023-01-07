import moment from "moment";
import mongoose from "mongoose";
import shortid from "shortid";

const otp = mongoose.Schema({
  _id: { type: String, default: shortid.generate },
  authId: { type: String, default: null },
  OTP: { type: String, default: null },
  createdAt: { type: Date, default: Date.now, index: { expires: 300000 } },
  timestamps: {
    type: String,
    default: () => moment().format("dddd, MMMM Do YYYY, h:mm:ss a"),
  },
});

const otpModel = mongoose.model("otp", otp);
export default otpModel;
