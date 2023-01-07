import moment from "moment";
import profileModel from "../../model/profile.js";

async function get(req, res) {
  try {
    const decodeId = req.decode.id;
    const user = await profileModel.findOne({ authId: decodeId });
    if (!user) {
      return res.status(404).json({ message: req.t("USER.NOUSERS") });
    }

    const { createdAt, updatedAt, __v, ...rest } = user._doc;
    const convertTime = {
      createdAt: moment(createdAt).format("LL"),
      updatedAt: moment(updatedAt).format("LL"),
    };
    const margeObject = { ...rest, ...convertTime };

    return res
      .status(200)
      .json({ message: req.t("MESSAGE.SUCCESS"), user: margeObject });
  } catch (error) {
    return res.status(500).json({ error: req.t("ERROR.WRONG") });
  }
}

export default get;
