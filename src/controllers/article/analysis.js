import reportModel from "../../model/report.js";
import chartModel from "../../model/chart.js";

async function analysisChart(req, res) {
  try {
    const id = req.params.id;
    const report = await reportModel
      .find({ articleId: id })
      .sort({ timestamp: 1 });
    const chart = await chartModel.find({ articleId: id });
    if (chart.length === 0) {
      return res.status(404).json({ message: req.t("ARTICLE.NOT_FOUND") });
    }
    return res.status(200).json({
      message: req.t("MESSAGE.SUCCESS"),
      result: {
        view: chart,
        report: report,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: req.t("ERROR.WRONG") });
  }
}

export default analysisChart;
