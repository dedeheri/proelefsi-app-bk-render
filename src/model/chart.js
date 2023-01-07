import moment from "moment";
import mongoose from "mongoose";
import shortid from "shortid";

const chart = mongoose.Schema({
  _id: { type: String, default: shortid.generate },
  articleId: { type: String, default: null },
  view: { type: Number, default: 0 },
  report: { type: Number, default: 0 },
  timestamps: {
    type: String,
    default: () => moment().format("DD MMMM YYYY"),
  },
});

const chartModel = mongoose.model("chart", chart);
export default chartModel;
