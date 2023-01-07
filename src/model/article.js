import moment from "moment";
import mongoose, { Schema } from "mongoose";

const article = mongoose.Schema({
  _id: { type: String },
  cloudinary_id: { type: String },
  authour: {
    type: Object,
    id: { type: String, default: null },
    fullName: { type: String, default: null },
    image_url: { type: String, default: null },
    username: { type: String, default: null },
  },
  image_url: { type: String, default: null, trim: true },
  title: { type: String, default: null, trim: true, required: true },
  sub_title: { type: String, default: null },
  content: { type: Array, default: [], trim: true, required: true },
  topics: { type: String, default: null, trim: true, required: true },

  tags: { type: Array, default: null, trim: true },
  view: { type: Number, default: 0, trim: true },
  draft: { type: Boolean, default: false },

  reading_time: { type: Number, default: 0 },
  url: {
    type: Object,
    originalLink: { type: String, default: null, trim: true, required: true },
    shortLink: { type: String, default: null },
  },
  editor: { type: String, default: null },
  timestamps: { type: String, default: () => moment().format("ll") },
});

const articleModel = mongoose.model("article", article);
export default articleModel;
