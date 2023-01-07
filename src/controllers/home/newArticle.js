// model
import articleModel from "../../model/article.js";
import profileModel from "../../model/profile.js";

async function newArticle(req, res) {
  try {
    const userId = req.decode.id;
    const role = await profileModel.findOne({ authId: userId });

    let article;
    if (role.role === "Admin") {
      const result = await articleModel.find({}).sort({ createdAt: -1 });
      article = result;
    } else {
      const result = await articleModel
        .find({ "authour.id": role._id })
        .sort({ createdAt: -1 });
      article = result;
    }

    const resultData = [];
    for (let i = 0; i < article.length; i++) {
      const authour = await profileModel.findOne({
        _id: article[i].authour.id,
      });
      resultData.push({
        _id: article[i]._id,
        authour: {
          fullname:
            article[i].authour.id === role._id
              ? req.t("ARTICLE.YOU")
              : !authour?.fullname
              ? "User Delete"
              : authour?.fullname,
          id: article[i].authour,
        },
        title: article[i].title,
        content: article[i].content,
        topics: article[i].topics,
        url: {
          originalLink: article[i].url.originalLink,
        },
      });
    }

    const result = resultData.slice(0, 10);
    if (resultData.length === 0) {
      return res.status(404).json({ message: req.t("ARTICLE.NOT_FOUND") });
    } else {
      return res.status(200).json({ message: "Success", data: result });
    }
  } catch (error) {
    return res.status(500).json({ error: req.t("ERROR.WRONG") });
  }
}

export default newArticle;
