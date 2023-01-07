import topicsModel from "../../model/topics.js";
import userModel from "../../model/profile.js";
import upperCase from "../../utils/uppercase.js";

async function add(req, res) {
  const topics = req.body.topics;
  const description = req.body.description;
  const authourId = req.decode.id;

  try {
    const topicsExist = await topicsModel.findOne({ topics });
    const users = await userModel.findOne({ authId: authourId });
    if (topicsExist) {
      return res.status(422).json({ message: req.t("TOPICS.EXIST") });
    } else {
      await topicsModel({
        topics: upperCase(topics),
        description: description,
        authour: users._id,
      }).save();

      return res.status(200).json({ message: req.t("TOPICS.ADD") });
    }
  } catch (error) {
    return res.status(500).json({ error: req.t("ERROR.WRONG") });
  }
}

export default add;
