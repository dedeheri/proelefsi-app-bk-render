import articleModel from "../../model/article.js";
import spreadToHtml from "../../utils/spreadToHtml.js";

async function articleByUser(req, res) {
  try {
    const username = req.params.username;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const startPage = (page - 1) * limit;
    const endPage = page * limit;

    const article = await articleModel.find({
      "authour.username": username,
    });

    const resultPage = {
      current: page,
      total: article.length,
      from: startPage + 1,
      to: endPage > article.length ? article.length : endPage,
      perPage: limit,
    };

    if (endPage < article.length) {
      resultPage.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startPage > 0) {
      resultPage.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    const resultData = new spreadToHtml(article);
    const data = resultData.slice(startPage, endPage);

    if (data.length === 0) {
      return res.status(404).json({ message: req.t("ARTICLE.NOT_AVAILABLE") });
    } else {
      return res.status(200).json({
        message: req.t("MESSAGE.SUCCESS"),
        page: resultPage,
        result: data,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: req.t("ERROR.WRONG") });
  }
}

export default articleByUser;
