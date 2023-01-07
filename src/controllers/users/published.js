import moment from "moment";
import articleModel from "../../model/article.js";
import profileModel from "../../model/profile.js";

async function published(req, res) {
  try {
    const topics = req.query.topics || "";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const startPage = (page - 1) * limit;
    const endPage = page * limit;

    const id = req.params.id;
    const decodeId = req.decode.id;

    let article;
    if (id === "undefined") {
      const authour = await profileModel.findOne({ authId: decodeId });
      article = await articleModel.find({ authour: authour._id });
    } else {
      article = await articleModel.find({ authour: id });
    }

    const sortByTopics = article.filter((fl) => {
      return fl.topics.toLowerCase().includes(topics.toLowerCase());
    });

    const resultPage = {
      current: page,
      total: sortByTopics.length,
      from: startPage + 1,
      to: endPage > sortByTopics.length ? sortByTopics.length : endPage,
      perPage: limit,
    };

    if (endPage < sortByTopics.length) {
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

    if (sortByTopics.length === 0) {
      return res
        .status(404)
        .json({ message: req.t("USERS.NO_POSTED_ARTICLE") });
    } else {
      const resultData = [];
      for (let i = 0; i < sortByTopics.length; i++) {
        resultData.push({
          ...sortByTopics[i]._doc,
          createdAt: moment(sortByTopics[i].createdAt).format("LL"),
          updatedAt: moment(sortByTopics[i].updatedAt).format("LL"),
        });
      }
      return res.status(200).json({
        message: req.t("MESSAGE.SUCCESS"),
        data: resultData,
        page: resultPage,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: req.t("ERROR.WRONG") });
  }
}

export default published;
