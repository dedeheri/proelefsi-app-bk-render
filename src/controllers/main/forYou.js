import visitorModel from "../../model/visitor.js";
import articleModel from "../../model/article.js";
import parser from "../../utils/parserBlocks.js";

async function forYou(req, res) {
  try {
    const { _gid } = req.cookies;

    const resultData = [];

    if (_gid) {
      const visitor = await visitorModel.findOne({ _gid });
      if (visitor !== null) {
        const getTopics = [];
        const getIdArticle = [];

        // get history topics clicked
        for (let i = 0; i < visitor.in_topics.length; i++) {
          getTopics.push(visitor.in_topics[i]);
        }
        // get history id article clicked
        for (let i = 0; i < visitor.article_id.length; i++) {
          getIdArticle.push(visitor.article_id[i]);
        }

        // remove duplicate
        const uniqueTopics = getTopics.filter((v, i, a) => {
          return i === a.findIndex((t) => t === v);
        });

        // push data by topics
        for (let i = 0; i < uniqueTopics.length; i++) {
          const data = await articleModel
            .find({
              topics: uniqueTopics[i],
            })
            .sort({ createdAt: -1 });

          for (let b = 0; b < data.length; b++) {
            resultData.push({
              ...data[b]._doc,
              content: parser(data[b].content),
            });
          }
        }
      } else {
        const data = await articleModel.find({}).sort({ createdAt: -1 });
        for (let b = 0; b < data.length; b++) {
          resultData.push({
            ...data[b]._doc,
            content: parser(data[b].content),
          });
        }
      }
    } else {
      const data = await articleModel.find({}).sort({ createdAt: -1 });
      for (let b = 0; b < data.length; b++) {
        resultData.push({ ...data[b]._doc, content: parser(data[b].content) });
      }
    }

    return res.status(200).json({
      message: req.t("MESSAGE.SUCCESS"),
      result: resultData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: req.t("ERROR.WRONG") });
  }
}

export default forYou;
