import articleModel from "../../model/article.js";
import shortLinkModel from "../../model/shortLink.js";

async function shortLink(req, res) {
  try {
    const baseUrl = process.env.CLIENT_URL;
    const shortLinkParams = req.params.id;
    const params = baseUrl + "/" + shortLinkParams;
    const article = await articleModel.findOne({
      "url.shortLink": params,
    });

    if (article === null) {
      return res.status(404).json({ message: req.t("ARTICLE.NOT_AVAILABLE") });
    } else {
      await shortLinkModel.findOneAndUpdate(
        { articleId: article._id },
        { clicked: +1 },
        { new: true }
      );
      return res.status(200).json({
        message: req.t("MESSAGE.SUCCESS"),
        result: article.url.originalLink,
      });
    }
  } catch (error) {
    return res.status(500).json({ error: req.t("ERROR.WRONG") });
  }
}

export default shortLink;
