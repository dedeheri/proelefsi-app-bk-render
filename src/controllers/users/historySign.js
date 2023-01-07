import moment from "moment";
import signInHistory from "../../model/history.js";
import profileModel from "../../model/profile.js";

async function historySign(req, res) {
  try {
    const authId = req.decode.id;
    const profile = await profileModel.findOne({ authId: authId });
    const history = await signInHistory
      .find({ userId: profile._id })
      .sort({ createdAt: -1 });
    const result = [];

    for (let i = 0; i < history.length; i++) {
      result.push({
        _id: history[i]._id,
        device: {
          os: history[i].device.os,
          client: history[i].device.client,
        },
        location: {
          ip: history[i].location.ip,
          countryCode: history[i].location.countryCode,
          countryName: history[i].location.countryName,
          city: history[i].location.city,
          region: history[i].location.region,
        },
        createdAt: moment(history[i].createdAt).format("LT LL"),
        updatedAt: moment(history[i].updatedAt).format("LT LL"),
      });
    }

    return res
      .status(200)
      .json({ message: req.t("MESSAGE.SUCCESS"), user: result });
  } catch (error) {
    return res.status(404).json({ error: req.t("ERROR.WRONG") });
  }
}

export default historySign;
