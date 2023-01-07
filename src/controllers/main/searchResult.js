import articleModel from "../../model/article.js";
import visitorsModel from "../../model/visitor.js";
import spreadToHtml from "../../utils/spreadToHtml.js";

async function searchResult(req, res) {
  const q = req.query.q;
  const sort = req.query.sort || -1;
  const cookie = req.cookies;

  try {
    const article = await articleModel
      .find({ draft: false })
      .sort({ createdAt: sort });

    const resultQuery = Object.values(article).filter((x) => {
      return x.title.toLowerCase().includes(q.toLowerCase());
    });

    const resultData = new spreadToHtml(resultQuery);

    // save history search to database
    let resultVisitorTerm;
    const visitor = await visitorsModel.findOne({
      _gid: cookie._gid,
    });

    resultVisitorTerm = visitor;
    const filterSearchTerm = visitor?.search_term?.filter((_) => _ === q);

    if (visitor) {
      if (filterSearchTerm.length === 0) {
        await visitorsModel.updateOne(
          { _id: visitor._id },
          { $push: { search_term: q } }
        );
      }
    }

    if (resultData.length === 0) {
      return res.status(404).json({
        message: "Pencarian tidak ditemukan",
      });
    } else {
      return res.status(200).json({
        message: req.t("MESSAGE.SUCCESS"),
        total: resultData.length,
        result: resultData,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: req.t("ERROR.WRONG") });
  }
}

export default searchResult;
