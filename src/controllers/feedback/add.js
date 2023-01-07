import feedbackModel from "../../model/feedback.js";

async function addFeedback(req, res) {
  const userId = req.decode.id;
  const feedback = req.body.feedback;
  try {
    await feedbackModel({
      user_id: userId,
      feedback: feedback,
    }).save();

    return res.status(200).json({ message: req.t("FEEDBACK.SUCCESS_ADD") });
  } catch (error) {
    return res.status(404).json({ error: req.t("ERROR.WRONG") });
  }
}
export default addFeedback;
