import configModel from "../../model/config.js";
import profileModel from "../../model/profile.js";

async function config(req, res) {
  try {
    const decodeId = req.decode.id;
    const user = await profileModel.findOne({ authId: decodeId });
    const configs = await configModel.findOne({ userId: user._id });

    if (configs) {
      return res
        .status(200)
        .json({ message: req.t("MESSAGE.SUCCESS"), result: configs });
    }

    return;
  } catch (error) {
    return res.status(500).json({ error: req.t("ERROR.WRONG") });
  }
}

export default config;
