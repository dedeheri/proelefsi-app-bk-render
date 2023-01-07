import articleModel from "../../model/article.js";
import topicsModel from "../../model/topics.js";
import profileModel from "../../model/profile.js";

async function get(req, res) {
  const cookie = req.cookies;
  const ref = req.query.ref;

  const filterTopics = req.query.search || "";
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(cookie.ppc)
    ? parseInt(cookie.ppc)
    : parseInt(req.query.limit) || 5;

  const sort = req.query.sort || -1;

  try {
    const topics = await topicsModel.find({}).sort({ createdAt: sort });
    const resultQueryTopics = Object.values(topics).filter((t) => {
      return t.topics.toLowerCase().includes(filterTopics.toLowerCase());
    });

    const startPage = (page - 1) * limit;
    const endPage = page * limit;

    const resultPage = {
      current: page,
      total: resultQueryTopics.length,
      from: startPage + 1,
      to:
        endPage > resultQueryTopics.length ? resultQueryTopics.length : endPage,
      perPage: limit,
    };

    if (endPage < resultQueryTopics.length) {
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

    // find artcile by category
    const resultData = [];
    for (let i = 0; i < resultQueryTopics.length; i++) {
      const article = await articleModel.find({
        topics: resultQueryTopics[i].topics,
      });
      const authour = await profileModel.findById({
        _id: resultQueryTopics[i].authour,
      });

      let editor;
      if (resultQueryTopics[i].editor == !null) {
        editor = await profileModel.findById({
          _id: resultQueryTopics[i].editor,
        });
      }

      resultData.push({
        ...resultQueryTopics[i]._doc,
        authour: authour.fullname,
        editor:
          resultQueryTopics[i].editor === null
            ? req.t("TOPICS.NOTEDITED")
            : editor.fullname,
        total: article.length,
      });
    }

    resultData.sort((a, b) => parseFloat(a.total) + parseFloat(b.total));
    // slice data
    const data = resultData.slice(startPage, endPage);

    if (data.length === 0) {
      return res.status(404).json({
        message: req.t("TOPICS.NOT_FOUND"),
      });
    } else {
      return res.status(200).json({
        message: req.t("MESSAGE.SUCCESS"),
        page: resultPage,
        topics: ref ? topics : data,
      });
    }
  } catch (error) {
    return res.status(500).json({ error: req.t("ERROR.WRONG") });
  }
}

export default get;
