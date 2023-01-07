import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import userModel from "../../model/auth.js";

async function changePassword(req, res) {
  const password = req.body.password;
  const token = req.query.token;

  if (!token) {
    return res.status(404).json({ error: req.t("ERROR.WRONG") });
  }

  try {
    const j = jwt.verify(token, process.env.ACCESS_TOKEN);
    const hash = await bcrypt.hash(password, 10);
    await userModel.findByIdAndUpdate({ _id: j.id }, { password: hash });
    return res.status(200).json({ message: req.t("RESET.SUCCESS") });
  } catch (error) {
    return res.status(404).json({ error: req.t("ERROR.WRONG") });
  }
}

export default changePassword;
