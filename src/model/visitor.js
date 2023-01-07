import moment from "moment";
import mongoose from "mongoose";
import shortid from "shortid";

const visitor = mongoose.Schema({
  _id: { type: String, default: shortid.generate },
  _gid: { type: String, default: null },
  in_topics: { type: Array, default: null },
  article_id: { type: Array, default: null },
  search_term: { type: Array, default: null },
  not_interseted: { type: Array, default: null },
  timestamps: {
    type: String,
    default: () => moment().format("dddd, MMMM Do YYYY, h:mm:ss a"),
  },
});

const visitors = mongoose.model("visitor", visitor);
export default visitors;
