import articleModel from "../../model/article.js";
import spreadToHtml from "../../utils/spreadToHtml.js";

async function getByTopics(req, res) {
  try {
    const topics = req.params.topics;
    const params = topics.split("-").join(" ");
    const article = await articleModel
      .find({ topics: params })
      .sort({ view: -1 });

    const resultData = new spreadToHtml(article);

    if (resultData.length === 0) {
      return res.status(404).json({ message: req.t("ARTICLE.NOT_AVAILABLE") });
    } else {
      return res
        .status(200)
        .json({ message: req.t("MESSAGE.SUCCESS"), result: resultData });
    }
  } catch (error) {
    return res.status(404).json({ error: req.t("ERROR.WRONG") });
  }
}

export default getByTopics;
