import authModel from "../model/auth.js";
import jwt from "jsonwebtoken";
import profileModel from "../model/profile.js";

function tokenVerify(req, res, next) {
  const _token = req.cookies._token;
  if (_token) {
    const j = jwt.verify(_token, process.env.ACCESS_TOKEN);
    req.decode = j;
    next();
  } else {
    return res.status(500).json({ message: req.t("ERROR.NOT_SIGNIN") });
  }
}

function verifyRole(role) {
  return async (req, res, next) => {
    try {
      const id = req.decode.id;
      const auth = await profileModel.findOne({ authId: id });
      if (auth === null) {
        return res.status(422).json({ message: req.t("ACCOUNT.DELETE") });
      } else if (auth.role !== role) {
        return res.status(422).json({ message: req.t("USERS.AUHORIZATION") });
      } else {
        next();
      }
    } catch (error) {
      return res.status(500).json({ error: req.t("ERROR.WRONG") });
    }
  };
}

async function verifyEmail(req, res, next) {
  try {
    const id = req.decode.id;
    const auth = await authModel.findById({ _id: id });
    if (auth === null) {
      return res.status(422).json({ message: req.t("ACCOUNT.DELETE") });
    } else if (!auth.email_verify) {
      res.status(422).json({ message: req.t("VERIFY.EMAIL") });
    } else {
      next();
    }
  } catch (error) {
    return res.status(500).json({ error: req.t("ERROR.WRONG") });
  }
}

export { tokenVerify, verifyEmail, verifyRole };
