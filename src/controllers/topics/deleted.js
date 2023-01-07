import topicsModel from "../../model/topics.js";

// delete
async function deleted(req, res) {
  const id = req.params.id;

  const topics = await topicsModel.findById({ _id: id });
  if (!topics) {
    return res.status(404).json({ message: req.t("TOPICS.NOEXIST") });
  }
  try {
    await topicsModel.findByIdAndDelete({ _id: topics._id });
    return res.status(200).json({ message: req.t("TOPICS.DELETE") });
  } catch (error) {
    return res.status(500).json({ error: req.t("ERROR.WRONG") });
  }
}

export default deleted;
