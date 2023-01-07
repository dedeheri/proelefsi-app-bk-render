import articleModel from "../../model/article.js";
import profileModel from "../../model/profile.js";
import editorParser from "editorjs-html";
async function get(req, res) {
  const userId = req.decode.id;
  const cookie = req.cookies;
  const draft = req.query.draft;
  const search = req.query.search || "";
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(cookie.pp)
    ? parseInt(cookie.pp)
    : parseInt(req.query.limit) || 5;

  const topics = req.query.topics || "";
  const sort = req.query.sort || -1;

  try {
    const startPage = (page - 1) * limit;
    const endPage = page * limit;

    // get user by role
    // if role admin get all data
    // else get article by id

    let article;
    const getArticleByUserId = await profileModel.findOne({ authId: userId });
    if (getArticleByUserId.role === "Admin") {
      if (draft === "true") {
        const articles = await articleModel
          .find({ draft: draft })
          .sort({ timestamps: sort });
        article = articles;
      } else {
        const articles = await articleModel.find({}).sort({ timestamps: sort });
        article = articles;
      }
    } else {
      if (draft === "true") {
        const articles = await articleModel
          .find({
            "authour.username": getArticleByUserId.username,
            draft: draft,
          })
          .sort({ timestamps: sort });
        article = articles;
      } else {
        const articles = await articleModel
          .find({ "authour.username": getArticleByUserId.username })
          .sort({ timestamps: sort });
        article = articles;
      }
    }

    const result = [];
    for (let i = 0; i < article.length; i++) {
      const parseJson = JSON.parse(article[i].content);
      const parserEditor = new editorParser();
      const parser = parserEditor.parse(parseJson);
      result.push({
        ...article[i]._doc,
        content: parser,
      });
    }

    function resultFiltered() {
      const resultFilter = Object.values(result).filter((c) => {
        return c.topics.toLowerCase().includes(topics.toLowerCase());
      });
      const resultSearch = Object.values(resultFilter).filter((c) => {
        return c.title.toLowerCase().includes(search.toLowerCase());
      });

      return resultSearch;
    }

    const resultPage = {
      current: page,
      total: resultFiltered().length,
      from: startPage + 1,
      to: endPage > resultFiltered().length ? resultFiltered().length : endPage,
      perPage: limit,
    };

    if (endPage < resultFiltered().length) {
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

    const data = resultFiltered().slice(startPage, endPage);
    if (resultFiltered().length === 0 || data.length === 0) {
      return res.status(404).json({ message: req.t("ARTICLE.NOT_FOUND") });
    } else {
      return res
        .status(200)
        .json({ message: "Success", page: resultPage, data: data });
    }
  } catch (error) {
    return res.status(500).json({ error: req.t("ERROR.WRONG") });
  }
}

export default get;
