import articleModel from "../../model/article.js";

async function changeDraftOrPublish(req, res) {
  const draft = req.body.draft;
  const articleId = req.params.id;

  try {
    const article = await articleModel.findById({ _id: articleId });
    if (!article) {
      return res.status(404).json({ message: req.t("ARTICLE.NOT_AVAILABLE") });
    } else {
      await articleModel.findByIdAndUpdate(
        {
          _id: article._id,
        },
        {
          draft: draft,
        },
        {
          new: true,
        }
      );
    }
    return res.status(200).json({ message: req.t("ARTICLE.DRAFT") });
  } catch (error) {
    return res.status(500).json({ error: req.t("ERROR.WRONG") });
  }
}

export default changeDraftOrPublish;
