import moment from "moment";
import mongoose from "mongoose";
import shortId from "shortid";

const report = mongoose.Schema({
  _id: { type: String, default: shortId.generate },
  visitorId: { type: String, default: null },
  articleId: { type: String, default: null },
  problem: { type: String, default: null },
  comments: { type: String, default: null },
  timestamps: {
    type: String,
    default: () => moment().format("dddd, MMMM Do YYYY, h:mm:ss a"),
  },
});

const reportModel = mongoose.model("report", report);
export default reportModel;
