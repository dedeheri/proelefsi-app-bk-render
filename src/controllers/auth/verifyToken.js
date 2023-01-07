import jwt from "jsonwebtoken";
async function verifyToken(req, res) {
  const token = req.query.token;
  if (!token) {
    return res.status(404).json({ error: req.t("ERROR.WRONG") });
  }
  try {
    await jwt.verify(token, process.env.ACCESS_TOKEN, (error) => {
      if (error) {
        return res.status(422).json({ message: req.t("FORGET.EXPIRED") });
      } else {
        res.status(200).json({ message: req.t("FORGET.VERIFY") });
      }
    });
  } catch (error) {
    return res.status(404).json({ error: req.t("ERROR.WRONG") });
  }
}

export default verifyToken;
