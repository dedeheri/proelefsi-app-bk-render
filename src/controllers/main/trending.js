import articleModel from "../../model/article.js";
import spreadToHtml from "../../utils/spreadToHtml.js";

async function trending(req, res) {
  try {
    const article = await articleModel.find({}).sort({ view: -1 });

    return res.status(200).json({
      message: req.t("MESSAGE.SUCCESS"),
      result: spreadToHtml(article).slice(0, 6),
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: req.t("ERROR.WRONG") });
  }
}

export default trending;
