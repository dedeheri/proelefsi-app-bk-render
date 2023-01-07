import articleModel from "../../model/article.js";

async function detail(req, res) {
  try {
    const id = req.params.id;
    const article = await articleModel.findOne({ _id: id });
    if (!article) {
      return res.status(404).json({ message: req.t("ARTICLE.NOT_AVAILABLE") });
    }

    const parseJson = JSON.parse(article.content);

    const result = {
      ...article._doc,
      content: parseJson,
    };

    return res.status(200).json({
      message: "Success",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({ error: req.t("ERROR.WRONG") });
  }
}

export default detail;
