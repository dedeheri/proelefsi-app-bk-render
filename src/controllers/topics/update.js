import profileModel from "../../model/profile.js";
import topicsModel from "../../model/topics.js";
import upperCase from "../../utils/uppercase.js";

async function update(req, res) {
  const topicsPlant = req.body.topics;
  const descriptionPlant = req.body.description;

  const topicsId = req.params.id;
  const authourId = req.decode.id;

  try {
    const topics = await topicsModel.findById({ _id: topicsId });
    const users = await profileModel.findOne({ authId: authourId });

    // if topics no exist
    if (!topics) {
      return res.status(404).json({ message: req.t("TOPICS.NOEXIST") });
    }

    // name canot same
    const title = await topicsModel.findOne({ topics: topicsPlant });
    if (title) {
      if (title._id !== topics._id) {
        return res.status(422).json({ message: req.t("TOPICS.EXIST") });
      }
    }

    await topicsModel.findByIdAndUpdate(
      { _id: topics._id },
      {
        topics: upperCase(topicsPlant),
        description: descriptionPlant,
        editor: users._id,
      },
      { new: true }
    );
    return res.status(200).json({ message: req.t("TOPICS.UPDATE") });
  } catch (error) {
    return res.status(500).json({ error: req.t("ERROR.WRONG") });
  }
}

export default update;
