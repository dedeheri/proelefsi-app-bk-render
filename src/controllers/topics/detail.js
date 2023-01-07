import topicsModel from "../../model/topics.js";

// detail
async function detail(req, res) {
  const id = req.params.id;

  const topics = await topicsModel.findById({ _id: id });
  if (!topics) {
    return res.status(404).json({ message: req.t("TOPICS.NOEXIST") });
  }
  try {
    return res
      .status(200)
      .json({ message: req.t("MESSAGE.SUCCESS"), topics: topics });
  } catch (error) {
    return res.status(500).json({ error: req.t("ERROR.WRONG") });
  }
}

export default detail;
