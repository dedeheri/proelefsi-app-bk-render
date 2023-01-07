import mongoose from "mongoose";
import shortId from "shortid";
import moment from "moment";

const config = mongoose.Schema({
  _id: { type: String, default: shortId.generate },
  userId: { type: String, default: null },
  theme: { type: String, default: "light" },
  language: { type: String, default: "bahasa indonesia" },
  perPage: {
    type: Object,
    article: {
      type: Number,
      default: 5,
    },
    role: {
      type: Number,
      default: 5,
    },
    topics: {
      type: Number,
      default: 5,
    },
  },
  timestamps: { type: String, default: () => moment().format("ll") },
});

const configModel = mongoose.model("config", config);
export default configModel;
