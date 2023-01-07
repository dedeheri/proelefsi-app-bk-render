import topicsModel from "../../model/topics.js";

async function topics(req, res) {
  try {
    const result = await topicsModel.find({});
    return res.status(200).json({
      message: req.t("MESSAGE.SUCCESS"),
      topics: result,
    });
  } catch (error) {
    return res.status(404).json({ error: req.t("ERROR.WRONG") });
  }
}

export default topics;
