import authModel from "../../model/auth.js";
import cloudinary from "../../utils/cloudinary.js";
import upperCase from "../../utils/uppercase.js";
import bcrypt from "bcryptjs";
import profileModel from "../../model/profile.js";
import createConfig from "../config/createConfig.js";

async function signUp(req, res) {
  try {
    const fullname = req.body.fullname;
    const password = req.body.password;
    const email = req.body.email;

    // check email exist
    const exist = await authModel.findOne({ email });
    if (exist) {
      return res
        .status(422)
        .json({ message: { email: req.t("SIGNUP.EMAIL_EXIST") } });
    }

    const image_url = await cloudinary.v2.uploader.upload(req?.file?.path, {
      folder: "user",
    });

    // password hash
    const hash = await bcrypt.hash(password, 10);

    // save to database auth data
    const authData = {
      email: email,
      password: hash,
      cloudinary_id: image_url.public_id,
    };
    const authId = await authModel(authData).save();
    // save to database profile data
    const profileData = {
      authId: authId._id,
      fullname: upperCase(fullname),
      email: email,
      username: fullname.split(" ").join("").toLowerCase(),
      image_url: image_url.secure_url,
    };
    const user = await profileModel(profileData).save();

    // set config user
    createConfig(user._id);

    return res
      .status(200)
      .json({ message: req.t("SIGNUP.SUCCESS") + " " + email });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: req.t("ERROR.WRONG") });
  }
}

export default signUp;
