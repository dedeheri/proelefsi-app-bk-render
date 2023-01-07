// model
import moment from "moment";
import articleModel from "../../model/article.js";

async function dailyActivity(req, res) {
  try {
    const time = parseInt(req.query.time) || 7;
    const defaultTime = new Date(Date.now() - time * 24 * 60 * 60 * 1000);
    var startDate = moment(defaultTime).format("YYYY-MM-DD");

    const article = await articleModel.find({
      createdAt: {
        $gte: startDate,
      },
    });

    const data = [];
    for (let i = 0; i < article.length; i++) {
      const artcil = await articleModel.find({
        createdAt: article[i].createdAt,
      });

      data.push({
        data: article[i].createdAt,
        count: artcil.length,
      });
    }

    return res.status(200).json(data);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

export default dailyActivity;
