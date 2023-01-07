import articleModel from "../../model/article.js";

async function searchTerm(req, res) {
  const q = req.body.q;

  try {
    const article = await articleModel.find();
    const resultQuery = Object.values(article).filter((x) => {
      return x.title.toLowerCase().includes(q.toLowerCase());
    });

    const result = [];
    for (let i = 0; i < resultQuery.length; i++) {
      result.push({
        title: resultQuery[i].title,
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        message: "Pencarian tidak ditemukan",
        term: `Cari dalam ${q}`,
      });
    } else {
      return res.status(200).json({
        message: req.t("MESSAGE.SUCCESS"),
        total: result.length,
        result: result,
      });
    }
  } catch (error) {
    return res.status(404).json({ error: req.t("ERROR.WRONG") });
  }
}

export default searchTerm;
