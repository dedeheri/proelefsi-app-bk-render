import mongoose from "mongoose";
import shortid from "shortid";
import moment from "moment";

const profile = mongoose.Schema({
  _id: {
    type: String,
    default: shortid.generate,
    trim: true,
    required: true,
  },
  authId: {
    type: String,
    trim: true,
    required: true,
  },
  cover_url: {
    type: String,
    trim: true,
    default: null,
  },
  image_url: {
    type: String,
    trim: true,
    required: true,
  },
  fullname: {
    type: String,
    trim: true,
    required: true,
  },
  offical: {
    type: Boolean,
    default: false,
  },
  username: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },
  role: {
    type: String,
    trim: true,
    default: "Writter",
  },
  bio: {
    type: String,
    default: null,
  },
  timestamps: {
    type: String,
    default: () => moment().format("dddd, MMMM Do YYYY, h:mm:ss a"),
  },
  last_active: { type: String, default: null },
});

const profileModel = mongoose.model("profile", profile);
export default profileModel;
