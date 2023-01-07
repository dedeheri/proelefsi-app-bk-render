import articleModel from "../../model/article.js";
import shortLinkModel from "../../model/shortLink.js";
import cloudinary from "../../utils/cloudinary.js";

async function deletes(req, res) {
  try {
    const id = req.params.id;
    const article = await articleModel.findById({ _id: id });
    if (!article) {
      return res.status(404).json({ message: req.t("ARTICLE.NOT_AVAILABLE") });
    } else {
      await cloudinary.uploader.destroy(article.cloudinary_id);
      await articleModel.findByIdAndDelete({ _id: id });
      await shortLinkModel.findOneAndDelete({ articleId: article._id });
      return res.status(200).json({ message: req.t("ARTICLE.DELETE") });
    }
  } catch (error) {
    return res.status(500).json({ error: req.t("ERROR.WRONG") });
  }
}

export default deletes;
