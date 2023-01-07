import articleModel from "../../model/article.js";
import profileModel from "../../model/profile.js";

async function manageTopics(req, res) {
  try {
    const id = req.params.id;
    const decodeId = req.decode.id;

    let article;
    if (id === "undefined") {
      const authour = await profileModel.findOne({ authId: decodeId });
      article = await articleModel.find({ authour: authour._id });
    } else {
      article = await articleModel.find({ authour: id });
    }

    const resultData = [];
    for (let i = 0; i < article.length; i++) {
      const articles = await articleModel.find({
        topics: article[i].topics,
      });
      resultData.push({
        topics: article[i].topics,
        count: articles.length,
      });
    }
    const removeDuplicateObject = [
      ...new Map(resultData.map((item) => [item["topics"], item])).values(),
    ];

    const result = {
      manage: [...removeDuplicateObject],
      total: article.length,
    };

    return res.status(200).json({
      message: req.t("MESSAGE.SUCCESS"),
      data: result,
    });
  } catch (error) {
    return res.status(500).json({ error: req.t("ERROR.WRONG") });
  }
}

export default manageTopics;
