import reportModel from "../../model/report.js";
import chartModel from "../../model/chart.js";
import moment from "moment";

async function report(req, res) {
  const problem = req.body.problem;
  const comments = req.body.comments;
  const articleId = req.body.articleId;
  const _gid = req.cookies._gid;

  try {
    if (!problem) {
      return res.status(404).json({ message: "Please select your problems" });
    } else {
      await reportModel({
        problem,
        comments,
        articleId,
        visitorId: _gid,
      }).save();

      const dateNow = moment().format("DD MMMM YYYY");
      const chart = await chartModel.findOne({
        articleId,
        timestamp: dateNow,
      });

      if (chart) {
        await chartModel.findByIdAndUpdate(
          { _id: chart._id },
          { report: chart.report + 1 },
          { new: true }
        );
      } else {
        await chartModel({
          articleId,
          report: +1,
        }).save();
      }

      return res.status(200).json({
        message: req.t("MESSAGE.SUCCESS"),
        result: req.t("REPORT.REPORT_SUCCESS"),
      });
    }
  } catch (error) {
    return res.status(404).json({ error: req.t("ERROR.WRONG") });
  }
}

export default report;
