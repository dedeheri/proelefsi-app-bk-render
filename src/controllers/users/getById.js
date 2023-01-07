import moment from "moment";
import profileModel from "../../model/profile.js";

async function getById(req, res) {
  try {
    const userId = req.params.id;
    console.log(userId);
    const user = await profileModel.findById({ _id: userId });

    if (!user) {
      return res.status(404).json({ message: req.t("USERS.NOT_FOUND") });
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
    return res.status(404).json({ error: req.t("ERROR.WRONG") });
  }
}

export default getById;
