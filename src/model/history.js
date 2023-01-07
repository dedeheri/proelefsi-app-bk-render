import moment from "moment";
import mongoose from "mongoose";
import shortId from "shortid";

const authHistory = mongoose.Schema({
  _id: { type: String, default: shortId.generate },
  userId: { type: String },
  device: {
    os: { type: String, default: null },
    client: { type: String, default: null },
  },
  location: {
    ip: { type: String, default: null },
    countryCode: { type: String, default: null },
    countryName: { type: String, default: null },
    city: { type: String, default: null },
    region: { type: String, default: null },
  },
  timestamps: {
    type: String,
    default: () => moment().format("dddd, MMMM Do YYYY, h:mm:ss a"),
  },
});

const history = mongoose.model("login_history", authHistory);
export default history;
