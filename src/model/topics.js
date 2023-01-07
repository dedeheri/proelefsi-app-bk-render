import moment from "moment";
import mongoose from "mongoose";
import shortId from "shortid";

const topics = mongoose.Schema({
  _id: { type: String, default: shortId.generate },
  topics: { type: String, trim: true },
  stories: { type: Number, default: 0 },
  description: { type: String, trim: true },
  authour: { type: String, trim: true },
  editor: { type: String, trim: true, default: null },
  timestamps: {
    type: String,
    default: () => moment().format("ll"),
  },
});

const topicsModel = mongoose.model("topics", topics);
export default topicsModel;
